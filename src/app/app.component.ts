import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {isPlatformBrowser} from '@angular/common'
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthServiceService,
    //used to check whether app is running on server or browser
    @Inject(PLATFORM_ID) private platformId
  ) {}
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.autoLogin();
      console.log('user loaded!!!')
    }
    
  }
}
