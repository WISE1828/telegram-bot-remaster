import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Tools {
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  http  = inject(HttpClient)

  constructor() { 

  }

  getTools(): Observable<Tools[]> {
    return this.http.get<Tools[]>('finances/tools')
 }

 patchTools(id: number, name: string){
   return this.http.patch('finances/tools', {id, name})
 }

 addTools(name: string){
   return this.http.post(`finances/tools`,{name})
 }

 deleteServices(id: number){
   return this.http.delete(`finances/tools/${id}`)
 }
}
