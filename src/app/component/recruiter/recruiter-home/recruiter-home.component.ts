import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Apply } from 'src/app/model/apply';
import { Applyrequest } from 'src/app/model/applyrequest';
import { AppliedService } from 'src/app/service/applied.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-recruiter-home',
  templateUrl: './recruiter-home.component.html',
})
export class RecruiterHomeComponent implements OnInit {
  options: AnimationOptions = {
    path: 'assets/Animation - 1700379652449.json',
  };
  constructor(
    private storageService: StorageService,
    private applyService: AppliedService
  ) {}
  lottiee: boolean = false;
  error: string = '';
  Applications: Apply[] = [];
  user: AppUser = this.storageService.getLoggedInUser();
  ngOnInit(): void {
    this.applyService.applicationByCompanyId(this.user.id).subscribe({
      next: (response: AppResponse) => {
        this.Applications = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  changeStatus(application: Apply) {
    let apply: Applyrequest = {
      id: application.id!,
      profileId: application.profileId,
      jobId: application.jobId,
      status: application.status,
    };
    console.log(apply);
    this.applyService.changeJobStatus(apply).subscribe({
      next: (response: AppResponse) => {
        this.Applications = response.data;
        console.log(this.Applications);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
