import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap } from "rxjs";


export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Request is on the way');
        console.log(req.url);
        const modifiedReq = req.clone({
            headers: req.headers.append('Auth', 'Hello from Auth interceptor')
        })
        return next.handle(modifiedReq).pipe(tap((event: HttpEvent<HttpResponse<any>>) => {
            console.log(event);
            if(event.type === HttpEventType.Response){
                console.log('Response recieved');
                console.log(event.body);
            }
        }));
    }
}