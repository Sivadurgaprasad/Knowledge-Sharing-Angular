import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { BlogService } from '../../service/blog.service';
import { IBlog, ImageUrl, BlogDropDown, SubTech } from 'src/app/interface/blog';
import { Router } from '../../../../node_modules/@angular/router';
import { ImageUploadService } from '../../service/image-upload.service';
import { Ksconstant } from '../../static/ksconstant';
import { HttpEventType, HttpEvent } from '../../../../node_modules/@angular/common/http';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { DropDownService } from '../../service/drop-down.service';
import { Error } from '../../interface/error';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  public SUBTECHS: string = "subTechs";
  public blogForm: FormGroup;
  public subTechsGroup: FormGroup;
  public name: string;
  public response: IBlog;
  public errorMessage: string;
  public imageName: string;
  public archetectureUrl: Array<string> = new Array<string>();
  public archPreImageName: string;
  public programUrl: Array<string> = new Array<string>();
  public programPreImageName: string;
  public outputUrl: Array<string> = new Array<string>();
  public outputPreImageName: string;
  public scenarioUrl: Array<string> = new Array<string>();
  public scenarioPreImageName: string;
  public archeDeleteImagepaths: Array<string> = new Array<string>();
  public scenarioDeleteImagePaths: Array<string> = new Array<string>();
  public programDeleteImagePaths: Array<string> = new Array<string>();
  public outputDeleteImagePaths: Array<string> = new Array<string>();
  public archeUploadImagePaths: Array<string> = new Array<string>();
  public scenarioUploadImagePaths: Array<string> = new Array<string>();
  public programUploadImagePaths: Array<string> = new Array<string>();
  public outputUploadImagePaths: Array<string> = new Array<string>();
  public successResponse: string;
  public progress;
  public imageAsFile: File;
  public allBlogs = [];
  public initialImageName: string;
  public dropDownDefault = { selected: true, value: "" };
  public dropDownTechnology: Array<BlogDropDown>;
  public dropDownsubTechnologies: Array<string>;


  constructor(private blogservice: BlogService,
    private router: Router,
    private imageService: ImageUploadService,
    private ksConstant: Ksconstant,
    private toaster: ToastrService,
    private dropdownService: DropDownService) {
    this.scenarioUrl.push(ksConstant.formImageUrl);
    this.archetectureUrl.push(ksConstant.formImageUrl);
    this.programUrl.push(ksConstant.formImageUrl);
    this.outputUrl.push(ksConstant.formImageUrl);
    this.initialImageName = ksConstant.formImageUrl;
  }

  ngOnInit() {
    this.blogForm = new FormGroup({
      id: new FormControl(''),
      technology: new FormControl('', Validators.required),
      subTechs: new FormArray([
        this.subTechs()
      ])
    });
  }

  subTechs() {
    return new FormGroup({
      subTech: new FormControl('', Validators.required),
      blog: new FormControl('', Validators.required),
      definitions: new FormArray([this.addDoubleFields('definition', 'explanation')]),
      examples: new FormArray([this.addTribleFields('example', 'program', 'explanation')]),
      importances: new FormArray([this.addSingleField('importance')]),
      inOutputs: new FormArray([this.addDoubleFields('in', 'out')]),
      limitations: new FormArray([this.addSingleField('limitation')]),
      archetectures: new FormArray([this.addTribleFields('archetecture', 'diagram', 'explanation')]),
      needs: new FormArray([this.addSingleField('need')]),
      references: new FormArray([this.addSingleField('reference')]),
      scenarios: new FormArray([this.addTribleFields('scenario', 'explanation', 'archetecture')])
    });
  }

  addSingleField(field): FormGroup {
    const arrayFields: FormGroup = new FormGroup({});
    arrayFields.addControl(field, new FormControl());
    return arrayFields;
  }

  addDoubleFields(field1, field2): FormGroup {
    const arrayFields: FormGroup = new FormGroup({});
    arrayFields.addControl(field1, new FormControl());
    arrayFields.addControl(field2, new FormControl());
    return arrayFields;
  }

  addTribleFields(field1, field2, field3): FormGroup {
    const arrayFields: FormGroup = new FormGroup({});
    arrayFields.addControl(field1, new FormControl());
    arrayFields.addControl(field2, new FormControl());
    arrayFields.addControl(field3, new FormControl());
    return arrayFields;
  }

  addSingle(groupName, field) {
    (<FormArray>(<FormArray>this.blogForm.controls['subTechs']).at(0).get(groupName)).push(this.addSingleField(field));
    this.toaster.info(field + " field added.");
  }

  addDouble(groupName, field1, field2) {
    if (groupName == 'inOutputs') {
      this.outputUrl[this.outputUrl.length] = this.ksConstant.formImageUrl;
    }
    (<FormArray>(<FormArray>this.blogForm.controls["subTechs"]).at(0).get(groupName)).push(this.addDoubleFields(field1, field2));
    this.toaster.info(field1 + " and " + field2 + " fields added.");
  }

  addTrible(groupName, field1, field2, field3) {
    if (groupName == 'scenarios') {
      this.scenarioUrl[this.scenarioUrl.length] = this.ksConstant.formImageUrl;
    } else if (groupName == 'archetectures') {
      this.archetectureUrl[this.archetectureUrl.length] = this.ksConstant.formImageUrl;
    } else if (groupName == 'examples') {
      this.programUrl[this.programUrl.length] = this.ksConstant.formImageUrl;
    }
    (<FormArray>(<FormArray>this.blogForm.controls['subTechs']).at(0).get(groupName)).push(this.addTribleFields(field1, field2, field3));
    this.toaster.info(field1 + " , " + field2 + " and " + field3 + " fields added.");
  }

  removeField(groupName: string, index: number) {
    switch (groupName) {
      case 'scenarios':
        this.scenarioUrl.splice(index, 1);
        this.scenarioDeleteImagePaths.push(this.scenarioUploadImagePaths[index]);
        this.scenarioUploadImagePaths.splice(index, 1);
        break;
      case 'archetectures':
        this.archetectureUrl.splice(index, 1);
        this.archeDeleteImagepaths.push(this.archeUploadImagePaths[index]);
        this.archeUploadImagePaths.splice(index, 1);
        break;
      case 'examples':
        this.programUrl.splice(index, 1);
        this.programDeleteImagePaths.push(this.programUploadImagePaths[index]);
        this.programUploadImagePaths.splice(index, 1);
        break;
      case 'inOutputs':
        this.outputUrl.splice(index, 1);
        this.outputDeleteImagePaths.push(this.outputUploadImagePaths[index]);
        this.outputUploadImagePaths.splice(index, 1);
        break;
      default:
        this.errorMessage = '';
    }
    (<FormArray>(<FormArray>this.blogForm.controls['subTechs']).at(0).get(groupName)).removeAt(index);
    this.toaster.error(groupName + " removed.")
  }

  onFileChange(event, index, group: string) {
    if (event.target.files && event.target.files[0]) {
      this.imageAsFile = <File>event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      switch (group) {
        case 'scenarios':
          reader.onload = (event) => { this.scenarioUrl[index] = (<FileReader>event.target).result; };
          this.scenarioPreImageName = this.imageName;
          break;
        case 'archetectures':
          reader.onload = (event) => { this.archetectureUrl[index] = (<FileReader>event.target).result; };
          this.archPreImageName = this.imageName;
          break;
        case 'examples':
          reader.onload = (event) => { this.programUrl[index] = (<FileReader>event.target).result; };
          this.programPreImageName = this.imageName;
          break;
        case 'inOutputs':
          reader.onload = (event) => { this.outputUrl[index] = (<FileReader>event.target).result; };
          this.outputPreImageName = this.imageName;
          break;
        default:
          this.errorMessage = '';
      }

      const file: FormData = new FormData();
      file.append("uploadImage", this.imageAsFile, this.imageAsFile.name);
      this.imageName = this.imageAsFile.name;
      this.imageService.upload(file).subscribe(eventRespo => {

        switch (group) {
          case 'archetectures':
            this.archeImageUrlManage(eventRespo, index);
            break;
          case 'scenarios':
            this.scenarioImageUrlManage(eventRespo, index);
            break;
          case 'examples':
            this.programImageUrlManage(eventRespo, index);
            break;
          case 'inOutputs':
            this.outputImageUrlManage(eventRespo, index);
            break;
          default:
            throw ("Type of field not found");
        }
        if (eventRespo.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(eventRespo.loaded / eventRespo.total * 100);
        }
      });
    }
  }

  archeImageUrlManage(event: HttpEvent<string>, index) {
    if (event.type === HttpEventType.Response) {
      if (this.archeUploadImagePaths[index] != null && this.archeUploadImagePaths[index].length > 0 && this.archeUploadImagePaths[index] != '') {
        this.archeDeleteImagepaths.push(this.archeUploadImagePaths[index]);
        this.toaster.info(this.archPreImageName + " added to remove list");
      }
      this.archeUploadImagePaths[index] = event.body['uploadImagePath'];
      this.toaster.success(this.imageName + " uploaded successfully");
    }
  }

  scenarioImageUrlManage(event: HttpEvent<string>, index) {
    if (event.type === HttpEventType.Response) {
      if (this.scenarioUploadImagePaths[index] != null && this.scenarioUploadImagePaths[index].length > 0 && this.scenarioUploadImagePaths[index] != '') {
        this.scenarioDeleteImagePaths.push(this.scenarioUploadImagePaths[index]);
        this.toaster.info(this.scenarioPreImageName + " added to remove list");
      }
      this.scenarioUploadImagePaths[index] = event.body['uploadImagePath'];
      this.toaster.success(this.imageName + " uploaded successfully");
    }
  }

  programImageUrlManage(event: HttpEvent<string>, index) {
    if (event.type === HttpEventType.Response) {
      if (this.programUploadImagePaths[index] != null && this.programUploadImagePaths[index].length > 0 && this.programUploadImagePaths[index] != '') {
        this.programDeleteImagePaths.push(this.programUploadImagePaths[index]);
        this.toaster.info(this.programPreImageName + " added to remove list");
      }
      this.programUploadImagePaths[index] = event.body['uploadImagePath'];
      this.toaster.success(this.imageName + " uploaded successfully");
    }
  }

  outputImageUrlManage(event: HttpEvent<string>, index) {
    if (event.type === HttpEventType.Response) {
      if (this.outputUploadImagePaths[index] != null && this.outputUploadImagePaths[index].length > 0 && this.outputUploadImagePaths[index] != '') {
        this.outputDeleteImagePaths.push(this.outputUploadImagePaths[index]);
        this.toaster.info(this.outputPreImageName + " added to remove list");
      }
      this.outputUploadImagePaths[index] = event.body['uploadImagePath'];
      this.toaster.success(this.imageName + " uploaded successfully");
    }
  }

  submitBlogForm(blogForm) {
    console.log(blogForm);
    let json = JSON.stringify(blogForm);
    console.log("form "+json);
    /* if (this.blogForm.get("technology").value != null && this.blogForm.get("technology").value != undefined && this.blogForm.get("technology").value != "") {
      for (let tech of this.dropDownTechnology) {
        if (tech.id === this.blogForm.get("technology").value) {
          blogForm["technology"] = tech.technology;
          break;
        }
      }
    }
    if (this.archeUploadImagePaths != null && this.archeUploadImagePaths.length > 0) {
      blogForm["archeUploadImagePaths"] = this.archeUploadImagePaths;
      for (let index = 0; index < this.archeUploadImagePaths.length; index++) {
        this.archeDeleteImagepaths.push(this.archeUploadImagePaths[index]);
      }
      blogForm["archeDeleteImagePaths"] = this.archeDeleteImagepaths;
    }
    if (this.scenarioUploadImagePaths != null && this.scenarioUploadImagePaths.length > 0) {
      blogForm["scenarioUploadImagePaths"] = this.scenarioUploadImagePaths;
      for (let index = 0; index < this.scenarioUploadImagePaths.length; index++) {
        this.scenarioDeleteImagePaths.push(this.scenarioUploadImagePaths[index]);
      }
      blogForm["scenarioDeleteImagePaths"] = this.scenarioDeleteImagePaths;
    }
    if (this.programUploadImagePaths != null && this.programUploadImagePaths.length > 0) {
      blogForm["programUploadImagePaths"] = this.programUploadImagePaths;
      for (let index = 0; index < this.programUploadImagePaths.length; index++) {
        this.programDeleteImagePaths.push(this.programUploadImagePaths[index]);
      }
      blogForm["programDeleteImagePaths"] = this.programDeleteImagePaths;
    }
    if (this.outputUploadImagePaths != null && this.outputUploadImagePaths.length > 0) {
      blogForm["outputUploadImagePaths"] = this.outputUploadImagePaths;
      for (let index = 0; index < this.outputUploadImagePaths.length; index++) {
        this.outputDeleteImagePaths.push(this.outputUploadImagePaths[index]);
      }
      blogForm["outputDeleteImagePaths"] = this.outputDeleteImagePaths;
    }
    console.log("adding blog to DB");
    this.blogservice.saveBlogService(blogForm).subscribe(response => {
      console.log("add blog component response :"+response);
      this.successResponse = response;
    }, (error: Error) => {
      console.log("add blog component error");
      this.errorMessage = error.errorMessage;
      // this.toaster.error(error.errorMessage);
    }); */
  }

  getTechnologies() {
    if (this.dropDownTechnology == null || this.dropDownTechnology == undefined || this.dropDownTechnology.length == 0) {
      this.dropdownService.getTechnologiesService().subscribe(tech => {
        console.log(tech);
        this.dropDownTechnology = tech;
      }, (error: Error) => {
        this.toaster.error(error.errorMessage);
      });
    }
  }

  getSubTechnologies(event) {
    let id = event.target.value;
    this.blogForm.controls['id'].setValue(id);
    if (id == null || id == "") {
      this.dropDownsubTechnologies = null;
    }
    if (id != null && id != undefined && id != '') {
      this.dropdownService.getSubTechnologiesService(id).subscribe(subTech => {
        this.dropDownsubTechnologies = subTech.subTechs;
        console.log(this.dropDownsubTechnologies);
      }, (error: Error) => {
        this.toaster.error(error.errorMessage);
      });
    } else {
      this.toaster.error("Please first select any one Technology");
    }
  }

}
