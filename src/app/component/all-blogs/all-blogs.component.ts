import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { TechInfoResponse } from 'src/app/interface/blog';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageConstant } from 'src/app/interface/error';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {

  techInfo: Array<TechInfoResponse>;
  private errorMessage: string;

  constructor(private blogService: BlogService, private activeRoute: ActivatedRoute,
    private router: Router, private errorMessageConstant: ErrorMessageConstant, private toastrService: ToastrService) { }

  ngOnInit() {
    this.blogService.getTechnologyWithSubTechs().subscribe(response => {
      this.techInfo = response;
    }, error => {
      this.toastrService.error("Server failure, please try agian...");
    });
  }

  getBlogDetails(subTech: string) {
    if (subTech != null || subTech != undefined || subTech != "")
      this.router.navigate(['/blogdetails', subTech]);
    else
      this.errorMessage = this.errorMessageConstant.Null_Id;
  }

  editSubTechnology(subTech: string) {
    console.log("edit :" + subTech);
  }

  deleteSubTechnology(subTech: string) {
    console.log("delete :" + subTech);
  }

}
