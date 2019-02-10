import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HttpEventType } from '../../../node_modules/@angular/common/http';
import { LoadingService } from '../service/loading.service';
import { Observable, throwError, of } from '../../../node_modules/rxjs';
import { ToastrService } from '../../../node_modules/ngx-toastr';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor(private loadingService: LoadingService, private toaster: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loadingService.isLoading.next(true);
    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse || HttpEventType) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          (err: HttpErrorResponse) => {
            this.removeRequest(req);
            console.log(err);
            console.log("Regular Http status code occured in back end status code " + err.status);
            switch (err.status) {
              case 0:
                this.toaster.error("Server not yet start please start server first", "", { positionClass: 'toast-top-right', timeOut: 10000, tapToDismiss: true });
                break;
              case 401:
                this.toaster.error("Input data not matching with requirement please check once again and try", "", { positionClass: 'toast-top-right', timeOut: 10000, tapToDismiss: true });
                break;
              case 404:
                this.toaster.error("Resource not found with this path " + err.error.path, "", { positionClass: 'toast-top-right', timeOut: 10000, tapToDismiss: true });
                break;
              case 415:
                this.toaster.error("Unsupported media format, please check once", "", { positionClass: 'toast-top-right', timeOut: 10000, tapToDismiss: true });
                break;
              case 502:
                this.toaster.error("Request time out please try again once", "", { positionClass: 'toast-top-right', timeOut: 10000, tapToDismiss: true });
              case 500:
                this.toaster.error(err.error.message, "", { positionClass: 'toast-top-right', timeOut: 10000, tapToDismiss: true });
              default:
                throw err;
            }
          },
          () => { this.removeRequest(req); observer.complete(); });
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    this.requests.splice(i, 1);
    this.loadingService.isLoading.next(this.requests.length > 0);
  }
}
