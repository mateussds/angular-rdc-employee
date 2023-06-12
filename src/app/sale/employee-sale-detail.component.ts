import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyAdressPipe } from '../../pages/company/company-address.pipe';
import { HttpClient } from '@angular/common/http';
import { HttpDatabaseEmployeeSale } from '../../services/database/entities/database-employee-sales.service';

@Component({
  selector: 'pages-employee-sale-detail',
  template: `
    <div *ngIf="sale">
      <h1>S.S: {{ sale.old_quotation_id }}</h1>
      <app-service-request-document [quotation]="sale"></app-service-request-document>
      <!--      <p><strong>Cliente:</strong> {{ sale.sale.company.type }} {{ sale.sale.company.name }}</p>-->
      <!--      <p><strong>Dia:</strong> {{ sale.day | date: 'dd/MM/YYYY' }} ({{ sale.day | date: 'EEEE' }})</p>-->
      <!--      <p><strong>Hora:</strong> {{ sale.hour }}</p>-->
      <!--    TODO: fazer no backend um saleService por saleId para retornar aqui -->
      <!--    <p><strong>Serviços:</strong></p>-->
      <!--    <ul>-->
      <!--      <li *ngFor="let service of sale.sale.service">{{service.amount}} - {{service.name}}}</li>-->
      <!--    </ul>-->
      <!--      <p><strong>Endereço:</strong>{{ sale.sale.company | companyAddress }} CEP {{ sale.sale.company.cep }}</p>-->
      <a
        mat-raised-button
        color="primary"
        [disabled]="!searchLatLongComplete"
        href="https://www.waze.com/ul?ll={{ latitude }},{{ longitude }}&navigate=yes"
      >
        Abrir no Waze

        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Layer_1"
          width="1rem"
          height="1rem"
          x="0px"
          y="0px"
          viewBox="0 0 122.71 122.88"
          style="enable-background:new 0 0 122.71 122.88"
          xml:space="preserve"
        >
          <g>
            <path
              style="fill: #FFFFFF;"
              d="M55.14,104.21c4.22,0,8.44,0.19,12.66-0.09c3.84-0.19,7.88-0.56,11.63-1.5c29.82-7.31,45.76-40.23,32.72-68.07 C104.27,17.76,90.77,8.19,72.3,6.22c-14.16-1.5-26.82,2.72-37.51,12.28c-10.5,9.47-15.94,21.28-16.31,35.44 c-0.09,3.28,0,6.66,0,9.94C18.38,71.02,14.35,76.55,7.5,78.7c-0.09,0-0.28,0.19-0.38,0.19c2.63,6.94,13.31,17.16,19.97,19.69 C35.45,87.14,52.32,91.18,55.14,104.21L55.14,104.21z"
            />
            <path
              d="M54.95,110.49c-1.03,4.69-3.56,8.16-7.69,10.31c-5.25,2.72-10.6,2.63-15.57-0.56c-5.16-3.28-7.41-8.25-7.03-14.35 c0.09-1.03-0.19-1.41-1.03-1.88c-9.1-4.78-16.31-11.44-21.28-20.44c-0.94-1.78-1.69-3.66-2.16-5.63c-0.66-2.72,0.38-4.03,3.19-4.31 c3.38-0.38,6.38-1.69,7.88-4.88c0.66-1.41,1.03-3.09,1.03-4.69c0.19-4.03,0-8.06,0.19-12.1c1.03-15.57,7.5-28.5,19.32-38.63 C42.67,3.97,55.42-0.43,69.76,0.03c25.04,0.94,46.51,18.57,51.57,43.23c4.59,22.32-2.34,40.98-20.07,55.51 c-1.03,0.84-2.16,1.69-3.38,2.44c-0.66,0.47-0.84,0.84-0.56,1.59c2.34,7.13-0.94,15-7.5,18.38c-8.91,4.41-19.22-0.09-21.94-9.66 c-0.09-0.38-0.56-0.84-0.84-0.84C63.11,110.4,59.07,110.49,54.95,110.49L54.95,110.49z M55.14,104.21c4.22,0,8.44,0.19,12.66-0.09 c3.84-0.19,7.88-0.56,11.63-1.5c29.82-7.31,45.76-40.23,32.72-68.07C104.27,17.76,90.77,8.19,72.3,6.22 c-14.16-1.5-26.82,2.72-37.51,12.28c-10.5,9.47-15.94,21.28-16.31,35.44c-0.09,3.28,0,6.66,0,9.94 C18.38,71.02,14.35,76.55,7.5,78.7c-0.09,0-0.28,0.19-0.38,0.19c2.63,6.94,13.31,17.16,19.97,19.69 C35.45,87.14,52.32,91.18,55.14,104.21L55.14,104.21z"
            />
            <path
              d="M74.92,79.74c-11.07-0.56-18.38-4.97-23.07-13.78c-1.13-2.16-0.09-4.31,2.06-4.78c1.31-0.28,2.53,0.66,3.47,2.16 c1.22,1.88,2.44,3.75,4.03,5.25c8.81,8.34,23.25,5.72,28.79-5.06c0.66-1.31,1.5-2.34,3.09-2.34c2.34,0.09,3.66,2.44,2.63,4.59 c-2.91,5.91-7.5,10.22-13.69,12.28C79.51,78.99,76.7,79.36,74.92,79.74L74.92,79.74z"
            />
            <path
              d="M55.32,48.98c-3.38,0-6.09-2.72-6.09-6.09s2.72-6.09,6.09-6.09s6.09,2.72,6.09,6.09C61.42,46.17,58.7,48.98,55.32,48.98 L55.32,48.98z"
            />
            <path
              d="M98.27,42.79c0,3.38-2.72,6.09-6,6.19c-3.38,0-6.09-2.63-6.09-6.09c0-3.38,2.63-6.09,6-6.19 C95.46,36.7,98.17,39.42,98.27,42.79L98.27,42.79z"
            />
          </g>
        </svg>
      </a>
      <br />
      <br />
      <button mat-stroked-button color="accent" (click)="onGoBack()">Voltar para agenda</button>
    </div>
  `,
  styles: [``],
})
export class EmployeeSaleDetailComponent implements OnInit {
  sale: any;
  searchLatLongComplete = false;
  latitude = 0;
  longitude = 0;

  constructor(private router: Router, private http: HttpClient, private httpDatabaseEmployeeSale: HttpDatabaseEmployeeSale) {
    try {
      if (!sessionStorage.getItem('EmployeeSaleDetail')) this.router.navigate(['area-funcionario', 'agenda']);
      else {
        const sale = JSON.parse(sessionStorage.getItem('EmployeeSaleDetail'));
        this.httpDatabaseEmployeeSale.getRegister(sale.sale.id).subscribe({
          next: (response) => {
            this.sale = response;
            this.getAddress();
          },
        });
      }
    } catch {
      this.router.navigate(['area-funcionario', 'agenda']);
    }
  }

  ngOnInit(): void {}

  getAddress(): void {
    const addressPipe = new CompanyAdressPipe();
    const address = addressPipe.transform(this.sale.company);
    fetch(`https://nominatim.openstreetmap.org/search/${address}?format=json&addressdetails=1&limit=1&polygon_svg=1`)
      .then((response) => response.json())
      .then((response) => {
        //TODO: desabilitar botão do waze caso não tenha lat e lon
        console.log(response, response[0]?.lat, response[0]?.lon);
        this.latitude = response[0].lat;
        this.longitude = response[0].lon;
        this.searchLatLongComplete = true;
      })
      .catch((err) => console.error(err));
  }

  onGoBack(): void {
    window.history.back();
  }
}
