import { Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Tools, ToolsService } from '../../services/tools.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AdminService } from '../admin-card/services/admin.service';
import { ModalComponent } from "../../../../shared/modal/modal.component"
import { ModalAddToolComponent } from "../../../../shared/modal-add-tool/modal-add-tool.component";

@Component({
  selector: 'app-tools-page',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, ModalComponent, ModalAddToolComponent],
  templateUrl: './tools-page.component.html',
  styleUrl: './tools-page.component.scss'
})
export class ToolsPageComponent {
  tools$!:Observable<Tools[]>
  toolsService = inject(ToolsService)

  admin = inject(AdminService)

  isToolsAddModalOpen = signal(false)
  isToolsDeleteModalOpen = signal(false)
  isToolsChangeModalOpen = signal(false)

  toolsToEdit = signal<number | null>(null)
  toolsToEditIndex = signal<number | null>(null)
  

  constructor(){
    this.tools$ = this.toolsService.getTools()
    this.admin.setAction(() => this.addToolModalOpen())
  }

  toolsDelete(value: number){
    return () => this.toolsService.deleteServices(value)
  }

  toolsChange(id: number, value: HTMLInputElement){
    return () => this.toolsService.patchTools(id, value.value)
  }


  toolsModalOpen(value: number, index: number){
    this.toolsToEdit.set(value)
    this.isToolsDeleteModalOpen.set(true)
    this.toolsToEditIndex.set(index)
  }

  onToolsModalClose(value: boolean){
    if (value) {
      this.tools$ = this.toolsService.getTools()
    }
    this.isToolsDeleteModalOpen = signal(false)
    this.toolsToEdit.set(null)
    this.toolsToEditIndex.set(null)
  }


  changeToolName(id: number, name: string){
    this.toolsService.patchTools(id, name).subscribe({error: (res)=>{
      if(res.status === 200)
        this.tools$ = this.toolsService.getTools()
    }})
  }

  // updateTools(value: boolean){
  //   this.modalCheck = 0
  //   if(!value){
  //     return
  //   }
  //   this.tools$ = this.toolsService.getTools()
  // }

  servicerDelete(value: number){
    this.toolsService.deleteServices(value).subscribe({error: (res)=>{
      if(res.status === 200)
        this.tools$ = this.toolsService.getTools()
    }})
  }

  changeToolModalOpen(value: number, index: number){
    this.toolsToEdit.set(value)
    this.isToolsChangeModalOpen.set(true)
    this.toolsToEditIndex.set(index)
  }

  changeToolModalClose(value: boolean){
    if (value) {
      this.tools$ = this.toolsService.getTools()
    }
    this.isToolsChangeModalOpen.set(false)
  }

  addToolModalClose(value: boolean){
    if (value) {
      this.tools$ = this.toolsService.getTools()
    }
    this.isToolsAddModalOpen.set(false)
  }

  addToolModalOpen(){
    this.isToolsAddModalOpen.set(true)
  }

}
