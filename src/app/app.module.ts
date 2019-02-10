import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, ErrorHandler } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { JavaRouterModule, routingComponents } from './module/java-router/java-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './module/angular-material/angular-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatIconModule } from '../../node_modules/@angular/material';
import { AngularWebStorageModule } from 'angular-web-storage';
import { LoadingInterceptor } from './interceptor/loading-interceptor.service';
import { Ksconstant } from './static/ksconstant';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { GlobalErrorHandlerService } from './service/global-error-handler.service';
import { ErrorMessageConstant } from './interface/error';
import { HighlightModule } from 'ngx-highlightjs';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents
  ],
  imports: [
    CommonModule,
    BrowserModule,
    JavaRouterModule,
    HighlightModule.forRoot({ theme: 'idea' }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    MatIconModule,
    AngularWebStorageModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right'
    })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    Ksconstant,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    { provide: APP_BASE_HREF, useValue: '/'},
    ToastrService,
    ErrorMessageConstant
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(matIconRegistry: MatIconRegistry) {
  //   matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  // }
}

