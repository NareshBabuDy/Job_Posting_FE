import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  constructor(private storageService: StorageService,
    private authSerice: AuthService){}
  username: String = ''
  ngOnInit(): void {
    this.username = this.storageService.getLoggedInUser().name;
    
  }
  logout(): void {
    this.authSerice.logout();
  }

}
