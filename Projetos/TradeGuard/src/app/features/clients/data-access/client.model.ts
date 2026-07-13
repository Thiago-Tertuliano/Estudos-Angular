export type typeClient = 'PF' | 'PJ';
export type riskProfile = 'conservador' | 'moderado' | 'agressivo';
export type statusClient = 'active' | 'blocked' | 'suspended'; 

export interface Client {
    id: number;
    name: string;
    document: string;
    type: typeClient;
    riskProfile: riskProfile;
    status: statusClient;
    createdAt: string;
}