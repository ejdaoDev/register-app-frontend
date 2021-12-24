import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root',
})
export class GuestGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(): | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (localStorage.getItem('auth_token') !== null) {
            this.router.navigate(['dashboard/users']);
            return false;
        } else {
            return true;
        }
    }
}