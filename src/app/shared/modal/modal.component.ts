import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnDestroy {
  @Input({required: true}) title!: string
  @Input({required: true}) btnTitle!: string
  @Input({required: true}) action!:() => Observable<any>

  document = inject(DOCUMENT)

  @Output()
  modalClose = new EventEmitter<boolean>() 

  constructor(){
    this.document.documentElement.style.overflow = "hidden"
  }

  accept(){
    this.action().subscribe({error: (res)=>{
      if(res.status === 200)
        this.modalClose.emit(true)
    }})
  }

  ngOnDestroy(): void {
    this.document.documentElement.style.overflow = "auto"
  }
}
