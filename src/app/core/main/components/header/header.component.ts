import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { HeaderTitles } from './data/header-titles';
import {Location, NgIf} from '@angular/common';
import { BurgerMenuComponent } from "./components/burger-menu/burger-menu.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BurgerMenuComponent, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input({required: true}) isMainPage!: boolean
  title = signal("")
  router = inject(Router)
  destroy = inject(DestroyRef)
  location = inject(Location)
  isBurgerMenuOpen = signal(false)

  constructor(){
    this.router.events.pipe(takeUntilDestroyed(this.destroy)).subscribe((value) => {
      if(value instanceof NavigationStart){
        this.title.set(HeaderTitles[value.url as keyof typeof HeaderTitles])
      }
    })
    
  }

  burgerMenuOpen(){
    this.isBurgerMenuOpen.set(true)
  }

  burgerMenuClose(){
    this.isBurgerMenuOpen.set(false)
  }
}
