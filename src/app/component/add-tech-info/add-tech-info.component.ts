import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ImageUploadService } from '../../service/image-upload.service';
import { BlogService } from '../../service/blog.service';
import { HttpEventType } from '../../../../node_modules/@angular/common/http';
import { Ksconstant } from '../../static/ksconstant';
import { ToastrService } from 'ngx-toastr';
import { TechInfo } from '../../interface/blog';

@Component({
  selector: 'add-tech-info',
  templateUrl: './add-tech-info.component.html',
  styleUrls: ['./add-tech-info.component.css']
})
export class AddTechInfoComponent implements OnInit, OnDestroy {

  public techForm: FormGroup;
  public selectedFile: File;
  public errorMessage: string;
  public deleteImageUrlList: Array<string> = [];
  public uploadImagePath: string;
  public showProgress: boolean = false;
  public progress;
  public responseData: TechInfo;
  public cardUrl: string;
  public imageName: string;
  public preImageName: string;

  constructor(private uploadService: ImageUploadService,
    private blogService: BlogService,
    private ksConstant: Ksconstant,
    private toaster: ToastrService) {
    this.cardUrl = ksConstant.formImageUrl;
  }

  ngOnInit() {
    this.techForm = new FormGroup({
      blog: new FormControl('', Validators.required),
      blogIcon: new FormControl('', Validators.required),
      shortNote: new FormControl('', Validators.required),
      subTechs: new FormArray([this.addSingleField('subTech')])
    });
  }

  addSingleField(field): FormGroup {
    const arrayFields: FormGroup = new FormGroup({});
    arrayFields.addControl(field, new FormControl());
    return arrayFields;
  }

  addSingle(groupName, field) {
    (<FormArray>this.techForm.get(groupName)).push(this.addSingleField(field));
    this.toaster.info(field + " added");
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = <File>event.target.files[0];
      let reader = new FileReader();
      reader.onload = (event) => {
        this.cardUrl = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
      const file: FormData = new FormData();
      file.append("uploadImage", this.selectedFile, this.selectedFile.name);
      this.preImageName = this.imageName;
      this.imageName = this.selectedFile.name;
      this.uploadService.upload(file).subscribe(event => {
        if (event.type === HttpEventType.Response && this.uploadImagePath != null && this.uploadImagePath.length > 0) {
          this.deleteImageUrlList.push(this.uploadImagePath);
          this.toaster.info(this.preImageName + " Image added to delete list");
        }
        if (event.type === HttpEventType.Response) {
          this.uploadImagePath = event.body['uploadImagePath'];
          this.toaster.success(this.imageName + " Image Uploaded Successfully");
        } else
          if (event.type === HttpEventType.UploadProgress) {
            this.showProgress = true;
            this.progress = Math.round(event.loaded / event.total * 100);
          }
      }, error => {
        this.toaster.error(error);
      });
    }
  }

  submitTechnologyForm(form) {
    if (this.uploadImagePath != null && this.uploadImagePath.length > 0) {
      form["uploadImagePath"] = this.uploadImagePath;
      this.deleteImageUrlList.push(this.uploadImagePath);
      form["deleteImageUrlList"] = this.deleteImageUrlList;
      this.blogService.saveTechInfoService(form).subscribe(resp => {
        // this.blogService.setSharedTechInfo(resp);
        this.responseData = resp;
      }, error => {
        this.errorMessage = "Technology submitting has some problem, Please try again after some time..."
      });
    }
    // this.router.navigateByUrl("/success");
  }

  removeField(groupName, index) {
    (<FormArray>this.techForm.get(groupName)).removeAt(index);
    this.toaster.error(groupName + " Field removed");
  }

  ngOnDestroy() {
    // this.blogService.clearSharedTechInfo();
  }

}
