import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Profile } from 'src/app/model/profile';
import { ProfileService } from 'src/app/service/profile.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  user: AppUser = this.storageService.getLoggedInUser();
  error: string = '';
  showEditForm = false;
  profiles: Profile = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    email: '',
    skills: '',
    experience: '',
    appUserId: 0,
    photo: '',
    resume: ''
  };
  ifirstname: string = '';
  ilastName: string = '';
  igender: string = '';
  iphoneNumber: string = '';
  iemail: string = '';
  iskills: string = '';
  iexperience: string = '';
  profilePhoto: any = [];

  constructor(
    private storageService: StorageService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    console.log(this.user);
    this.profileService.getProfile(this.user.id).subscribe({
      next: (response: AppResponse) => {
        this.profiles = response.data;

        if (response.data === null) {
          this.showEditForm = true;
        }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  edit() {
    this.showEditForm = true;
    this.ifirstname = this.profiles.firstName;
    this.ilastName = this.profiles.lastName;
    this.iemail = this.profiles.email;
    this.iphoneNumber = this.profiles.phoneNumber;
    this.igender = this.profiles.gender;
    this.iskills = this.profiles.skills;
    this.iexperience = this.profiles.experience;
  }

  onSubmit() {
    if (this.user.id !== null && this.user.id !== undefined) {
      // let userprofileUpdate: Profile = {
      //   id: this.profiles.id,
      //   firstName: this.ifirstname,
      //   lastName: this.ilastName,
      //   Gender: this.igender,
      //   phoneNumber: this.iphoneNumber,
      //   email: this.iemail,
      //   skills: this.iskills,
      //   experience: this.iexperience,
      //   appUserId: this.user.id,
      // };
      const profileData: any = {
        Id: this.profiles.id,
        firstName: this.ifirstname,
        lastName: this.ilastName,
        gender: this.igender,
        phoneNumber: this.iphoneNumber,
        email: this.iemail,
        skills: this.iskills,
        experience: this.iexperience,
        appUserId: this.user.id,
        
      };
      this.profileService.editProfile(profileData).subscribe({
        next: (response: any) => {
          this.profiles = response.data;
          
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });

      this.showEditForm = false;
    } else {
      console.error('User ID is null or undefined');
    }
  }
}
