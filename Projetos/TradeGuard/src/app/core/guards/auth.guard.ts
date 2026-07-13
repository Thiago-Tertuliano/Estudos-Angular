import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../features/auth/data-access/auth.service";
import { roleUser } from "../../features/auth/data-access/user.model";

export const authGuard: CanActivateFn = (_route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.isAuthenticated()) {
        return true;
    }

    return router.createUrlTree(['/login'],{
        queryParams: { returnUrl: state.url}
    });
};

export const roleGuard: CanActivateFn = (route) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const requiredRoles = route.data?.['roles'] as roleUser[] | undefined;

    if (!requiredRoles?.includes(auth.currentUser()?.role as roleUser)) {
        return router.createUrlTree(['/']);
    }
    return true;
};