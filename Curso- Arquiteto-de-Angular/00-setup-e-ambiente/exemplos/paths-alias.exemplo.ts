/**
 * Adicione ao tsconfig.json > compilerOptions > paths:
 *
 * "paths": {
 *   "@core/*": ["src/app/core/*"],
 *   "@shared/*": ["src/app/shared/*"],
 *   "@features/*": ["src/app/features/*"]
 * }
 *
 * Benefício: imports limpos e refatoração segura.
 *
 * Antes:  import { AuthService } from '../../../core/services/auth.service';
 * Depois: import { AuthService } from '@core/services/auth.service';
 */

export {};
