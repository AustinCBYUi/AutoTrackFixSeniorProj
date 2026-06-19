import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';

import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../../../../backend/models/vehicle.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-add-vehicle',
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
  ],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent implements OnInit {
  clientId!: string;
  noteText = '';

  newVehicle: Vehicle = {
    clientId: '',
    make: '',
    model: '',
    createdDate: new Date().toISOString().split('T')[0]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('clientId') || '';
    this.newVehicle.clientId = this.clientId;
  }

  addVehicle(): void {
    this.vehicleService.addVehicle(this.newVehicle).subscribe({
      next: () => {
        this.router.navigate(['/clients', this.clientId]);
      },
      error: (error) => {
        console.error('Error adding Vehicle:', error);
      }
    });
  }

  addVehicleNote(text: string): void {
    if (!text.trim()) {
      return;
    }

    if (!this.newVehicle.vehicleNotes) {
      this.newVehicle.vehicleNotes = [];
    }

    this.newVehicle.vehicleNotes.push({
      text: text,
      date: new Date().toISOString().split('T')[0]
    });

    this.noteText = '';
  }

  // To press the cancel button???
  cancel(): void {
    if (this.clientId) {
      this.router.navigate(['/clients', this.clientId]);
    } else {
      this.router.navigate(['/clients']);
    }
  }
}
