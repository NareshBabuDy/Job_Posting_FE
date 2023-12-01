import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Apply } from 'src/app/model/apply';
import { Profile } from 'src/app/model/profile';
import { AppliedService } from 'src/app/service/applied.service';
import { HomeService } from 'src/app/service/home.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/noJobs.json',
  };
  showlottie:boolean = false;
  constructor(
    private appliedService: AppliedService,
    private storageService: StorageService
  ) {}
  user: AppUser = this.storageService.getLoggedInUser();
  applied: Apply[] = [];
  error: string = ''
  ngOnInit(): void {
    this.appliedService.appliedJobs(this.user.id).subscribe({
      next: (response: AppResponse) => {
        this.applied = response.data;
        if(this.applied.length<1){
          this.showlottie= true;
        }
        console.log(this.applied);
        
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}