import { DOCUMENT, NgFor } from '@angular/common';
import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { IBtnRoute } from '../../../main-page/interfaces/btn-route.interface';
import { btnSettings } from '../../../main-page/data/btn-settings';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-burger-menu',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss'
})
export class BurgerMenuComponent implements OnDestroy {
  @Output()
  modalClose = new EventEmitter()
  
  document = inject(DOCUMENT)

  settings: IBtnRoute[] = btnSettings

  constructor(){
    this.document.documentElement.style.overflow = "hidden"
  }

  close(){
    this.modalClose.emit()
  }

  ngOnDestroy(): void {
    this.document.documentElement.style.overflow = "auto"
  }
}
