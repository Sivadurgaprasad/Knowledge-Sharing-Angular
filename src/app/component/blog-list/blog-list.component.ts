import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../service/blog.service';
import { TechInfoResponse } from '../../interface/blog';
import { Url } from '../../static/url.enum';
import { ErrorMessageConstant } from '../../interface/error';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  private id: string;
  private techInfo: TechInfoResponse;
  private errorMessage: string;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private errorMessageConstant: ErrorMessageConstant) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.blogService.getSingleTechInfoService(this.id).subscribe(info => {
      this.techInfo = info;
      this.techInfo.techIconName = Url.AssetsTechInfoPath + this.techInfo.techIconName;
    });

  }

  getBlogDetails(subTech: string) {
    if (subTech != null || subTech != undefined || subTech != "")
      this.router.navigate(['/blogdetails', subTech]);
    else
      this.errorMessage = this.errorMessageConstant.Null_Id;
  }

}
