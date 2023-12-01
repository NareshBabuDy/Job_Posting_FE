import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppUser } from 'src/app/model/appUser';
import { Category } from 'src/app/model/category';
import { Jobs } from 'src/app/model/jobs';
import { AppliedService } from 'src/app/service/applied.service';
import { CategoryService } from 'src/app/service/category.service';
import { JobsService } from 'src/app/service/jobservices.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-recruiter-jobs',
  templateUrl: './recruiter-jobs.component.html',
})
export class RecruiterJobsComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/no posts.json',
  };

  
  add() {
    this.jobForm = true;
    this.lottieee = false; // Hide Lottie animation when adding a new post
  }
  
  jobTitle: string = '';
  jobDescription: string = '';
  jobCount: number = 1;
  lastdate: string = '';
  postedDate: string = '';
  categoryId: string = '';
  companyId: number = 1;
  jobId: number = 0;
  submitbtn: string = 'Post Job';
  jobForm: boolean = false;

  lottieee: boolean = false;
  jobs: Jobs[] = [];
  categories: Category[] = [];
  error: string = '';
  constructor(
    private jobservices: JobsService,
    private storageService: StorageService,
    private categoryService: CategoryService
  ) {}
  userId: AppUser = this.storageService.getLoggedInUser();
  ngOnInit(): void {
    this.jobservices.getAllJobsByCompanyId(this.userId.id).subscribe({
      next: (response: any) => {
        this.jobs = response.data;
        if(this.jobs.length<1){
          this.lottieee = true
        }
        console.log(this.jobs);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  postJob() {
    if (this.jobId !== 0) {
      let Job: any = {
        id: this.jobId,
        title: this.jobTitle,
        description: this.jobDescription,
        count: this.jobCount,
        lastdate: this.lastdate,
        categoryId: this.categoryId,
        companyId: this.userId.id,
      };
      console.log(Job);
      
      this.jobservices.EditJob(Job).subscribe({
        next: (response: any) => {
          console.log("edited");
          
          this.jobs = response.data
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
      });
    } else {
      let Job: Jobs = {
        title: this.jobTitle,
        description: this.jobDescription,
        count: this.jobCount,
        lastdate: this.lastdate,
        categoryId: this.categoryId,
        companyId: this.storageService.getLoggedInUser().id,
      };
      this.jobservices.addJob(Job).subscribe({
        next: (response: any) => {
          console.log("posted");
          
          this.ngOnInit;
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
      });
    }
    this.jobTitle = '';
    this.jobDescription = '';
    this.jobCount = 1;
    this.lastdate = '';
    this.postedDate = '';
    this.categoryId = '';
    this.companyId = 1;
    this.jobId = 0;
    this.submitbtn = 'Post Job';
    this.jobForm = false;
    this.jobservices.getAllJobsByCompanyId(this.userId.id).subscribe({
      next: (response: any) => {
        this.jobs = response.data;
        console.log(this.jobs);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  deleteJob(jobid: number) {
    this.jobservices.deleteRecruiterJob(jobid).subscribe({
      next: (response: any) => {
        this.jobs = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  editJob(job: Jobs) {
    this.jobForm = true;
    this.jobId = job.id!;
    this.jobTitle = job.title;
    this.jobDescription = job.description;
    this.jobCount = job.count;
    this.lastdate = job.lastdate;
    this.categoryId = job.categoryId;
    this.submitbtn = 'Edit & Post';
  }
}
