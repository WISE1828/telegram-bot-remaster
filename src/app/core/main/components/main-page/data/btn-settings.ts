import { IBtnRoute } from "../interfaces/btn-route.interface"

export const btnSettings: IBtnRoute[] = [
	{
		img: "assets/svg/ep_user-icon.svg",
		name: "Пользователи",
		url: "/main/users",
	},
	{
		img: "assets/svg/departments.svg",
		name: "Отделы",
		url: "/main/departments",
	},
	{ img: "assets/svg/tools.svg", name: "Инструменты", url: "/main/tools" },
	{ img: "assets/svg/limits.svg", name: "Лимиты", url: "/main/limits" },
]
