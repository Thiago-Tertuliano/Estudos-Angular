import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { APP_CONFIG } from '@core/tokens/app-config.token';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        provideRouter([{ path: 'login', redirectTo: '', pathMatch: 'full' }]),
        {
          provide: APP_CONFIG,
          useValue: { apiUrl: '/api', appName: 'FinControl', production: false },
        },
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => httpMock.verify());

  it('deve autenticar e persistir token', () => {
    service.login('user@test.com', 'secret').subscribe();

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({
      token: 'jwt-token',
      user: { id: '1', email: 'user@test.com', name: 'User' },
    });

    expect(service.isAuthenticated()).toBe(true);
    expect(localStorage.getItem('auth_token')).toBe('jwt-token');
  });

  it('deve limpar sessão no logout', () => {
    localStorage.setItem('auth_token', 'x');
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
  });
});
