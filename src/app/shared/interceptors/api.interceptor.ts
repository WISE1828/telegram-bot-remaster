import { HttpInterceptorFn } from "@angular/common/http"
import { environment } from "../../../environments/environment"

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
	const apiReq = req.clone({
		headers: req.headers
			.set("x-api-key", environment.x_api_key)
			.set("Content-Type", "application/json"),
		url: `${environment.API_URL}${req.url}`,
	})
	return next(apiReq)
}
