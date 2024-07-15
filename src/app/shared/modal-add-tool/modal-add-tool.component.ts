import { ToolsService } from '@/core/main/services/tools.service';
import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';

@Component({
  selector: 'app-modal-add-tool',
  standalone: true,
  imports: [],
  templateUrl: './modal-add-tool.component.html',
  styleUrl: './modal-add-tool.component.scss'
})
export class ModalAddToolComponent {
  @Output()
  modalClose = new EventEmitter<boolean>() 

  toolService = inject(ToolsService)
  document = inject(DOCUMENT)

  constructor(){
    this.document.documentElement.style.overflow = "hidden"
  }

  createDepartment(value: string){
    this.toolService.addTools(value).subscribe({error: (res)=>{
        if(res.status === 201)
          this.modalClose.emit(true)
      }})
  }

  ngOnDestroy(): void {
    this.document.documentElement.style.overflow = "auto"
  }
}
