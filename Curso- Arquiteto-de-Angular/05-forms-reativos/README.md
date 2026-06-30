# Módulo 05 — Forms Reativos

> **Guia:** [exercicios/GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)

## Glossário

| Termo | Significado |
|-------|-------------|
| **FormGroup** | Grupo de campos do formulário |
| **FormControl** | Um campo (input) |
| **Validators** | Regras (required, min, email...) |
| **form.invalid** | true se algum campo falhou |
| **markAllAsTouched** | Mostra erros após tentativa de submit |

## Objetivos

- Dominar `FormBuilder`, `FormGroup`, `FormControl`, `FormArray`
- Validators síncronos e assíncronos
- UX: touched/dirty, mensagens de erro, disable submit
- Typed forms (Angular 14+)

## Contexto

Template-driven forms servem para protótipos. **Reactive forms** são o padrão enterprise: testáveis, composáveis, validação complexa, valueChanges tipado.

---

## Typed FormGroup

```typescript
interface TransactionForm {
  description: FormControl<string>;
  amount: FormControl<number>;
  categoryId: FormControl<string>;
}

form = this.fb.group<TransactionForm>({
  description: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
  amount: this.fb.control(0, { validators: [Validators.required, Validators.min(0.01)] }),
  categoryId: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
});
```

---

## Validators customizados

```typescript
export function maxAmount(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as number;
    return value > max ? { maxAmount: { max, actual: value } } : null;
  };
}
```

---

## Async validator (ex: descrição única)

```typescript
description: this.fb.control('', {
  validators: [Validators.required],
  asyncValidators: [uniqueDescriptionValidator(this.service)],
  updateOn: 'blur',
}),
```

---

## Exemplos

- [`exemplos/transaction-form.component.ts`](./exemplos/transaction-form.component.ts)
- [`exemplos/custom-validators.ts`](./exemplos/custom-validators.ts)

---

## Exercícios

→ **[GUIA-PASSO-A-PASSO.md](./exercicios/GUIA-PASSO-A-PASSO.md)**

---

## Checklist

- [ ] Typed reactive form
- [ ] Validator customizado
- [ ] Teste unitário do validator

**Próximo:** [Módulo 06 — HTTP e Interceptors](../06-http-interceptors-estado/README.md)
