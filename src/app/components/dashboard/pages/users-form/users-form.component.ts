import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  constructor(private api: ApiService,
    private dialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  UserForm = new FormGroup({
    idtype: new FormControl('', Validators.required),
    idnumber: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)]),
    role: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    country: new FormControl('', Validators.required),
    firstname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    secondname: new FormControl('', [Validators.pattern(/^[a-zA-Z ]+$/)]),
    firstlastname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
    secondlastname: new FormControl('', [Validators.pattern(/^[a-zA-Z ]+$/)]),
    createdAt: new FormControl('', [Validators.required]),
  });
  error: boolean = false;
  exit: boolean = false;
  msg = "";
  title: string = "";
  action: string = "";
  create: boolean = false;
  edit: boolean = false;
  info: boolean = false;
  createdAt:string = "";
  requiredError: string = "EL campo es requerido";
  patternError: string = "Algunos caracteres son invalidos";

  areas: any = [
    { value: "ADMINISTRACION", name: "ADMINISTRACION" },
    { value: "FINANCIERA", name: "FINANCIERA" },
    { value: "COMPRAS", name: "COMPRAS" },
    { value: "TALENTO HUMANO", name: "TALENTO HUMANO" },
    { value: "INFRASTRUCTURA", name: "INFRASTRUCTURA" },
    { value: "SERVICIOS VARIOS", name: "SERVICIOS VARIOS" },
    { value: "OPERACION", name: "OPERACION" },
  ]

  countries: any = [
    { abbrev: "co", name: "COLOMBIA" },
    { abbrev: "us", name: "ESTADOS UNIDOS" }
  ]

  roles: any = [
    { value: "ADMIN", name: "ADMIN" },
    { value: "EMPLOYEE", name: "EMPLOYEE" }
  ]

  idtypes: any = [
    { value: "C.C", name: "C.C" },
    { value: "C.E", name: "C.E" },
    { value: "PASAPORTE", name: "PASAPORTE" },
    { value: "PEP", name: "PEP" }
  ]

  ngOnInit() {
    if (this.data.type === 'create') {
      this.title = "Crear Usuario";
      this.action = "Crear";
      this.create = true;
    }
    else if (this.data.type === 'edit') {
      this.title = "Editar Usuario";
      this.action = "Actualizar";
      this.edit = true;
      this.setFormValues();
    } 
    else if (this.data.type === 'info') {
      this.title = "Información del Usuario "; 
      this.info = true;
      this.setFormValues();
      moment.locale('es');
      this.createdAt = moment(this.data.user.createdAt).format('MMMM DD YYYY');
      this.disableFormControls();
    }

  }

  setFormValues() {
    this.UserForm.controls['idtype'].setValue(this.data.user.idtype.abbrev);
    this.UserForm.controls['idnumber'].setValue(this.data.user.idnumber);
    this.UserForm.controls['area'].setValue(this.data.user.area.name);
    this.UserForm.controls['role'].setValue(this.data.user.role.name);
    this.UserForm.controls['country'].setValue(this.data.user.country.abbrev);
    this.UserForm.controls['firstname'].setValue(this.data.user.firstname);
    this.UserForm.controls['firstlastname'].setValue(this.data.user.firstlastname);
    this.UserForm.controls['secondname'].setValue(this.data.user.secondname);
    this.UserForm.controls['secondlastname'].setValue(this.data.user.secondlastname);
    this.UserForm.controls['createdAt'].setValue(moment());
  }

  disableFormControls() {
    this.UserForm.controls['idtype'].disable();
    this.UserForm.controls['idnumber'].disable();
    this.UserForm.controls['area'].disable();
    this.UserForm.controls['role'].disable();
    this.UserForm.controls['country'].disable();
    this.UserForm.controls['firstname'].disable();
    this.UserForm.controls['firstlastname'].disable();
    this.UserForm.controls['secondname'].disable();
    this.UserForm.controls['secondlastname'].disable();
    this.UserForm.controls['createdAt'].disable();
  }

  onReset() {
    this.UserForm.reset();
    this.error = false;
    this.exit = false;
  }

  onSubmit(form: any) {
    form.firstname = form.firstname.toUpperCase().trim()
    form.secondname = form.secondname.toUpperCase().trim()
    form.firstlastname = form.firstlastname.toUpperCase().trim()
    form.secondlastname = form.secondlastname.toUpperCase().trim()
    if (this.create) {
      if (moment(form.createdAt).format() < moment().subtract(30, "d").format('YYYY-MM-DD') ||
        moment(form.createdAt).format() > moment().format('YYYY-MM-DD')) {
        this.error = true;
        this.msg = "La fecha de registro es mayor a hoy o tiene mas de 30 días";
      } else {
        this.api.post(form, 'user').subscribe(response => {
          if (response.status === 200) {
            this.exit = true;
            this.error = false;
            this.msg = "El usuario fue registrado correctamente";
            localStorage.setItem('needUpdateUsers', 'true');
            this.UserForm.reset();
            setTimeout(() => { this.exit = false; this.error = false; }, 1000);
          } else {
            this.error = true;
            this.msg = "Esta identificación ya existe";
          }
        })
      }
    }
    if (this.edit) {
      this.api.put(form, 'user/' + this.data.user.id).subscribe(response => {
        if (response.status === 200) {
          this.exit = true;
          this.error = false;
          this.msg = "El usuario fue actualizado correctamente";
          localStorage.setItem('needUpdateUsers', 'true');
          this.UserForm.reset();
          setTimeout(() => { this.dialogRef.close() }, 1000);
        } if (response.status === 204) {
          this.error = true;
          this.msg = "El email y/o identificación ya existe";
        }

      })
    }
  }

}


