import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { TelegramService } from '@/shared/services/telegram.service';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { AdminService } from './services/admin.service';
import { NavigationStart, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-card',
  standalone: true,
  imports: [NgOptimizedImage, NgIf, NgClass],
  templateUrl: './admin-card.component.html',
  styleUrl: './admin-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminCardComponent {
  telegram = inject(TelegramService)
  admin = inject(AdminService)
  action = signal<(() => void) | null>(null)
  isUsersPage = signal(false)
  activeRoute = inject(Router)
  destroy = inject(DestroyRef)

  telegram_id = " "
  telegram_first_name = " "
  telegram_last_name = " "
  telegram_photo_url = " "

  constructor(){
    this.admin.action$.subscribe((value) => {this.action.set(value)})

    this.activeRoute.events.pipe(takeUntilDestroyed(this.destroy)).subscribe((value) => {
      if(value instanceof NavigationStart){
        this.isUsersPage.set(value.url === "/main/users")
      }
    })

    this.telegram_id = this.telegram.tg?.initDataUnsafe?.user?.username
    this.telegram_first_name = this.telegram.tg?.initDataUnsafe?.user?.first_name
    this.telegram_last_name = this.telegram.tg?.initDataUnsafe?.user?.last_name
    this.telegram_photo_url = this.telegram.tg?.initDataUnsafe?.user?.photo_url
  }
}
