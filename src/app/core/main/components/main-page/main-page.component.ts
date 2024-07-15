import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminCardComponent } from "../admin-card/admin-card.component";
import { IBtnRoute } from './interfaces/btn-route.interface';
import { btnSettings } from './data/btn-settings';
import { RouterLink } from '@angular/router';
import { AdminService } from '../admin-card/services/admin.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [AdminCardComponent,RouterLink],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {
  admin = inject(AdminService)

  constructor(){
    this.admin.clearAction()
  }

  settings: IBtnRoute[] = btnSettings


}
