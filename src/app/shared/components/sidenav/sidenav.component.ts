import {Component, ViewEncapsulation} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatIconButton,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {

}
