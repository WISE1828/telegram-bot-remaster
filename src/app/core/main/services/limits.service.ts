import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Limits {
  id: number,
  user_id: number,
  telegram_id: string,
  value: number
}

@Injectable({
  providedIn: 'root'
})
export class LimitsService {

  http  = inject(HttpClient)

  constructor() { 

  }

  public getLimits(): Observable<Limits[]> {
    return this.http.get<Limits[]>('/finances/limits')
 }

  postLimits(id: number, user_id: number, telegram_id: string, value: number){
    return this.http.post("/finances/limits", {id, user_id, telegram_id, value})
  } 
}
