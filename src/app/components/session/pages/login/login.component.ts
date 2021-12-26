import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  alert: boolean = false;
  message: string = "";

  constructor(private router: Router, private api: ApiService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  /**
   * Ejecutar al hacer submit en el formulario
   */
  onSubmit(form:any) {
    this.api.post(form, 'auth/login').subscribe(response => {
      if (response.status === 200) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('auth_user', JSON.stringify(response.data.user));
        if (response.data.user.role.name === "ADMIN") {
          this.api.get('user').subscribe(response => {
            localStorage.setItem('users', JSON.stringify(response.data.users));
            localStorage.setItem('isAdmin', 'true');
            this.router.navigate(['dashboard/users']);
          })
        } else {
          localStorage.setItem('isAdmin', 'false');
          this.router.navigate(['dashboard/home']);
        }
      } else {
        this.alert = true;
        this.message = "Credenciales Invalidas";
      }
    })
  }

}
