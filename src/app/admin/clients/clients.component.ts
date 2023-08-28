import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import * as moment from 'moment';
import { ApiDataService } from 'src/app/services/api-data.service';
import { PeriodicElement } from './ClientList';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'cin',
    'phonenumber',
    'birth',
    'result',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterValue = '';
  options: any;
  constructor(private patientApi: ApiDataService) {}
  ngOnInit() {
    this.patient();
  }

  myPatient: any = [];
  patient() {
    this.patientApi.patient().subscribe((res: any) => {
      this.myPatient = new MatTableDataSource(res);
      this.myPatient.sort = this.sort;
      this.myPatient.paginator = this.paginator;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.myPatient.filter = filterValue.trim().toLowerCase();
  }
}
