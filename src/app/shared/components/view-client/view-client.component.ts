import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router
  ) {}

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
    }
  }

  editClient(client: any) {
    if (client && client.id) {
      this.router.navigate(['edit-client', client.id]);
    } else {
      this.router.navigate(['login']);
    }
  }
}
