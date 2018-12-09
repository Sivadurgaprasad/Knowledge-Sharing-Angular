import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ImageUploadService } from '../../service/image-upload.service';
import { BlogService } from '../../service/blog.service';
import { HttpEventType } from '../../../../node_modules/@angular/common/http';
import { Ksconstant } from '../../static/ksconstant';
import { ToastrService } from 'ngx-toastr';
import { TechInfo, BlogDropDown } from '../../interface/blog';
import { DropDownService } from 'src/app/service/drop-down.service';

@Component({
  selector: 'add-tech-info',
  templateUrl: './add-tech-info.component.html',
  styleUrls: ['./add-tech-info.component.css']
})
export class AddTechInfoComponent implements OnInit {

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
  public allBlogs: Array<BlogDropDown>;
  public isTechExist: boolean = false;
  public hasError: boolean = false;
  public match: Array<string>;

  constructor(private uploadService: ImageUploadService,
    private blogService: BlogService, private dropdownService: DropDownService,
    private ksConstant: Ksconstant,
    private toaster: ToastrService) {
    this.cardUrl = ksConstant.formImageUrl;
  }

  ngOnInit() {
    this.techForm = new FormGroup({
      technology: new FormControl('', Validators.required),
      techIconName: new FormControl('', Validators.required),
      shortNote: new FormControl('', Validators.required),
      subTechs: new FormArray([this.addSingleField('subTech')])
    });
    this.getAllTechnologies();
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
    // for loop for converting Object form to normal strings
    const subTechsList = this.techForm.get('subTechs') as FormArray;
    for (let i = 0; i < subTechsList.length; i++) {
      this.techForm.value.subTechs[i] = this.techForm.value.subTechs[i].subTech;
    }

    if (this.uploadImagePath != null && this.uploadImagePath.length > 0) {
      form["uploadImagePath"] = this.uploadImagePath;
      this.deleteImageUrlList.push(this.uploadImagePath);
      form["deleteImageUrlList"] = this.deleteImageUrlList;
      this.blogService.saveTechInfoService(form).subscribe(resp => {
        this.responseData = resp;
      }, error => {
        this.errorMessage = "Technology submitting has some problem, Please try again after some time..."
      });
    }
  }

  removeField(groupName, index) {
    (<FormArray>this.techForm.get(groupName)).removeAt(index);
    this.toaster.error(groupName + " Field removed");
  }

  getAllTechnologies() {
    this.dropdownService.getTechnologiesService().subscribe(result => {
      this.allBlogs = new Array<BlogDropDown>();
      this.allBlogs = result;
    });
  }

  checkTechDuplicate(tech: string) {
    this.match = (this.allBlogs != null && this.allBlogs.length > 0) ? new Array<string>() : null;
    let isZeroSize: boolean = true;
    for (let blogs of this.allBlogs) {
      if (tech.trim().length > 0 && blogs.technology != null && blogs.technology.toLowerCase().startsWith(tech.toLowerCase().trim())) {
        if (tech.toLowerCase() === blogs.technology.toLowerCase() && tech.length == blogs.technology.length) {
          this.isTechExist = true;
          this.hasError = true;
          this.match = null;
          break;
        } else {
          if (this.match == null)
            this.match = new Array<string>();
          this.match.push(blogs.technology);
          isZeroSize = false;
          this.hasError = false;
          this.isTechExist = false;
        }
      } else if (tech.trim().length == 0) {
        this.isTechExist = false;
        this.hasError = true;
        this.match = null;
      } else {
        this.hasError = false;
        if (this.match != null && isZeroSize && this.match.length == 0)
          this.match = null;
        this.isTechExist = false;
      }
    }
  }

}
