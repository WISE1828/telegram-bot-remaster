import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IUser{
  id: number,
  user_id: number,
  first_name: string,
  last_name: string,
  image_url: string,
  telegram_id: string
}


@Injectable({
  providedIn: 'root'
})


export class UsersService {
  http  = inject(HttpClient)


  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('auth/')
  }
  
  deleteUser(user_id: number){
    return this.http.delete(`auth/${user_id}`)
  }

  addUser(telegram_id: string){
    return this.http.post(`auth/${telegram_id}`,{})
  }
}
