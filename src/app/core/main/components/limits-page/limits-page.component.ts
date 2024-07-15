import { Component, inject } from '@angular/core';
import { Limits, LimitsService } from '../../services/limits.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-limits-page',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './limits-page.component.html',
  styleUrl: './limits-page.component.scss'
})
export class LimitsPageComponent {
  limits$!: Observable<Limits[]>

  limitService = inject(LimitsService)

  constructor(){
    this.limits$ = this.limitService.getLimits()
  }

  changeLimit(id: number, user_id: number, telegram_id: string, value: number){
    this.limitService.postLimits(id, user_id, telegram_id, value).subscribe({error: (res)=>{
      if(res.status === 200){
        this.limits$ = this.limitService.getLimits()
      } 
    }})
  }

}
