import {Component, OnInit} from "@angular/core";
import {HttpDatabaseEmployeeSale} from "../../services/database/entities/database-employee-sales.service";
import listPlugin from '@fullcalendar/list'
import * as dayjs from "dayjs";
import {CalendarEvent} from "../../pages/home/CalendarEvent.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogCalendarEventComponent} from "../../components/dialog-calendar-event/dialog-calendar-event.component";

@Component({
  selector: 'pages-employee-sales',
  template: `
    <app-breadcrumb style="display: none" [crumbs]="[{ name: 'Agenda' }]"></app-breadcrumb>
    <div>
      <div #fc name="fc">
        <full-calendar style="min-width: 90vw; min-height: 85vh;" [options]="calendarOptions" [draggable]="true"></full-calendar>
      </div>
    </div>
  `,
  styles: [``]
})
export class EmployeeSalesComponent implements OnInit {
  employeeId = '6be51dfb-7249-4813-add4-1a796e61df3d';
  calendarOptions: any;
  isLoading = false;

  constructor(private httpDatabaseEmployeeSale: HttpDatabaseEmployeeSale, private route: ActivatedRoute, private router: Router) {}

  ngOnInit():void {
    this.createCalendar();
    this.setInitialDateFromQueryParams();
    this.watchParamsFromRoute();
  }

  createCalendar(): void {
    this.calendarOptions = {
      initialView: 'listWeek',
      buttonText: {
        today: 'hoje',
      },
      headerToolbar: {
        start: 'title', // will normally be on the left. if RTL, will be on the right
        center: '',
        end: '',
      },
      footerToolbar: {
        start: '', // will normally be on the left. if RTL, will be on the right
        center: '',
        end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
      },
      locale: 'pt',
      editable: false,
      selectable: false,
      plugins: [listPlugin],
      eventClick: this.onEventClick.bind(this),
      datesSet: this.onDateRangeChange.bind(this),
    };
  }

  setInitialDateFromQueryParams(): void {
    this.calendarOptions.initialDate = this.route.snapshot.queryParams['eventDate'];
  }

  watchParamsFromRoute(): void {
    this.route.queryParams.subscribe((params) => {
      // eventStatus, eventCategory, categorySecondary, filterParam
      const { initialDate, finalDate, status } = params;
      if (initialDate && finalDate) {
        this.calendarOptions.initialDate = dayjs(initialDate).format('YYYY-MM-DD');
        this.loadEvents({ initialDate, finalDate });
      }
    });
  }

  loadEvents(eventsParams: { initialDate: Date; finalDate: Date; }): void {
    this.isLoading = true;
    this.httpDatabaseEmployeeSale.getAllCalendar(this.employeeId, eventsParams.initialDate, eventsParams.finalDate)
      .subscribe(this.handlerRequestSuccess, this.handlerRequestError);
  }

  handlerRequestSuccess = (events: { total: number; services: CalendarEvent[]; contracts: any[] }): void => {
    this.calendarOptions.events = events;
    this.isLoading = false;
  };

  handlerRequestError = (error): void => {
    console.error(error);
    this.isLoading = false;
  };

  onDateRangeChange(currentRange: { start: string; end: string }): void {
    if (!currentRange || !currentRange['start'] || !currentRange['end']) return;
    const initialDate = dayjs(currentRange.start).format('YYYY-MM-DD');
    const finalDate = dayjs(currentRange.end).format('YYYY-MM-DD');
    this.router.navigate([], { preserveFragment: false, queryParamsHandling: 'merge', queryParams: { initialDate, finalDate } });
  }

  onEventClick(data): void {
    sessionStorage.setItem('EmployeeSaleDetail', JSON.stringify(data.event.extendedProps));
    this.router.navigate(['area-funcionarios', 'servico']);
  }
}
