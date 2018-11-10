import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Url } from '../static/url.enum';
import 'rxjs/add/operator/catch';
import 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { resolveComponentResources } from '../../../node_modules/@angular/core/src/metadata/resource_loading';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  upload(image: FormData): Observable<HttpEvent<string>> {
    return this.http.post<string>(Url.ServerBaseUrl + Url.Upload, image, {
      reportProgress: true, responseType: "json", observe: "events"
    }).catch(this.handleError);
  }

  getImageService(id:string): Observable<Blob> {
    return this.http.get(Url.ServerBaseUrl+Url.GetImage+id, {responseType: "blob"});
  }

  handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      return Observable.throw(error.message);
    } else if (error.status == 404) {
      return Observable.throw(error.message);
    }

    return Observable.throw(error.message);
  }
}
