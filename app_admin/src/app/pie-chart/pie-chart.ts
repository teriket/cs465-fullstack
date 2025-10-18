import { Component, Input, OnInit } from '@angular/core';
import {PlotlyModule} from 'angular-plotly.js';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-pie-chart',
  imports: [PlotlyModule],
  standalone: true,
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css'
})
export class PieChart implements OnInit{
trips! : Trip[];
graphValues : any = [];
graphLabels : any = [];

  constructor(
    private tripDataService : TripDataService
  ){}

  ngOnInit(): void {
      this.getTrips();
  }

  public graph = {
    data : [
      {
        values : this.graphValues,
        labels : this.graphLabels,
        type : 'pie'

      }
    ],
    layout : {title: 'Packages by views'}
  };

  private getTrips(){
    this.tripDataService.getTrips().subscribe({
      next: (value: any) => {
        this.trips = value;

        // separate trip data for pie chart
        for(let i = 0; i < this.trips.length; i++){
          if(this.trips[i].views != 0){
            this.graphValues.push(this.trips[i].views);
            this.graphLabels.push(this.trips[i].name);
          }
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }
}
