import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent {
  myForm: any;
  phonePattern = /^[\d]{10}$/; // Phone number pattern
  mydate = moment(new Date()).format(' MM-DD-YYYY"');
  diff!: string;
  age!: number;
  test!: any;
  events: string[] = [];
  profilePicture: any;
  responseMessage: any;
  errorMessage: any;

  constructor(
    private scannerApi: ApiDataService,

    private formBuilder: FormBuilder,
    private route: Router
  ) {
    this.myForm = this.formBuilder.group({
      firstname: ['admin', [Validators.required]],
      lastname: ['admin', [Validators.required]],
      cin: ['25825825', [Validators.required]],
      birth: ['', [Validators.required]],
      phonenumber: ['22825825', [Validators.required]],
      images: [null, [Validators.required]],
    });
  }
  fileName: string | undefined;

  // onFileSelected(event: Event): void {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   this.fileName = file ? file.name : '';
  // }
  onFileinput(event: any) {
    this.profilePicture = event.target.files[0];
  }
  get firstname() {
    return this.myForm.get('firstname');
  }

  get lastname() {
    return this.myForm.get('lastname');
  }
  get cin() {
    return this.myForm.get('cin');
  }

  get birth() {
    return this.myForm.get('birth');
  }

  get phonenumber() {
    return this.myForm.get('phonenumber');
  }

  scannerSend() {
    const formData = new FormData();
    formData.append('firstname', this.myForm.value.firstname);
    formData.append('lastname', this.myForm.value.lastname);
    formData.append('cin', this.myForm.value.cin);
    formData.append(
      'birth',
      moment(this.myForm.value.birth).format('MM-DD-YYYY')
    );
    formData.append('phonenumber', this.myForm.value.phonenumber);
    if (this.profilePicture) {
      formData.append('images', this.profilePicture, this.profilePicture.name);
    }
    this.scannerApi.scanner(formData).subscribe(
      (response) => {
        // Handle the response from the Flask backend
        console.log(response);
      },
      (error) => {
        // Handle the error
        console.error(error);
      }
    );
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const formattedDate = moment(event.value).format('MM-DD-YYYY');
    console.log(formattedDate);
    this.events.push(`${type}: ${formattedDate}`);
  }
  // addEvffent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   const formattedDate = moment(event.value).format('MM-DD-YYYY');
  //   console.log(formattedDate);
  //   this.events.push(`${type}: ${formattedDate}`);
  // }
}
