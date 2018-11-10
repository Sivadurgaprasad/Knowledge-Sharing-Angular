import { Component, OnInit, OnChanges, Input, OnDestroy } from '@angular/core';
import { TechInfo, IBlog } from '../../interface/blog';
import { BlogService } from '../../service/blog.service';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'ks-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit, OnDestroy {

  public addTechInfo: TechInfo;
  public addBlog: IBlog;
  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
    // this.blogService.getSharedTechInfo().subscribe(sharedData => {
    //   this.addTechInfo = sharedData;
    // });
    // this.blogService.getSharedBlog().subscribe(blog =>{
    //   this.addBlog = blog;
    // });
  }

  ngOnDestroy() {
    // this.blogService.sharedTechInfo.unsubscribe();
    // this.blogService.sharedBlog.unsubscribe();
  }
}
