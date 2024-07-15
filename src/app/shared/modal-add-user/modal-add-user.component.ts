import { UsersService } from '@/core/main/services/users.service';
import { Component, EventEmitter, inject, Output } from '@angular/core';

@Component({
  selector: 'app-modal-add-user',
  standalone: true,
  imports: [],
  templateUrl: './modal-add-user.component.html',
  styleUrl: './modal-add-user.component.scss'
})
export class ModalAddUserComponent {
  @Output()
  modalClose = new EventEmitter<boolean>() 
  
  usersService = inject(UsersService)
  

  createUser(value: string){
    this.usersService.addUser(value).subscribe({error: (res)=>{
        if(res.status === 201)
          this.modalClose.emit(true)
      }})
  }

}
