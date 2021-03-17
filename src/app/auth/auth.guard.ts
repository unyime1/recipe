// this module handles the guarding of routes

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthServiceService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        router: RouterStateSnapshot
    ): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
            const isAuth = user ? true : false;

            if (isAuth) {
                return true;
            }
            else {
                // return this route if authentication fails
                return this.router.createUrlTree(['/auth'])
            }
        }));
    }
}