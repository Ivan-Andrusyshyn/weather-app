import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

// ===============
import { ToastService } from '../services/toast.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Something went wrong';

      if (error.error?.message) {
        message = error.error.message;
      } else if (error.status === 0) {
        message = 'Server is not available';
      } else if (error.status === 404) {
        message = 'Resource not found';
      } else if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = 'Server error';
      }

      toastService.error(message);

      return throwError(() => error);
    }),
  );
};
