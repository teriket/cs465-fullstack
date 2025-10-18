import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Authentication } from '../services/authentication';
import { PieChart } from '../pie-chart/pie-chart';

@Component({
  selector: 'app-analytics-page',
  imports: [CommonModule, PieChart],
  templateUrl: './analytics-page.component.html',
  styleUrl: './analytics-page.component.css'
})
export class AnalyticsPageComponent implements OnInit{
  constructor(
    private authenticationService: Authentication
  ) {}

  ngOnInit(): void {
  }

  public isLoggedIn() : boolean {
    return this.authenticationService.isLoggedIn();
}

}
