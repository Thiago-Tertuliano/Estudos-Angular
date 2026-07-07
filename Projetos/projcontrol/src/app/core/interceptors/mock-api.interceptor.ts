import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { delay, of, throwError } from 'rxjs';
import { Project } from '@features/projects/data-access/project.model';
import { DEMO_USER, MockDatabase } from './mock-data';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api')) {
    return next(req);
  }

  const { url, method, body } = req;
  const latency = 400;

  if (url === '/api/auth/login' && method === 'POST') {
    const { email, password } = body as { email: string; password: string };
    if (email && password.length >= 3) {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            token: 'mock-jwt-token',
            user: { ...DEMO_USER, email },
          },
        }),
      ).pipe(delay(latency));
    }
    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          error: { message: 'Credenciais inválidas' },
        }),
    );
  }

  if (url === '/api/projects' && method === 'GET') {
    return of(
      new HttpResponse({ status: 200, body: MockDatabase.getProjects() }),
    ).pipe(delay(latency));
  }

  if (url === '/api/projects' && method === 'POST') {
    const payload = body as Omit<Project, 'id'>;
    const created: Project = {
      ...payload,
      id: `proj-${Date.now()}`,
    };
    MockDatabase.addProject(created);
    return of(new HttpResponse({ status: 201, body: created })).pipe(delay(latency));
  }

  const deleteMatch = url.match(/^\/api\/projects\/(.+)$/);
  if (deleteMatch && method === 'DELETE') {
    const id = deleteMatch[1];
    if (!MockDatabase.deleteProject(id)) {
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 404,
            error: { message: 'Projeto não encontrado' },
          }),
      );
    }
    return of(new HttpResponse({ status: 204, body: null })).pipe(delay(latency));
  }

  return throwError(
    () =>
      new HttpErrorResponse({
        status: 404,
        error: { message: 'Rota mock não encontrada' },
      }),
  );
};
