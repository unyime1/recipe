import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      // assign values to isAuthenticated by checking whether user exists or not
      this.isAuthenticated = user ? true: false;
    });

  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onfetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy () {
    this.userSub.unsubscribe()
  }
}
