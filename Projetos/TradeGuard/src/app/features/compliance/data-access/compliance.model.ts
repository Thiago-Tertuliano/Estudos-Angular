export type typeCompliance = 'max_concentration' | 'max_position' | 'restricted_list' | 'min_diversification' | 'max_order_value';
export type statusCompliance = 'pending' | 'approved' | 'rejected';

export interface complianceRule {
    id: number;
    name: string;
    description: string;
    type: typeCompliance;
    parameters: Record<string, number | string>;
    riskProfile?: string;
    active: boolean;
}

export interface complianceRuleResult {
    ruleId: number;
    ruleName: string;
    passed: boolean;
    message?: string;
}

export interface complianceCheck {
    id: number;
    orderId: number;
    status: statusCompliance;
    results: complianceRuleResult[];
    checkedAt: string;
}