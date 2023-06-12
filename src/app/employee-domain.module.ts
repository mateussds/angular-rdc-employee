import {NgModule} from "@angular/core";
import {EmployeeSalesComponent} from "./sales/employee-sales.component";
import {CommonModule} from "@angular/common";
import {Route, RouterModule} from "@angular/router";
import {SharedModule} from "../modules/shared.module";
import { FullCalendarModule } from '@fullcalendar/angular';
import {EmployeeSaleDetailComponent} from "./sales/employee-sale-detail.component";
const routes: Route[] = [
  {
    path: 'agenda',
    component: EmployeeSalesComponent,
  },
  {
    path: 'servico',
    component: EmployeeSaleDetailComponent,
  }
]

@NgModule({
  declarations: [EmployeeSalesComponent, EmployeeSaleDetailComponent],
  imports:[CommonModule, FullCalendarModule, RouterModule.forChild(routes), SharedModule],
})
export class EmployeeDomainModule {}
