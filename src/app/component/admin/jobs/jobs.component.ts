import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppUser } from 'src/app/model/appUser';
import { Apply } from 'src/app/model/apply';
import { Jobs } from 'src/app/model/jobs';
import { AppliedService } from 'src/app/service/applied.service';
import { JobsService as JobService } from 'src/app/service/jobservices.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
})
export class JobsComponent implements OnInit {
  jobs: Jobs[] = [];
  showLottie: boolean = false;
  error: string = '';

  options: AnimationOptions = {
    path: '/assets/noJobs.json',
  };


  constructor(
    private jobservices: JobService,
    private storageService: StorageService,
    private applyService: AppliedService
  ) {}
  userId: AppUser = this.storageService.getLoggedInUser();
  ngOnInit(): void {
    this.jobservices.getAllJobs().subscribe({
      next: (response: any) => {
        this.jobs = response.data;
        if(this.jobs.length<1){

        }
        console.log(this.jobs);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  deleteJob(jobid: number) {
    this.jobservices.deleteJob(jobid).subscribe({
      next: (response: any) => {
        this.jobs = this.jobs.filter((job: any) => job.id !== jobid);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
