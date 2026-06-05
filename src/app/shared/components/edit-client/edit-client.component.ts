import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { ClientService } from '../../services/client.service';
import {NgForOf} from '@angular/common';
import {AccountNote} from '../../../../../backend/models/client.model';

@Component({
  selector: 'app-edit-client',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent implements OnInit {
  editClientForm!: FormGroup;
  clientId!: string;
  client: any = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id') || '';

    this.editClientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      business: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
      createdDate: ['', Validators.required],
      lastServiced: ['', Validators.required],
      nextServiceDate: [''],
      status: ['New'],
      accountNotes: this.fb.array([]),
      vehicles: this.fb.array([]),

    });

    if (this.clientId) {
      this.clientService.getClientById(this.clientId).subscribe(client => {
        if (client) {
          this.editClientForm.patchValue(client);
          this.client = client;

          client.accountNotes?.forEach((note: AccountNote) => this.addAccountNote({ text: note.text, date: note.date ?? '' }));
          client.vehicles?.forEach((vehicle: any) => this.addVehicle(vehicle));
        }
      });
    }
  }

  get accountNotes() {
    return this.editClientForm.get('accountNotes') as FormArray;
  }

  addAccountNote(note: { text: string; date: string } = { text: '', date: '' }) {
    const notes = this.accountNotes;
    notes.push(this.fb.group({
      text: [note.text],
      date: [note.date]
    }))
  }

  removeAccountNote(index: number): void {
    this.accountNotes.removeAt(index);
  }

  get vehicles() {
    return this.editClientForm.get('vehicles') as FormArray;
  }

  addVehicle(vehicle: any = {
    year: '',
    make: '',
    model: '',
    vin: '',
    licensePlate: '',
    mileage: '',
    notes: ''
  }) {
    this.vehicles.push(this.fb.group({
      year: [vehicle.year],
      make: [vehicle.make],
      model: [vehicle.model],
      vin: [vehicle.vin],
      licensePlate: [vehicle.licensePlate],
      mileage: [vehicle.mileage],
      notes: [vehicle.notes],
    }));
  }

  removeVehicle(index: number): void {
    this.vehicles.removeAt(index);
  }

  onSubmit(): void {
    if (this.editClientForm.valid) {
      const updatedClient = { id: this.clientId, ...this.editClientForm.value };
      this.clientService.updateClient(this.clientId, updatedClient).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }
}
