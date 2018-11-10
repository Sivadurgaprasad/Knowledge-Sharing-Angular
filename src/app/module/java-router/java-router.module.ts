import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { BodyComponent } from '../../component/body/body.component';
import { PageNotFoundComponent } from '../../component/page-not-found/page-not-found.component';
import { BlogListComponent } from '../../component/blog-list/blog-list.component';
import { BlogDetailsComponent } from '../../component/blog-details/blog-details.component';
import { AddBlogComponent } from '../../component/add-blog/add-blog.component';
import { AddTechInfoComponent } from '../../component/add-tech-info/add-tech-info.component';
import { SuccessComponent } from '../../component/success/success.component';
import { UpdateBlogComponent } from '../../component/update-blog/update-blog.component';
import { DeleteBlogComponent } from '../../component/delete-blog/delete-blog.component';
import { UpdateTechInfoComponent } from '../../component/update-tech-info/update-tech-info.component';
import { DeleteTechInfoComponent } from '../../component/delete-tech-info/delete-tech-info.component';
import { AllBlogsComponent } from '../../component/all-blogs/all-blogs.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: BodyComponent },
  { path: 'addBlog', component: AddBlogComponent},
  { path: 'bloglist/:id', component: BlogListComponent},
  { path: 'blogdetails/:technology', component: BlogDetailsComponent},
  { path: 'addTechInfo', component: AddTechInfoComponent},
  { path: 'allBlogs', component: AllBlogsComponent},
  { path: 'success', component: SuccessComponent},
  { path: '**', component: PageNotFoundComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class JavaRouterModule { }
export const routingComponents = [BodyComponent,
                                  PageNotFoundComponent,
                                  BlogListComponent,
                                  BlogDetailsComponent,
                                  AddBlogComponent,
                                  AddTechInfoComponent,
                                  SuccessComponent,
                                  UpdateBlogComponent,
                                  DeleteBlogComponent,
                                  UpdateTechInfoComponent,
                                  DeleteTechInfoComponent,
                                  AllBlogsComponent
                                  ];