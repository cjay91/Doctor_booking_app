import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  router: string;
  user_info: any;
  constructor(private _router: Router) { 
    this.router = _router.url; 
    this.user_info = JSON.parse(localStorage.getItem("profile"));
  }

  ngOnInit(): void {
  }
  logout(){
    this._router.navigateByUrl('/admin/login');
    localStorage.removeItem('profile')
    setTimeout(() => {
      location.reload()
    }, 1000);
  }
}
