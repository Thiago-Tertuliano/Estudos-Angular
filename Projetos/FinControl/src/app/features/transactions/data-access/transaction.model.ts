export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

export interface TransactionFilters {
  search: string;
  type: 'all' | 'income' | 'expense';
}

export interface SearchResult {
  id: string;
  label: string;
}
