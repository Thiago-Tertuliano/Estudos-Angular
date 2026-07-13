export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
}

export type ProductCategory = 'Serviço' | 'Licença' | 'Infra';
export const CATEGORY_OPTIONS: ProductCategory[] = ['Serviço', 'Licença', 'Infra'];
