import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiDataService } from 'src/app/services/api-data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  myFormlogin: any;
  pattern = '^[ a-zA-Z][a-zA-Z ]*$';
  condition =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}';

  beforeLogin = 'false';
  http: any;
  responseMessage: any;
  errorMessage: any;

  constructor(
    private route: Router,
    private loginApi: ApiDataService,
    private formbuilder: FormBuilder
  ) {
    this.myFormlogin = this.formbuilder.group({
      email: ['admin@admin.com', [Validators.required, Validators.email]],
      password: [
        'admin',
        [Validators.required, Validators.pattern(this.pattern)],
      ],
    });
  }
  get email() {
    return this.myFormlogin.get('email');
  }
  get password() {
    return this.myFormlogin.get('password');
  }

  onSubmit(): void {
    const { email, password } = this.myFormlogin.value;
    const data = {
      email,
      password,
    };
    console.log(email);

    this.loginApi
      .login(data)
      .then((response) => {
        // Handle successful login
        // For example, redirect to another page
        this.route.navigate(['admin/scanner']);
        this.responseMessage = response.message;
        console.log(response);
      })
      .catch((error) => {
        // Handle login error
        console.log('Login failed:', error);
        this.errorMessage = error.message;
      });
  }
}
