export interface MockUser {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export const DEMO_USER: MockUser = {
  id: 1,
  email: 'admin@orcaflow.app',
  name: 'Admin OrçaFlow',
  role: 'admin',
};

export const MOCK_USERS: MockUser[] = [
  DEMO_USER,
  { id: 2, email: 'user@orcaflow.app', name: 'Usuário Comum', role: 'user' },
];

export const MOCK_PRODUCTS = [
  { id: 1, name: 'Consultoria TI', description: 'Consultoria especializada em infraestrutura', price: 15000, category: 'Serviço', active: true },
  { id: 2, name: 'Desenvolvimento Web', description: 'Criação de sites e sistemas web', price: 25000, category: 'Serviço', active: true },
  { id: 3, name: 'Licença Software ERP', description: 'Licença anual sistema ERP', price: 45000, category: 'Licença', active: true },
  { id: 4, name: 'Suporte Técnico (10h)', description: 'Pacote de 10 horas de suporte', price: 5000, category: 'Serviço', active: true },
  { id: 5, name: 'Hospedagem Cloud', description: 'Hospedagem dedicada 12 meses', price: 12000, category: 'Infra', active: true },
  { id: 6, name: 'Treinamento Equipe', description: 'Treinamento in company 40h', price: 8000, category: 'Serviço', active: false },
  { id: 7, name: 'Certificado Digital', description: 'Certificado A1 válido 12 meses', price: 600, category: 'Licença', active: true },
  { id: 8, name: 'Firewall Corporativo', description: 'Equipamento + configuração', price: 35000, category: 'Infra', active: true },
];

export const MOCK_CLIENTS = [
  { id: 1, name: 'Tech Solutions Ltda', email: 'contato@techsolutions.com', phone: '(11) 99999-0001', document: '12.345.678/0001-90', createdAt: '2026-01-15' },
  { id: 2, name: 'Data Center Brasil S/A', email: 'admin@dcbrasil.com.br', phone: '(21) 98888-0002', document: '98.765.432/0001-10', createdAt: '2026-02-20' },
  { id: 3, name: 'CloudNine Tecnologia', email: 'vendas@cloudnine.tec', phone: '(31) 97777-0003', document: '11.222.333/0001-44', createdAt: '2026-03-10' },
];

export const MOCK_PROPOSALS = [
  {
    id: 1, clientId: 1, clientName: 'Tech Solutions Ltda', status: 'sent',
    discount: 2000, createdAt: '2026-04-01',
    items: [
      { id: 1, productId: 2, productName: 'Desenvolvimento Web', quantity: 1, unitPrice: 25000 },
      { id: 2, productId: 4, productName: 'Suporte Técnico (10h)', quantity: 2, unitPrice: 5000 },
    ],
  },
  {
    id: 2, clientId: 2, clientName: 'Data Center Brasil S/A', status: 'draft',
    discount: 0, createdAt: '2026-04-10',
    items: [
      { id: 3, productId: 5, productName: 'Hospedagem Cloud', quantity: 1, unitPrice: 12000 },
    ],
  },
];

export class MockDatabase {
  private static users = [...MOCK_USERS];
  private static products = [...MOCK_PRODUCTS];
  private static clients = [...MOCK_CLIENTS];
  private static proposals = JSON.parse(JSON.stringify(MOCK_PROPOSALS));
  private static nextProductId = 9;
  private static nextClientId = 4;
  private static nextProposalId = 3;
  private static nextItemId = 4;

  static findUser(email: string, password: string): MockUser | null {
    return this.users.find(u => u.email === email && password === '123') ?? null;
  }

  static getProducts() { return [...this.products]; }
  static getProduct(id: number) { return this.products.find(p => p.id === id); }
  static addProduct(p: any) { const n = { ...p, id: this.nextProductId++ }; this.products.push(n); return n; }
  static updateProduct(id: number, data: any) { const i = this.products.findIndex(p => p.id === id); if (i >= 0) { this.products[i] = { ...this.products[i], ...data }; return this.products[i]; } return null; }
  static deleteProduct(id: number) { this.products = this.products.filter(p => p.id !== id); }

  static getClients() { return [...this.clients]; }
  static getClient(id: number) { return this.clients.find(c => c.id === id); }
  static addClient(c: any) { const n = { ...c, id: this.nextClientId++, createdAt: new Date().toISOString().split('T')[0] }; this.clients.push(n); return n; }
  static updateClient(id: number, data: any) { const i = this.clients.findIndex(c => c.id === id); if (i >= 0) { this.clients[i] = { ...this.clients[i], ...data }; return this.clients[i]; } return null; }

  static getProposals() { return JSON.parse(JSON.stringify(this.proposals)); }
  static getProposal(id: number) { return this.proposals.find((p: any) => p.id === id); }
  static addProposal(p: any) { const n = { ...p, id: this.nextProposalId++, items: p.items?.map((i: any, idx: number) => ({ ...i, id: this.nextItemId++ })) || [] }; this.proposals.push(n); return n; }
  static updateProposal(id: number, data: any) { const i = this.proposals.findIndex((p: any) => p.id === id); if (i >= 0) { this.proposals[i] = { ...this.proposals[i], ...data, items: data.items?.map((item: any, idx: number) => ({ ...item, id: item.id || this.nextItemId++ })) || this.proposals[i].items }; return this.proposals[i]; } return null; }
}
