import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ImageUploadService } from '../../service/image-upload.service';
import { BlogService } from '../../service/blog.service';
import { HttpEventType } from '../../../../node_modules/@angular/common/http';
import { Ksconstant } from '../../static/ksconstant';
import { ToastrService } from 'ngx-toastr';
import { TechInfo, BlogDropDown } from '../../interface/blog';
import { DropDownService } from 'src/app/service/drop-down.service';
import { UtilService } from 'src/app/service/util.service';
import { mergeMap } from 'rxjs/operators';

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
  public allBlogs: Array<string>;
  public isTechExist: boolean = false;
  public hasError: boolean = false;
  public match: Array<string>;

  constructor(private uploadService: ImageUploadService,
    private blogService: BlogService, private dropdownService: DropDownService,
    private ksConstant: Ksconstant,
    private toaster: ToastrService,
    private utilService: UtilService) {
    this.cardUrl = ksConstant.formImageUrl;
  }

  ngOnInit() {
    this.techForm = new FormGroup({
      technology: new FormControl('', Validators.required),
      techIconName: new FormControl('', Validators.required),
      shortNote: new FormControl('', Validators.required),
      subTechnologies: new FormArray([this.addSingleField('subTechnology')])
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
        this.cardUrl = <string>(<FileReader>event.target).result;
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

  createCustomForm(group: FormGroup, subTechId: number): void {
    var custForm = {};
    group[this.ksConstant.TECHNOLOGY_KEY] = this.utilService.capitalizeFirst(group[this.ksConstant.TECHNOLOGY_KEY]);
    Object.keys(group).map((key: string) => {
      const abstControl = group[key];
      if (key != undefined && key === this.ksConstant.SUBTECHNOLOGIES_KEY) {
        abstControl.forEach((arr: string) => {
          arr[this.ksConstant.SUBTECHNOLOGY_KEY] = this.utilService.capitalizeFirst(arr[this.ksConstant.SUBTECHNOLOGY_KEY]);
          custForm[subTechId] = arr;
          subTechId++;
        });
        group[this.ksConstant.SUBTECHNOLOGIES_KEY] = custForm;
      }
    });
  }

  submitTechnologyForm(form) {

    if (this.uploadImagePath != undefined && this.uploadImagePath != null && this.uploadImagePath.length > 0) {
      form["uploadImagePath"] = this.uploadImagePath;
      this.deleteImageUrlList.push(this.uploadImagePath);
      form["deleteImageUrlList"] = this.deleteImageUrlList;
      this.blogService.getSequenceIds().pipe(
        mergeMap(sequenceInc => {
          this.createCustomForm(form, parseInt(sequenceInc.subTechnologyId));
          return this.blogService.saveTechInfoService(form);
        })
      ).subscribe(resp => {
        this.responseData = resp;
        console.log(this.responseData);
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
      this.allBlogs = new Array<string>();
      this.allBlogs = result;
    });
  }

  checkTechDuplicate(tech: string) {
    this.match = (this.allBlogs != null && this.allBlogs.length > 0) ? new Array<string>() : null;
    let isZeroSize: boolean = true;
    for (let blogs of this.allBlogs) {
      if (tech.trim().length > 0 && blogs != null && blogs.toLowerCase().startsWith(tech.toLowerCase().trim())) {
        if (tech.toLowerCase() === blogs.toLowerCase() && tech.length == blogs.length) {
          this.isTechExist = true;
          this.hasError = true;
          this.match = null;
          break;
        } else {
          if (this.match == null)
            this.match = new Array<string>();
          this.match.push(blogs);
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
