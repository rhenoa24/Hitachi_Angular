import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "../../../node_modules/@angular/core/types/core";
import { Observable } from "../../../node_modules/rxjs/dist/types/index";

@Injectable()
export class ClientIdInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const clonedRequest = request.clone({
      setHeaders: {
        CLIENT_ID: 'rgbexam'
      }
    });

    return next.handle(clonedRequest);
  }
}
