import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ServiceService } from '../../services/service.service';
import { Service } from '../../../../../backend/models/service.model';

@Component({
  selector: 'app-add-service',
  imports: [
    FormsModule
  ],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent implements OnInit {
  clientId!: string;
  vehicleId!: string;

  newService: Service = {
    clientId: '',
    vehicleId: '',
    serviceTitle: '',
    serviceDate: new Date().toISOString().split('T')[0],
    status: 'Scheduled'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('clientId') || '';
    this.vehicleId = this.route.snapshot.paramMap.get('vehicleId') || '';

    this.newService.clientId = this.clientId;
    this.newService.vehicleId = this.vehicleId;

    console.log('Client ID:', this.clientId);
    console.log('Vehicle ID:', this.vehicleId);
  }

  addService(): void {
    console.log('Service being submitted:', this.newService);

    this.serviceService.addService(this.newService).subscribe({
      next: () => {
        this.router.navigate(['/vehicles/view-vehicle', this.vehicleId]);
      },
      error: (error) => {
        console.error('Error adding service:', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/vehicles/view-vehicle', this.vehicleId]);
  }
}
