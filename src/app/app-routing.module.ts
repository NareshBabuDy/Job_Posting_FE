import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/user/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { JobsComponent } from './component/admin/jobs/jobs.component';
import { CompaniesComponent } from './component/admin/companies/companies.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { UserProfileComponent } from './component/user/user-profile/user-profile.component';
import { UserJobsComponent } from './component/user/user-jobs/user-jobs.component';
import { RecruiterHomeComponent } from './component/recruiter/recruiter-home/recruiter-home.component';
import { RecruiterJobsComponent } from './component/recruiter/recruiter-jobs/recruiter-jobs.component';
import { RecruiterDetailsComponent } from './component/recruiter/recruiter-details/recruiter-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  //adminPages
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  { path: 'admin/jobs', component: JobsComponent },
  { path: 'admin/companys', component: CompaniesComponent},
  { path: 'admin/categories', component: CategoryComponent},
  
  //userPages
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'user/profile', component: UserProfileComponent},
  { path: 'user/jobs', component: UserJobsComponent},
  
  //recruiterPages
  { path: 'recruiter', component: RecruiterHomeComponent},
  { path: 'recruiter/jobs', component: RecruiterJobsComponent},
  { path: 'recruiter/company', component: RecruiterDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,],
  
})
export class AppRoutingModule {}

