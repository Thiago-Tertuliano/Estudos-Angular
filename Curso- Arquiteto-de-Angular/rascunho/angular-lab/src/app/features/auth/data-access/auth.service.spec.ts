import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideRouter([{ path: 'login', redirectTo: '', pathMatch: 'full' }]),
      ],
    });
    localStorage.clear();
    service = TestBed.inject(AuthService);
  });

  it('deve autenticar com credenciais válidas', () => {
    expect(service.login('user@test.com', '123')).toBe(true);
    expect(service.isAuthenticated()).toBe(true);
    expect(service.getToken()).toBe('mock-token');
  });

  it('deve rejeitar credenciais inválidas', () => {
    service.login('user@test.com', '123');
    service.logout();
    localStorage.clear();

    expect(service.login('', '12')).toBe(false);
    expect(service.isAuthenticated()).toBe(false);
  });

  it('deve limpar sessão no logout', () => {
    service.login('user@test.com', '123');
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
    expect(service.getToken()).toBeNull();
  });
});
