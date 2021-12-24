import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSetTheme(e: string) {
    if (e != localStorage.getItem('style')) {
      localStorage.setItem('style', e);
      localStorage.setItem("reloadior", "true");
      window.location.reload();
    }
  }

  
  onLogout(){
    Swal.fire({
      title: 'Seguro deseas finalizar tu sesión?',
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      denyButtonText: `Cerrar Sesión`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isDenied) {
        localStorage.clear();
        this.router.navigate(['session/login']);
      }
    })
  }

}