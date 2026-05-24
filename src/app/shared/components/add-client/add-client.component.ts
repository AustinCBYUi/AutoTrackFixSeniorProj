import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { ClientService } from '../../services/client.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-add-client',
  imports: [
    FormsModule,
    RouterLink,
    NgForOf,
    NgIf,
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent {
  newClient = {
    firstName: '',
    lastName: '',
    email: '',
    business: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    createdDate: this.formatDate(new Date()),
    lastServiced: '',
    nextServiceDate: '',
    status: 'New',
    accountNotes: [] as { text: string; date: string; }[],
    services: [],
  };

  noteText: string = '';

  constructor(private clientService: ClientService, private router: Router) {
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  addClient() {
    if (this.newClient.firstName && this.newClient.lastName) {
      this.clientService.addClient(this.newClient).subscribe({
        next: (response) => {
          console.log("Client added successfully:", response);
          this.router.navigate(['/clients']);
        },
        error: (error) => {
          console.error("Error adding client:", error);
        }
      });
    } else {
    }
  }

  addNote(noteText: string) {
    if (noteText.trim()) {
      this.newClient.accountNotes.push({
        text: noteText,
        date: this.formatDate(new Date())
      })
    }
  }

}
