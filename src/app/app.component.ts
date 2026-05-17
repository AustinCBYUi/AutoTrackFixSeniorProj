import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Components \\
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import {TopBarComponent} from './shared/components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SidenavComponent,
    TopBarComponent,
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Orkin Inspector CMS';
}
