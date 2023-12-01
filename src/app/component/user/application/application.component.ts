import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Apply } from 'src/app/model/apply';
import { AppliedService } from 'src/app/service/applied.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
})
export class ApplicationComponent implements OnInit {
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
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
