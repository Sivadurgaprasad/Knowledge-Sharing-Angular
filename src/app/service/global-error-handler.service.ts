import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { overrideProvider } from '../../../node_modules/@angular/core/src/view';


@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any): void {
    
    }
  

}
