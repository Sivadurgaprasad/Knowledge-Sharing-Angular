import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../service/blog.service';
import { TechInfoResponse } from '../../interface/blog';
import { Url } from '../../static/url.enum';
import { ErrorMessageConstant } from '../../interface/error';

@Component({
  selector: 'java-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  public techInfo: Array<TechInfoResponse> = null;
  errorMessage: string;

  ngOnInit(): void {
    console.log(Math.floor(8));
    this.blogService.getAllTechInfoService().subscribe(response => {
      this.techInfo = response;
      this.techInfo.forEach(info => {
        info.techIconName = Url.AssetsTechInfoPath + info.techIconName;
      });
    }, error => {
      this.errorMessage = error;
    });
  }

  constructor(private router: Router,
    private blogService: BlogService,
    private errorMessageConstant: ErrorMessageConstant) {

  }

  getTechnologyInfo(id: string) {
    if (id != null || id != undefined || id != "")
      this.router.navigate(["/bloglist", id]);
    else
      this.errorMessage = this.errorMessageConstant.Null_Id;

  }
}
