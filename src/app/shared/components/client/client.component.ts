import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../../backend/models/client.model';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  imports: [
    NgForOf,
    FormsModule,
    RouterLink
  ],
  standalone: true,
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  searchTerm: string = '';
  filteredClients: Client[] = [];
  clients: Client[] = []; // Holds list of clients
  currentPage: number = 1;
  clientsPerPage: number = 10;

  constructor(
    private router: Router,
    ) { }


  ngOnInit() {
  }


  applyFilter(): void {
    this.filteredClients = this.clients.filter(client =>
    client.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    client.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    client.phoneNumber?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.changePage(1);
  }


  get paginatedClients(): Client[] {
    const start = (this.currentPage - 1) * this.clientsPerPage;
    const end = start + this.clientsPerPage;
    return this.filteredClients.slice(start, end);
  }


  get totalPages(): number {
    return Math.ceil(this.filteredClients.length / this.clientsPerPage);
  }


  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;

    }
  }


  onSearchChange(): void {
    this.applyFilter();
  }


  //TODO - Edit Client
  editClient(client: any) {
    if (client && client.id) {
      this.router.navigate(['clients/edit-client', client.id]);
    } else {
      this.router.navigate(['login']);
    }
  }
}
