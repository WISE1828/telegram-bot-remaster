import { DepartmentsService } from '@/core/main/services/departments.service';
import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-modal-add-department',
  standalone: true,
  imports: [],
  templateUrl: './modal-add-department.component.html',
  styleUrl: './modal-add-department.component.scss'
})
export class ModalAddDepartmentComponent implements OnDestroy {
  @Output()
  modalClose = new EventEmitter<boolean>() 

  departmentsService = inject(DepartmentsService)
  document = inject(DOCUMENT)

  constructor(){
    this.document.documentElement.style.overflow = "hidden"
  }

  createDepartment(value: string){
    this.departmentsService.addDepartment(value).subscribe({error: (res)=>{
        if(res.status === 201)
          this.modalClose.emit(true)
      }})
  }

  ngOnDestroy(): void {
    this.document.documentElement.style.overflow = "auto"
  }

}
