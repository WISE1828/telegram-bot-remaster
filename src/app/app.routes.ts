import { Routes } from "@angular/router"
import { LoadingScreenComponent } from "./core/auth/components/loading-screen/loading-screen.component"
import { authGuard } from "./core/auth/guards/auth.guard"

export const routes: Routes = [
	{ path: "", component: LoadingScreenComponent, pathMatch: "full" },
	{
		path: "main",
		loadChildren: () =>
			import("./core/main/main.routes").then(m => m.mainRoutes),
		// canActivate: [authGuard]
	},
]
