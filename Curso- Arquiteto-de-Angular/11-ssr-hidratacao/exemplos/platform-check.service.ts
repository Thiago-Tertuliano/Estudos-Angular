import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class PlatformCheckService {
  private readonly platformId = inject(PLATFORM_ID);

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  safeLocalStorageGet(key: string): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(key);
  }
}
