import { Component, OnInit } from '@angular/core';
import { trips } from '../data/trips';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  standalone: true,
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  trips! : Trip[];
  message : string = "";
  
  constructor(
    private tripDataService : TripDataService,
    private router: Router,
    private authentication : Authentication
  ) {}

  ngOnInit(): void {
      this.getTrips();
  }

  public addTrip() : void {
    this.router.navigate(['add-trip']);
  }

  private getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: any) => {
        this.trips = value;
        if(value.length > 0){
          this.message = 'there are ' + value.length + ' trips available.';
        }
        else{
          this.message = 'There were no trips retrieved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log("Error: " + error);
      }

    });
  }

  public isLoggedIn() : boolean {
    return this.authentication.isLoggedIn();
  }

  public viewAnalytics() {
    this.router.navigate(['analytics-page']);
  }
}
