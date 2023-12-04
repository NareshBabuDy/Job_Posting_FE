import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppUser } from 'src/app/model/appUser';
import { Apply } from 'src/app/model/apply';
import { Jobs } from 'src/app/model/jobs';
import { AppliedService } from 'src/app/service/applied.service';
import { JobsService } from 'src/app/service/jobservices.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
})
export class UserJobsComponent implements OnInit {
  jobs: Jobs[] = [];
  jobLottie: boolean = false;
  error: string = '';
  showLottie = false;
  options: AnimationOptions = {
    path: '/assets/applylottie.json',
  };
  nojob: AnimationOptions = {
    path: '/assets/noJobs.json',
  };
  constructor(
    private jobservices: JobsService,
    private storageService: StorageService,
    private applyService: AppliedService
    ) {}
    userId: AppUser = this.storageService.getLoggedInUser();
    ngOnInit(): void {
    this.jobservices.getAllJobs().subscribe({
      next: (response: any) => {
        this.jobs = response.data;
        if(this.jobs.length<1){
          this.jobLottie = true
        }
        console.log(this.jobs);
        
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  applyToJob(jobId: number) {
    let applyto: any = {
      profileId: this.userId.id,
      jobId: jobId,
      status: 'Applied',
    };
    this.applyService.applyToJob(applyto).subscribe({
      next: (response: any) => {
        this.ngOnInit;
        this.showLottie = true;  
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}