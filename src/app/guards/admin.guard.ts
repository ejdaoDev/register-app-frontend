import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate():
        | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (localStorage.getItem('auth_user') !== null) {
            let user = JSON.parse(localStorage.getItem('auth_user')!);
            if (user.role.name === "ADMIN") {
                return true;
            } else {
                this.router.navigate(['dashboard/home']);
                return false;
            }
        } else {
            return false;
        }
    }
}