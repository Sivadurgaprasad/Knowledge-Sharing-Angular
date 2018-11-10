import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn:'root'
})
export class LoadingService {
  public isLoading = new BehaviorSubject<boolean>(false);
  constructor() { }

  getLoadingInfo():Observable<boolean>{
    return this.isLoading.asObservable();
  }
}
