import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  constructor(private api: ApiService, 
    private dialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  RegisterUserForm = new FormGroup({
    idtypeId: new FormControl('', Validators.required),
    idnumber: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)]),
    firstname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ0-9 ]+$/)]),
    secondname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ0-9 ]+$/)]),
    firstlastname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ0-9 ]+$/)]),
    secondlastname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZñáéíóúÑÁÉÍÓÚ0-9 ]+$/)]),
    roleId: new FormControl('', Validators.required),
    gimId: new FormControl(''),
  });
  error: boolean = false;
  exit: boolean = false;
  msg = "";
  roles:any;
  gims:any;
  title:string="";
  action:string="";

  ngOnInit() {
   if(this.data.type === 'create'){
      this.title = "Crear Usuario";
      this.action = "Crear";
    } 
    else if(this.data.type === 'edit'){
      this.title = "Editar Usuario";
      this.action = "Actualizar";
      this.RegisterUserForm.controls['idnumber'].setValue(this.data.user.idnumber);
      this.RegisterUserForm.controls['firstname'].setValue(this.data.user.firstname);
      this.RegisterUserForm.controls['firstlastname'].setValue(this.data.user.firstlastname);
      this.RegisterUserForm.controls['secondname'].setValue(this.data.user.secondname);
      this.RegisterUserForm.controls['secondlastname'].setValue(this.data.user.secondlastname);
    }

  }

  onReset(){
    this.RegisterUserForm.reset();
    this.error = false;
    this.exit = false;
  }

  onRegisterUser(form: any) {
    
  }

}


