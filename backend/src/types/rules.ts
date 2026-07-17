export interface LegalRule {
    title: string;
    bailable: boolean;
    cognizable: boolean;
    compoundable: boolean;
    maxPunishment: string;
    chargesheetDeadline: string;
    rights: string[];
    warnings: string[];
}

export interface RuleEngineResult {
    sections: string[];
    rights: string[];
    deadlines: string[];
    warnings: string[];
    facts: string[];
}
