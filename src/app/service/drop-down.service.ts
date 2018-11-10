import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { Url } from '../static/url.enum';
import { Error } from '../interface/error';
import { BlogDropDown } from '../interface/blog';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {

  exception: Error;

  constructor(private http: HttpClient) { }

  getTechnologiesService(): Observable<Array<BlogDropDown>> {
    return this.http.get<Array<BlogDropDown>>(Url.ServerBaseUrl.concat(Url.Technologies)).catch(this.handleException);
  }

  getSubTechnologiesService(id: string): Observable<BlogDropDown> {
    return this.http.get<BlogDropDown>(Url.ServerBaseUrl.concat(Url.SubTechnologies).concat(id)).catch(this.handleException);
  }

  handleException(error: HttpErrorResponse) {
    console.log(error);
    this.exception = error.error;
    if (this.exception.errorCode === "ks1100") {
      return throwError(this.exception.errorMessage);
    }
    return throwError('server failure');
  }
}
