import { NgModule } from '@angular/core';
import { MatCheckboxModule, MatButtonModule, MatInputModule, MatOptionModule, MatFormFieldModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [ MatCheckboxModule, MatButtonModule, MatInputModule, MatOptionModule, MatFormFieldModule, MatSelectModule ],
  exports: [ MatCheckboxModule, MatButtonModule, MatInputModule, MatOptionModule, MatFormFieldModule, MatSelectModule ]
})
export class AngularMaterialModule { }
