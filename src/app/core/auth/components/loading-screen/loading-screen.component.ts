import { NgOptimizedImage } from "@angular/common"
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
	signal,
} from "@angular/core"
import { TelegramService } from "../../../../shared/services/telegram.service"
import { AuthService } from "../../services/auth.service"
import { delay, timer } from "rxjs"
import { Router } from "@angular/router"

@Component({
	selector: "app-loading-screen",
	standalone: true,
	imports: [NgOptimizedImage],
	templateUrl: "./loading-screen.component.html",
	styleUrl: "./loading-screen.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingScreenComponent {
	isAuthFail = signal(false)
	telegram_id = signal("")

	telegram = inject(TelegramService)
	authService = inject(AuthService)
	router = inject(Router)

	constructor() {
		this.telegram_id.set(this.telegram.tg?.initDataUnsafe?.user.username)
		this.getID()
	}

	getID() {
		timer(1500).subscribe(() => {
			this.authService.getRequest().subscribe({
				error: res => {
					if (res.status === 200) {
						this.isAuthFail.set(false)
						this.router.navigate(["/main"])
					} else {
						this.isAuthFail.set(true)
					}
				},
			})
		})
	}

	
}
