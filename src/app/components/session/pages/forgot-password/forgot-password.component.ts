import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public   formUserSignup: FormGroup;

  constructor(private  snack:        MatSnackBar){
      this.formUserSignup = new FormGroup({
      id:             new  FormControl( ),
      name:           new  FormControl(Validators.required),
      lastName:       new  FormControl( Validators.required),
      age:            new  FormControl( Validators.required),
      address:        new  FormControl(Validators.required),
      state:          new  FormControl( null),
      roles:          new  FormControl( null),
      clave:          new  FormControl( null)
    });
  }

  ngOnInit(): void {

  }

 
 onSubmit(){

   }
 }
