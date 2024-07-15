import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Department{
  id: number,
  name: string, 
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor() { 

  }

  http  = inject(HttpClient)

  patchDepartment(id: number, name: string) {
    return this.http.patch('divisions', {id, name})
  }

  addDepartment(name: string){
    return this.http.post(`divisions/`,{name})
  }

  getDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>('divisions')
  }

  deleteDepartment(id: number){
    return this.http.delete(`divisions/${id}`)
  }
}
