import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { VehicleService } from '../../services/vehicle.service';
import { Router } from '@angular/router';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { Vehicle } from '../../../../../backend/models/vehicle.model';

@Component({
  selector: 'app-view-client',
  imports: [
    RouterLink,
    DatePipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './view-client.component.html',
  styleUrl: './view-client.component.css'
})
export class ViewClientComponent implements OnInit {
  client: any = {};
  vehicles: Vehicle[] = [];

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private vehicleService: VehicleService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const clientId = this.route.snapshot.paramMap.get('id');

    if (clientId) {
      this.clientService.getClientById(clientId).subscribe({
        next: (data) => {
          this.client = data;
        },
        error: (error) => {
          console.error("Error fetching client details:", error);
        }
      })

      this.vehicleService.getVehiclesByClientId(clientId).subscribe({
        next: (data) => {
          this.vehicles = data;
        },
        error: (error) => {
          console.error("Error fetching vehicles:", error);
        }
      })
    }
  }

  viewVehicle(id: string | undefined): void {
    if (!id) {
      return;
    }

    this.router.navigate(['/vehicles/view-vehicle', id]);
  }

  editVehicle(id: string | undefined) {
    if (!id) {
      return;
    }

    this.router.navigate(['vehicles/edit-vehicle', id]);
  }

  deleteVehicle(id: string | undefined): void {
    if (!id) {
      return;
    }

    if (!confirm('Delete this vehicle?')) {
      return;
    }

    this.vehicleService.deleteVehicle(id).subscribe({
      next: () => {
        this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
      },
      error: (error) => {
        console.error('Error deleting vehicle:', error);
      }
    });
  }
  editClient(client: any) {
    if (client && client.id) {
      this.router.navigate(['edit-client', client.id]);
    } else {
      this.router.navigate(['login']);
    }
  }
}
