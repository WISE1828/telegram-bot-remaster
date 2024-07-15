import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NgClass, NgOptimizedImage } from "@angular/common"
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { AdminCardComponent } from "../admin-card/admin-card.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NgOptimizedImage, HeaderComponent, RouterOutlet, AdminCardComponent, NgClass],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  activeRoute = inject(Router)
  isMainPage = signal(true)
  isUsersPage = signal(false)  
  destroy = inject(DestroyRef)

  constructor(){
    
  }
  ngOnInit(): void {
    this.activeRoute.events.pipe(takeUntilDestroyed(this.destroy)).subscribe((value) => {
      if(value instanceof NavigationStart){
        this.isMainPage.set(value.url === "/main")
        this.isUsersPage.set(value.url === "/main/users")
      }
    })
  }
  
}
