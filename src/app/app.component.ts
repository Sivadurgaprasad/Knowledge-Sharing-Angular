import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { BodyComponent } from './component/body/body.component';
import { LoadingService } from './service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HeaderComponent,
    FooterComponent,
    BodyComponent
  ]
})
export class AppComponent implements OnInit {
  title = 'Java-Web';
  public loading: boolean;
  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.getLoadingInfo().subscribe(loading => {
      this.loading = loading;
    });
  }
}
