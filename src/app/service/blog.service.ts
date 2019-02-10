import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Url } from '../static/url.enum';
import { IBlog, TechInfo, TechInfoResponse, SequenceInc } from '../interface/blog';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { FormGroup } from '../../../node_modules/@angular/forms';
import { catchError } from 'rxjs/operators';
import { Subject, throwError } from '../../../node_modules/rxjs';
import { Error } from '../interface/error';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  exception: Error;
  public sharedTechInfo = new Subject<TechInfo>();
  public sharedBlog = new Subject<IBlog>();

  constructor(private http: HttpClient) { }

  /** K.S Blog saving service call  */
  saveBlogService(blog: IBlog): Observable<string> {
    return this.http.post(Url.ServerBaseUrl + Url.BlogSave, blog, { responseType: "text" }).catch(this.handleError);
  }

  /** K.S Fetching all Blogs */
  getAllBlogsService(): Observable<IBlog[]> {
    return this.http.get<IBlog[]>(Url.ServerBaseUrl + Url.AllBlogs).catch(this.handleError);
  }

  getBlogService(subTechnology: string): Observable<IBlog> {
    return this.http.get<IBlog>(Url.ServerBaseUrl + Url.GetBlog + subTechnology).catch(this.handleError);
  }

  saveTechInfoService(techInfo: FormGroup): Observable<TechInfo> {
    return this.http.post<TechInfo>(Url.ServerBaseUrl + Url.SaveTechInfo, techInfo, { responseType: "json" }).catch(this.handleError);
  }

  getAllTechInfoService(): Observable<TechInfoResponse[]> {
    return this.http.get<TechInfoResponse[]>(Url.ServerBaseUrl + Url.AllTechInfo).catch(this.handleError);
  }

  getSingleTechInfoService(id: string): Observable<TechInfoResponse> {
    return this.http.get<TechInfoResponse>(Url.ServerBaseUrl + Url.GetSingleTechInfo + id).catch(this.handleError);
  }

  getSequenceIds(): Observable<SequenceInc> {
    return this.http.get<SequenceInc>(Url.ServerBaseUrl.concat(Url.SequenceId)).catch(this.handleError);
  }

  getTechnologyWithSubTechs(): Observable<Array<TechInfoResponse>> {
    return this.http.get<Array<TechInfoResponse>>(Url.ServerBaseUrl.concat(Url.AllTechnologyWithSubTechs)).catch(this.handleError);
  }

  /** K.S Error handling for Blog */
  handleError(error: HttpErrorResponse) {
    this.exception = error.error;
    if (this.exception.errorCode != null || this.exception.errorCode != "" || this.exception.errorCode != undefined) {
      return throwError(this.exception.errorMessage);
    }
    return throwError('server failure');
  }

}
