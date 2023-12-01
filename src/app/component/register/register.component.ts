import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { CompanyRegister } from 'src/app/model/company-register';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  error: string = '';
  userForm: boolean = false;
  confirmPassword: string = '';
  file = '';
  gender: boolean = false;
  profile = '';

  constructor(private userService: AuthService, private router: Router) {}
  registerloti: boolean = false;
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };
  options1: AnimationOptions = {
    path: '/assets/register.json',
  };

  userType: boolean = true;

  userRegister(userRegiser: NgForm) {
    const formData = new FormData();
    console.log(userRegiser.value);
    formData.append('username', userRegiser.value.username);
    formData.append('password', userRegiser.value.password);
    formData.append('firstName', userRegiser.value.firstName);
    formData.append('lastName', userRegiser.value.lastName);
    formData.append('gender', userRegiser.value.gender);
    formData.append('phoneNumber', userRegiser.value.phoneNumber);
    formData.append('email', userRegiser.value.email);
    formData.append('skills', userRegiser.value.skills);
    formData.append('experience', userRegiser.value.experience);
    formData.append('resume', this.profile);
    formData.append('photo', this.file);

    console.log(formData);

    this.userService.regiser(formData).subscribe({
      next: (response: any) => {
        this.registerloti = true;
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  companyRegiseter(register: NgForm) {
    const formData = new FormData();

    formData.append('username', register.value.username);
    formData.append('password', register.value.password);
    formData.append('companyName', register.value.companyName);
    formData.append('companyUrl', register.value.companyUrl);
    formData.append('companyType', register.value.companyType);
    formData.append('aboutCompany', register.value.aboutCompany);
    formData.append('companyPhoto', this.file);

    console.log(formData);

    this.userService.companyRegiser(formData).subscribe({
      next: (response: any) => {
        this.registerloti = true;
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
    }
  }
  onProfileChange(eventt: any) {
    const fileInput = eventt.target;
    if (fileInput && fileInput.files.length > 0) {
      this.profile = fileInput.files[0];
    }
  }
}
