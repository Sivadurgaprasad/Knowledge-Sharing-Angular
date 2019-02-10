import { Component, OnInit } from '@angular/core';
import { Url } from '../../static/url.enum';

@Component({
  selector: 'java-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private addBlog: string = Url.AngularBaseUrl.concat(Url.AddBlog);
  private addTechInfo: string = Url.AngularBaseUrl.concat(Url.AddTechnologyInfo);
  private home: string = Url.AngularBaseUrl;
  constructor() { }

  ngOnInit() {
  }

}
