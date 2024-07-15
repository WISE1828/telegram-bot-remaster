import { AsyncPipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, DepartmentsService } from '../../services/departments.service';
import { ModalComponent } from "../../../../shared/modal/modal.component";
import { AdminService } from '../admin-card/services/admin.service';
import { ModalAddDepartmentComponent } from "../../../../shared/modal-add-department/modal-add-department.component";

@Component({
  selector: 'app-departments-page',
  standalone: true,
  imports: [NgFor, NgOptimizedImage, AsyncPipe, ModalComponent, NgIf, ModalAddDepartmentComponent],
  templateUrl: './departments-page.component.html',
  styleUrl: './departments-page.component.scss'
})
export class DepartmentsPageComponent {
  department$!:Observable<Department[]>
  departmentsService = inject(DepartmentsService)

  isDepartmentModalOpen = signal(false)
  isAddDepartmentModalOpen = signal(false)
  isChangeDepartmentModalOpen = signal(false)

  departmentToDelete = signal<number | null>(null)
  departmentToDeleteIndex = signal<number | null>(null)
  departmentToChange = signal<string | null>(null)

  admin = inject(AdminService)

  constructor(){
    this.department$ = this.departmentsService.getDepartment()
    this.admin.setAction(() => this.addDepartmentModalOpen())
  }

  departmentDelete(value: number){
    return () => this.departmentsService.deleteDepartment(value)
  }

  departmentChange(id: number, value: HTMLInputElement){
    return () => this.departmentsService.patchDepartment(id, value.value)
  }


  changeName(id: number, name: string){
    this.departmentsService.patchDepartment(id, name).subscribe({error: (res)=>{
      if(res.status === 200)
        this.department$ = this.departmentsService.getDepartment()
    }})
  }
 
  departmentModalOpen(value: number, index: number){
    this.departmentToDelete.set(value)
    this.isDepartmentModalOpen.set(true)
    this.departmentToDeleteIndex.set(index)
  }

  onDepartmentModalClose(value: boolean){
    if (value) {
      this.department$ = this.departmentsService.getDepartment()
    }
    this.isDepartmentModalOpen = signal(false)
    this.departmentToDelete.set(null)
    this.departmentToDeleteIndex.set(null)
  }

  addDepartmentModalOpen(){
    this.isAddDepartmentModalOpen.set(true)
  }

  addDepartmentModalClose(value: boolean){
    if (value) {
      this.department$ = this.departmentsService.getDepartment()
    }
    this.isAddDepartmentModalOpen.set(false)
  }

  changeDepartmentModalOpen(value: number, index: number){
    this.departmentToDelete.set(value)
    this.isChangeDepartmentModalOpen.set(true)
    this.departmentToDeleteIndex.set(index)
  }

  changeDepartmentModalClose(value: boolean){
    if (value) {
      this.department$ = this.departmentsService.getDepartment()
    }
    this.isChangeDepartmentModalOpen.set(false)
  }

}


