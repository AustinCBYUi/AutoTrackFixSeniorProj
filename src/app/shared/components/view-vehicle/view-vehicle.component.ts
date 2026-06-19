import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../../../../backend/models/vehicle.model';

@Component({
  selector: 'app-view-vehicle',
  imports: [
    RouterLink,
    DatePipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './view-vehicle.component.html',
  styleUrl: './view-vehicle.component.css'
})
export class ViewVehicleComponent implements OnInit {
  vehicle: Vehicle | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');

    if (vehicleId) {
      this.vehicleService.getVehicleById(vehicleId).subscribe({
        next: (data) => {
          this.vehicle = data;
        },
        error: (error) => {
          console.error('Error fetching vehicle:', error);
        }
      });
    }
  }

  goBackToClient(): void {
    if (this.vehicle?.clientId) {
      this.router.navigate(['/clients', this.vehicle.clientId]);
    }
  }
}
