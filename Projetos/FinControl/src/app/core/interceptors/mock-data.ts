import { Transaction } from '@features/transactions/data-access/transaction.model';

export interface User {
  id: string;
  email: string;
  name: string;
}

export const DEMO_USER: User = {
  id: '1',
  email: 'dev@fincontrol.app',
  name: 'Dev FinControl',
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    description: 'Salário',
    amount: 8500,
    type: 'income',
    categoryId: 'cat-salary',
    date: '2026-06-01',
  },
  {
    id: 'tx-2',
    description: 'Aluguel',
    amount: 2200,
    type: 'expense',
    categoryId: 'cat-housing',
    date: '2026-06-05',
  },
  {
    id: 'tx-3',
    description: 'Supermercado',
    amount: 680,
    type: 'expense',
    categoryId: 'cat-food',
    date: '2026-06-10',
  },
  {
    id: 'tx-4',
    description: 'Freelance',
    amount: 1500,
    type: 'income',
    categoryId: 'cat-freelance',
    date: '2026-06-15',
  },
  {
    id: 'tx-5',
    description: 'Academia',
    amount: 120,
    type: 'expense',
    categoryId: 'cat-health',
    date: '2026-06-18',
  },
];

export const MOCK_CATEGORIES = [
  { id: 'cat-salary', name: 'Salário', type: 'income' as const },
  { id: 'cat-freelance', name: 'Freelance', type: 'income' as const },
  { id: 'cat-housing', name: 'Moradia', type: 'expense' as const },
  { id: 'cat-food', name: 'Alimentação', type: 'expense' as const },
  { id: 'cat-health', name: 'Saúde', type: 'expense' as const },
];

/** Store mutável em memória — simula backend durante desenvolvimento */
export class MockDatabase {
  private static transactions = [...MOCK_TRANSACTIONS];

  static getTransactions(): Transaction[] {
    return [...this.transactions];
  }

  static addTransaction(tx: Transaction): Transaction {
    this.transactions = [tx, ...this.transactions];
    return tx;
  }

  static deleteTransaction(id: string): boolean {
    const before = this.transactions.length;
    this.transactions = this.transactions.filter((t) => t.id !== id);
    return this.transactions.length < before;
  }

  static searchTransactions(q: string): Transaction[] {
    const term = q.toLowerCase();
    return this.transactions.filter((t) =>
      t.description.toLowerCase().includes(term)
    );
  }
}
