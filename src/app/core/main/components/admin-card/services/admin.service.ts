import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class AdminService {
  action$: BehaviorSubject<(() => void) | null> = new BehaviorSubject<(() => void) | null>(null)

  setAction(action: () => void){
    this.action$.next(action)
  }

  clearAction(){
    this.action$.next(null)
  }
}
