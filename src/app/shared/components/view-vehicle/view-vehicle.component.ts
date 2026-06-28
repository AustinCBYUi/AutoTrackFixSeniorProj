import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../../../../backend/models/vehicle.model';

import { ServiceService } from '../../services/service.service';
import { Service } from '../../../../../backend/models/service.model';

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
  services: Service[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private serviceService: ServiceService,
  ) {}

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');

    if (vehicleId) {
      this.vehicleService.getVehicleById(vehicleId).subscribe({
        next: (data) => {
          this.vehicle = data;
          if (this.vehicle.id) {
            this.serviceService.getServicesByVehicleId(this.vehicle.id).subscribe({
              next: (services) => {
                this.services = services;
              },
              error: (error) => {
                console.error('Error fetching services:', error);
              }
            });
          }
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
