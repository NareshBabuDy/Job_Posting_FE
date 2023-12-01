import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { AppUser } from './model/appUser';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  

  username: AppUser ={
    id: 0,
    username: '',
    role: '',
    name: ''
  } ;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  isRecruiter: boolean = false;

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    private storageService: StorageService
  ) {}



  ngOnInit(): void {
    this.username= this.storageService.getLoggedInUser(); 
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isRecruiter$.subscribe((isRecruiter) => {
      this.isRecruiter = isRecruiter;
    });
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

 
}
