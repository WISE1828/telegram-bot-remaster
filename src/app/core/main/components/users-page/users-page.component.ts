import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, UsersService } from '../../services/users.service';
import { AsyncPipe, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { ModalComponent } from "@/shared/modal/modal.component";
import { AdminService } from '../admin-card/services/admin.service';
import { ModalAddUserComponent } from "../../../../shared/modal-add-user/modal-add-user.component";

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgOptimizedImage, ModalComponent, NgIf, ModalAddUserComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent {
  usersService = inject(UsersService)
  isUsersModalOpen = signal(false)
  isAddUserModalOpen = signal(false)
  admin = inject(AdminService)

  users$!:Observable<IUser[]>

  userToDelete = signal<number | null>(null)
  userToDeleteIndex = signal<number | null>(null)

  constructor(){
    this.users$ = this.usersService.getUsers()
    this.admin.setAction(() => this.addUserModalOpen())
  }

  userDelete(value: number){
    return () => this.usersService.deleteUser(value)
  }

  userModalOpen(value: number, index: number){
    this.userToDelete.set(value)
    this.isUsersModalOpen.set(true)
    this.userToDeleteIndex.set(index)
  }

  addUserModalOpen(){
    this.isAddUserModalOpen.set(true)
  }

  addUserModalClose(value: boolean){
    if (value) {
      this.users$ = this.usersService.getUsers()
    }
    this.isAddUserModalOpen.set(false)
  }

  
  onUserModalClose(value: boolean){
    if (value) {
      this.users$ = this.usersService.getUsers()
    }
    this.isUsersModalOpen.set(false)
    this.userToDelete.set(null)
    this.userToDeleteIndex.set(null)
  }

}
