import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class LoggingInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Outgoing request! \n URL: '+ req.url + '\n Mehtod: '+ req.method);
        console.log(req.headers);
        return next.handle(req).pipe(tap((event:HttpEvent<HttpResponse<any>>) => {
            console.log('HttpEventType.Response:  '+HttpEventType.Response);
            console.log('event.type:  '+event.type);
            if(event.type === HttpEventType.Response){
                console.log('Incomming Response!');
                console.log(event.body);
            }
        })) ;
    }
}