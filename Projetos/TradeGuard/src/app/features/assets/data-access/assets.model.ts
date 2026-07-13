export type typeAsset = 'stock' | 'fii' | 'fixed_income' | 'derivative';
export type currencyAsset = 'BRL' | 'USD';

export interface Asset {
    id: number;
    symbol: string;
    name: string;
    type: typeAsset;
    category: string;
    price: number;
    currency: currencyAsset;
}