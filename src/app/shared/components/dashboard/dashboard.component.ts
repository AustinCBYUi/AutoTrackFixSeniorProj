import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  clientCount: number = 0;

  constructor() { }

  ngOnInit() {
  }


}
