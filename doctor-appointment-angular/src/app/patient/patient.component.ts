import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientOwnComponent implements OnInit {

  router: string;
  profile:any;
  constructor(private _router: Router) { 
    this.router = _router.url; 

  }

  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('profile'))
  }
  logout(){
    this._router.navigateByUrl('/patient/login');
    localStorage.removeItem('profile')
    setTimeout(() => {
      location.reload()
    }, 1000);
  }
}
