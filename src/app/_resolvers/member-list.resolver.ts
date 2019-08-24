
import {of as observableOf,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';



@Injectable()
export class MemberListResolver implements Resolve<User[]> {

    constructor(private userService: UserService,
        private router: Router,
        private alertifyService: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers().pipe(
            catchError(error => {
                this.alertifyService.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return observableOf(null);
            }));
    }
}
