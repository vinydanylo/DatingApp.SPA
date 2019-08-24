
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { User } from '../_models/User';
import { HttpClient, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';



import { AuthHttp } from 'angular2-jwt';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private authHttp: AuthHttp) {}

  getUsers(): Observable<User[]> {
    return this.authHttp
      .get(this.baseUrl + 'users').pipe(
      map(response => <User[]>response.json()),
      catchError(this.handleError),);
  }

  getUser(id): Observable<User> {
    return this.authHttp
      .get(this.baseUrl + 'users/' + id).pipe(
      map(response => <User>response.json()),
      catchError(this.handleError),);
  }

  updateUser(id: number, user: User) {
    return this.authHttp
      .put(this.baseUrl + 'users/' + id, user).pipe(
      catchError(this.handleError));
  }

  setMainPhoto(userId: number, id: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {}).pipe(
      catchError(this.handleError));
  }

  deletePhoto(userId: number, id: number) {
    return this.authHttp.delete(this.baseUrl + 'users/' + userId + '/photos/' + id).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return observableThrowError(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return observableThrowError(modelStateErrors || 'Server error');
  }
}
