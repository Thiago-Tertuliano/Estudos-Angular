export interface ProposalItem {
  id?: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Proposal {
  id: number;
  clientId: number;
  clientName: string;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  discount: number;
  total: number;
  createdAt: string;
  items: ProposalItem[];
}

export type ProposalStatus = 'draft' | 'sent' | 'approved' | 'rejected';

export const PROPOSAL_STATUS_LABELS: Record<ProposalStatus, string> = {
  draft: 'Rascunho', sent: 'Enviada', approved: 'Aprovada', rejected: 'Rejeitada',
};
