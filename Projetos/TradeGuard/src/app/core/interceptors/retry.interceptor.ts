import { HttpInterceptorFn } from "@angular/common/http";
import { retry, timer } from "rxjs";

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
    const maxRetries = 2;

    return next(req).pipe(
        retry({
            count: maxRetries,
            delay: (error, retryCount) => {
                if (error.status === 0 || error.status >= 500) {
                    return timer(retryCount * 1000);
                }
                throw error;
            },
        }),
    );
};