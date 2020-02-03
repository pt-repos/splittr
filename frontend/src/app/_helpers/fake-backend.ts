import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { flatMap, materialize, delay, dematerialize } from 'rxjs/operators';

const users = [
    {
        id: 1,
        username: 'user1',
        pwHash: 'e6c3da5b206634d7f3f3586d747ffdb36b5c675757b380c6a5fe5c570c714349'
    },
    {
        id: 2,
        username: 'user2',
        pwHash: '1ba3d16e9881959f8c9a9762854f72c6e6321cdd44358a10a4e939033117eab9'
    }
];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // throw new Error('Method not implemented.');

        return of(null)
            .pipe(flatMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case req.url.endsWith('/users/authenticate') && req.method === 'POST':
                    return authenticate();
                default:
                    return next.handle(req);
            }
        }

        function authenticate() {
            const { username, pwHash } = req.body;
            const user = users.find(
                x => x.username === username
                && x.pwHash === pwHash
            );
            if (!user) {
                return error('Username or password is incorrect');
            }

            return ok({
                id: user.id,
                username: user.username,
                token: 'a-secret-token'
            });
        }

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body}));
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }
    }
}
