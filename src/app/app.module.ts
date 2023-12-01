import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/user/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { JobsComponent } from './component/admin/jobs/jobs.component';
import { CompaniesComponent } from './component/admin/companies/companies.component';
import { ApplicationComponent } from './component/user/application/application.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { UserProfileComponent } from './component/user/user-profile/user-profile.component';
import { RecruiterHomeComponent } from './component/recruiter/recruiter-home/recruiter-home.component';
import { RecruiterJobsComponent } from './component/recruiter/recruiter-jobs/recruiter-jobs.component';
import { RecruiterDetailsComponent } from './component/recruiter/recruiter-details/recruiter-details.component';
import { RegisterComponent } from './component/register/register.component';
import { NavComponent } from './component/nav/nav.component';
import { UserJobsComponent } from './component/user/user-jobs/user-jobs.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    JobsComponent,
    CompaniesComponent,
    ApplicationComponent,
    CategoryComponent,
    UserJobsComponent,
    UserProfileComponent,
    RecruiterHomeComponent,
    RecruiterJobsComponent,
    RecruiterDetailsComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
