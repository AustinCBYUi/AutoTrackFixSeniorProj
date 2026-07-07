import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';

import { ServiceService } from '../../services/service.service';
import { Service } from '../../../../../backend/models/service.model';

@Component({
  selector: 'app-view-service',
  imports: [
    RouterLink,
    DatePipe,
    NgIf
  ],
  templateUrl: './view-service.component.html',
  styleUrl: './view-service.component.css'
})
export class ViewServiceComponent implements OnInit {
  service: Service | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    const serviceId = this.route.snapshot.paramMap.get('id');

    if (serviceId) {
      this.serviceService.getServiceById(serviceId).subscribe({
        next: (data) => {
          this.service = data;
        },
        error: (error) => {
          console.error('Error fetching service:', error);
        }
      });
    }
  }

  goBackToVehicle(): void {
    if (this.service?.vehicleId) {
      this.router.navigate(['/vehicles/view-vehicle', this.service.vehicleId]);
    }
  }
}
