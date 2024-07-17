import { inject, Injectable, OnInit } from '@angular/core';
import { TelegramService } from '../../../shared/services/telegram.service';
import { BehaviorSubject, tap, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  telegram = inject(TelegramService)

  isAuth = new BehaviorSubject(false)

  constructor(private http: HttpClient) {}

  

  getRequest() {
    return this.http.get(`auth/${this.telegram.tg?.initDataUnsafe?.user?.username}`, 
      {observe: "response"}).pipe(tap(value => this.isAuth.next(!!value)))
    }
     
}

// return this.http.get(`auth/${this.telegram.tg?.initDataUnsafe?.user?.username}`