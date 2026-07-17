import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    NgForOf,
    FormsModule,
  ],
  templateUrl: './view-vehicle.component.html',
  styleUrl: './view-vehicle.component.css'
})
export class ViewVehicleComponent implements OnInit {
  vehicle: Vehicle | null = null;
  services: Service[] = [];
  serviceSearch = ''
  // for pages
  currentServicePage = 1;
  servicesPerPage = 5;

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

  get paginatedServices(): Service[] {
    const startIndex = (this.currentServicePage - 1) * this.servicesPerPage;
    const endIndex = startIndex + this.servicesPerPage;

    return this.filteredServices.slice(startIndex, endIndex);
  }

  get totalServicePages(): number {
    return Math.ceil(this.filteredServices.length / this.servicesPerPage);
  }

  previousServicePage(): void {
    if (this.currentServicePage > 1) {
      this.currentServicePage--;
    }
  }

  nextServicePage(): void {
    if (this.currentServicePage < this.totalServicePages) {
      this.currentServicePage++;
    }
  }

  get filteredServices(): Service[] {
    const search = this.serviceSearch.trim().toLowerCase();

    if (!search) {
      return this.services;
    }

    return this.services.filter(service => {
      return (
        service.serviceTitle?.toLowerCase().includes(search) ||
        service.description?.toLowerCase().includes(search) ||
        service.status?.toLowerCase().includes(search) ||
        service.serviceDate?.toLowerCase().includes(search)
      );
    });
  }

  viewService(id: string | undefined): void {
    if (!id) {
      return;
    }

    this.router.navigate(['/services/view-service', id]);
  }

  editService(id: string | undefined): void {
    if (!id) {
      return;
    }

    this.router.navigate(['/services/edit-service', id]);
  }

  deleteService(id: string | undefined): void {
    if (!id) {
      return;
    }

    if (!confirm('Delete this service?')) {
      return;
    }

    this.serviceService.deleteService(id).subscribe({
      next: () => {
        this.services = this.services.filter(service => service.id !== id);
      },
      error: (error) => {
        console.error('Error deleting service:', error);
      }
    });
  }

  goBackToClient(): void {
    if (this.vehicle?.clientId) {
      this.router.navigate(['/clients', this.vehicle.clientId]);
    }
  }
}
