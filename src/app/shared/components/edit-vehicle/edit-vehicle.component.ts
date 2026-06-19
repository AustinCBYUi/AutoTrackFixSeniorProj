import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../../../../backend/models/vehicle.model';

@Component({
  selector: 'app-edit-vehicle',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.css'
})
export class EditVehicleComponent implements OnInit {
  vehicleId!: string;
  noteText = '';

  vehicle: Vehicle = {
    clientId: '',
    make: '',
    model: '',
    createdDate: '',
    vehicleNotes: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('id') || '';

    if (this.vehicleId) {
      this.vehicleService.getVehicleById(this.vehicleId).subscribe({
        next: (data) => {
          this.vehicle = data;

          if (!this.vehicle.vehicleNotes) {
            this.vehicle.vehicleNotes = [];
          }
        },
        error: (error) => {
          console.error('Error fetching vehicle:', error);
        }
      });
    }
  }

  addVehicleNote(text: string): void {
    if (!text.trim()) {
      return;
    }

    if (!this.vehicle.vehicleNotes) {
      this.vehicle.vehicleNotes = [];
    }

    this.vehicle.vehicleNotes.push({
      text: text,
      date: new Date().toISOString().split('T')[0]
    });

    this.noteText = '';
  }

  removeVehicleNote(index: number): void {
    if (!this.vehicle.vehicleNotes) {
      return;
    }

    this.vehicle.vehicleNotes.splice(index, 1);
  }

  onSubmit(): void {
    if (!this.vehicleId) {
      return;
    }

    this.vehicleService.updateVehicle(this.vehicleId, this.vehicle).subscribe({
      next: () => {
        this.router.navigate(['/vehicles/view-vehicle', this.vehicleId]);
      },
      error: (error) => {
        console.error('Error updating vehicle:', error);
      }
    });
  }

  cancel(): void {
    if (this.vehicle.clientId) {
      this.router.navigate(['/clients', this.vehicle.clientId]);
    } else {
      this.router.navigate(['/clients']);
    }
  }
}
