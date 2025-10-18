import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
  standalone: true
})
export class TripCardComponent implements OnInit {
  ngOnInit(): void {
      
  }

  @Input('trip') trip: any;
  
  constructor(
    private router: Router, 
    private authenticationService: Authentication) {}

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public viewAnalytics() {
    
  }

  public isLoggedIn() : boolean {
    return this.authenticationService.isLoggedIn();
  }
}
