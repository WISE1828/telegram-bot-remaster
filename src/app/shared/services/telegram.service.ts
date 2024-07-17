import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  
  window;
  tg: any;


  constructor(@Inject(DOCUMENT) private _document: any) { 
    this.window = this._document.defaultView; 
    this.tg = this.window?.Telegram?.WebApp
  }
}
