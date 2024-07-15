import { Routes } from "@angular/router"
import { MainPageComponent } from "./components/main-page/main-page.component"
import { UsersPageComponent } from "./components/users-page/users-page.component"
import { LayoutComponent } from "./components/layout/layout.component"
import { DepartmentsPageComponent } from "./components/departments-page/departments-page.component"
import { ToolsPageComponent } from "./components/tools-page/tools-page.component"
import { LimitsPageComponent } from "./components/limits-page/limits-page.component"

export const mainRoutes: Routes = [
	{
		path: "",
		component: LayoutComponent,
		children: [
			{ path: "", component: MainPageComponent, pathMatch: "full" },
			{ path: "users", component: UsersPageComponent },
			{ path: "departments", component: DepartmentsPageComponent },
			{ path: "tools", component: ToolsPageComponent },
			{ path: "limits", component: LimitsPageComponent },
		],
	},
]
