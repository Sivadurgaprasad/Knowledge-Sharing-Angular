import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public highlight(content: string, query: string) {
    if(!query) {
        return content;
    }
    return content.replace(new RegExp(query, "gi"), match => {
        return '<span class="font-weight-bold">' + match + '</span>';
    });
}
}
