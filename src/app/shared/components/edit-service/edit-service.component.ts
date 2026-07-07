import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ServiceService } from '../../services/service.service';
import { Service } from '../../../../../backend/models/service.model';

@Component({
  selector: 'app-edit-service',
  imports: [
    FormsModule
  ],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent implements OnInit {
  serviceId!: string;

  service: Service = {
    clientId: '',
    vehicleId: '',
    serviceTitle: '',
    serviceDate: '',
    status: 'Scheduled'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id') || '';

    if (this.serviceId) {
      this.serviceService.getServiceById(this.serviceId).subscribe({
        next: (data) => {
          this.service = data;
        },
        error: (error) => {
          console.error('Error fetching service:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.serviceId) {
      return;
    }

    this.serviceService.updateService(this.serviceId, this.service).subscribe({
      next: () => {
        this.router.navigate(['/services/view-service', this.serviceId]);
      },
      error: (error) => {
        console.error('Error updating service:', error);
      }
    });
  }

  cancel(): void {
    if (this.service.vehicleId) {
      this.router.navigate(['/vehicles/view-vehicle', this.service.vehicleId]);
    } else {
      this.router.navigate(['/clients']);
    }
  }
}
