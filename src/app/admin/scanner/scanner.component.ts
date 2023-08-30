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
// export class ScannerComponent {
//   myForm: any;
//   phonePattern = /^[\d]{10}$/; // Phone number pattern
//   mydate = moment(new Date()).format(' MM-DD-YYYY"');
//   diff!: string;
//   age!: number;
//   test!: any;
//   events: string[] = [];
//   profilePicture: any;
//   responseMessage: any;
//   errorMessage: any;

//   constructor(
//     private scannerApi: ApiDataService,

//     private formBuilder: FormBuilder,
//     private route: Router
//   ) {
//     this.myForm = this.formBuilder.group({
//       firstname: ['admin', [Validators.required]],
//       lastname: ['admin', [Validators.required]],
//       cin: ['25825825', [Validators.required]],
//       birth: ['', [Validators.required]],
//       phonenumber: ['22825825', [Validators.required]],
//       // xray: [null, [Validators.required]],
//     });
//   }
//   fileName: string | undefined;

//   // onFileSelected(event: Event): void {
//   //   const file = (event.target as HTMLInputElement).files?.[0];
//   //   this.fileName = file ? file.name : '';
//   // }
//   selectedImage: any;

//   onFileChange(event: any) {
//     this.selectedImage = event.target.files[0];
//   }
//   get firstname() {
//     return this.myForm.get('firstname');
//   }

//   get lastname() {
//     return this.myForm.get('lastname');
//   }
//   get cin() {
//     return this.myForm.get('cin');
//   }

//   get birth() {
//     return this.myForm.get('birth');
//   }

//   get phonenumber() {
//     return this.myForm.get('phonenumber');
//   }

//   async scannerSend() {
//     try {
//       const { firstname, lastname, cin, birth, phonenumber } =
//         this.myForm.value;
//       const formData = new FormData();
//       formData.append('firstname', firstname);
//       formData.append('lastname', lastname);
//       formData.append('cin', cin);
//       formData.append('birth', moment(birth).format('MM-DD-YYYY'));
//       formData.append('phonenumber', phonenumber);
//       if (this.profilePicture) {
//         formData.append('xray', this.selectedImage);
//       }
//       const response = await this.scannerApi.scanner(formData).toPromise();
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
//     const formattedDate = moment(event.value).format('MM-DD-YYYY');
//     console.log(formattedDate);
//     this.events.push(`${type}: ${formattedDate}`);
//   }
//   // addEvffent(type: string, event: MatDatepickerInputEvent<Date>) {
//   //   const formattedDate = moment(event.value).format('MM-DD-YYYY');
//   //   console.log(formattedDate);
//   //   this.events.push(`${type}: ${formattedDate}`);
//   // }
// }

// get xray() {
//   return this.myForm.get('xray');
// }
// async scannerSend() {
//   try {
//     const { firstname, lastname, cin, birth, phonenumber, xray } =
//       this.myForm.value;
//     const formData = new FormData();
//     formData.append('firstname', firstname.value);
//     formData.append('lastname', lastname.value);
//     formData.append('cin', cin.value);
//     formData.append('birth', birth.value);
//     // formData.append('birth', moment(birth.value).format('MM-DD-YYYY'));
//     formData.append('phonenumber', phonenumber.value);
//     const xrayFile = xray.value;
//     formData.append('xray', this.profilePicture);

//     console.log('Image being appended:', this.myForm.value);
//     const response = await this.scannerApi.scanner(formData).toPromise();
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
export class ScannerComponent {
  myForm: any;
  img!: string;
  phonePattern = /^[\d]{10}$/; // Phone number pattern
  mydate = moment(new Date()).format(' MM-DD-YYYY"');
  responseMessage: any;
  errorMessage: any;
  events: string[] = [];
  profilePicture: any;
  file: any;
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
      image: ['', [Validators.required]],
    });
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
  get image() {
    const text = 'dsgfdgfdg';
    return this.myForm.get('images');
  }
  // !---------------------------------
  handleFileInput(event: any): void {
    const profilePicture = event.target.files[0];

    if (profilePicture) {
      this.convertToBase64(profilePicture);
    }
  }
  convertToBase64(profilePicture: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64Image = e.target.result;
      const base64Data = base64Image; // Remove data URI prefix
      this.img = base64Data;
      // console.log(this.img);
    };
    reader.readAsDataURL(profilePicture);
  }
  //! ---------------------------------
  jsonDataList: any[] = [];

  scannerSend() {
    const formDataObject: any = {
      firstname: this.myForm.value.firstname,
      lastname: this.myForm.value.lastname,
      cin: this.myForm.value.cin,
      birth: moment(this.myForm.value.birth).format('MM-DD-YYYY'),
      phonenumber: this.myForm.value.phonenumber,
      image: this.img,
    };

    // Create an empty object

    // Fill the formDataObject with the values from jsonDataList
    this.jsonDataList.forEach((item) => {
      formDataObject[item.name as keyof FormData] = item.value;
    });
    console.log('formDataObject:', formDataObject);
    this.scannerApi.scanner(formDataObject).subscribe(
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
interface FormData {
  firstname: string;
  lastname: string;
  cin: string;
  birth: string;
  phonenumber: string;
  image: string;
}
