export type roleUser = 'operator' | 'compliance' | 'admin';

export interface User {
    id: number;
    name: string;
    email: string;
    role: roleUser;
    active: boolean;
}