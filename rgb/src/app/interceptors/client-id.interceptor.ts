import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Functional HTTP interceptor
 * -------------------------------------------------
 * Automatically attaches a CLIENT_ID header to every outgoing HTTP request.
 *
 * This runs globally once registered in app.config.ts.
 * It replaces the older class-based HttpInterceptor approach.
 */

export const clientIdInterceptor: HttpInterceptorFn = (req, next) => {

  // HttpRequest is immutable → must clone before modifying
  const cloned = req.clone({
    setHeaders: {
      CLIENT_ID: 'rgbexam' // custom header required by backend
    }
  });

  // Pass modified request to next interceptor or HTTP handler
  return next(cloned);
};
