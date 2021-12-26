import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { UsersFormComponent } from '../users-form/users-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dataSource: any = new MatTableDataSource<any>(JSON.parse(localStorage.getItem('users')!));
  searchKey: any;
  users: any;

  displayedColumns: string[] = ['firstname', 'firstlastname', 'email', 'country', 'area', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;
  @ViewChild(MatSort, { static: true }) sort: MatSort | any;

  constructor(private dialog: MatDialog, private api: ApiService) { }
  /**
   * Ejecutar al cargar el componente
   */
  ngOnInit() {
    this.getUsers();
  }

  /**
   * Elimina el usuario seleccionado
   * @param id
   */
  onDelete(id: number) {
    Swal.fire({
      title: 'Seguro deseas eliminar este usuario?',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Eliminar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire('El usuario fue eliminado correctamente!', '', 'success');
        this.api.delete('user/' + id).subscribe(() => {
          this.getUsers();
        });
      }
    })
  }

  /**
   * Abre el dialog UsersFormComponent, y muestra diferentes valores basado en el valor "type"
   * @param type 
   * @param id 
   */
  onUserForm(type: string, id: any = null) {
    let user;
    if (type === "create") {
      user = null;
    } else if (type === "edit" || type === "info") {
      user = JSON.parse(localStorage.getItem('users')!).filter((user: { id: number; }) => user.id === id)[0];
    }
    const dialogRef = this.dialog.open(UsersFormComponent, { width: '600px', height: '470px', data: { type: type, user: user } });
    dialogRef.afterClosed().subscribe(() => {
      if (localStorage.getItem('needUpdateUsers') !== null) {
        this.getUsers();
        localStorage.removeItem('needUpdateUsers');
      }
    })
  }

  /**
   * Obtener los usuarios creados por el usuario autenticado
   */
  getUsers() {
    this.api.get('user').subscribe(response => {
      localStorage.setItem('users', JSON.stringify(response.data.users));
      this.dataSource = new MatTableDataSource<any>(JSON.parse(localStorage.getItem('users')!));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  /**
   * Limpia el input "searchKey" 
   */
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  /**
   * Filtra los valores de la tabla basado en los valores del input "searchKey"
   */
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
