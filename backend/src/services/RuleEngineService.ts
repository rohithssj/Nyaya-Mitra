import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import type { LegalRule, RuleEngineResult } from '../types/rules.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');

export class RuleEngineService {
    private static rulesCache: Map<string, LegalRule> = new Map();
    private static isInitialized = false;

    static async initialize() {
        if (this.isInitialized) return;
        
        try {
            const ipcData = await fs.readFile(path.join(DATA_DIR, 'ipcRules.json'), 'utf-8');
            const crpcData = await fs.readFile(path.join(DATA_DIR, 'crpcRules.json'), 'utf-8');
            const bnssData = await fs.readFile(path.join(DATA_DIR, 'bnssRules.json'), 'utf-8');
            const docData = await fs.readFile(path.join(DATA_DIR, 'documentRules.json'), 'utf-8');

            const allRules = {
                ...JSON.parse(ipcData),
                ...JSON.parse(crpcData),
                ...JSON.parse(bnssData),
                ...JSON.parse(docData)
            };

            for (const [section, rule] of Object.entries(allRules)) {
                this.rulesCache.set(section, rule as LegalRule);
            }
            
            this.isInitialized = true;
            console.log(`[RuleEngine] Initialized with ${this.rulesCache.size} rules.`);
        } catch (error) {
            console.error('[RuleEngine] Error initializing rules:', error);
        }
    }

    static async getRule(section: string): Promise<LegalRule | null> {
        await this.initialize();
        return this.rulesCache.get(section) || null;
    }

    static async getRules(sections: string[]): Promise<Record<string, LegalRule>> {
        await this.initialize();
        const results: Record<string, LegalRule> = {};
        for (const section of sections) {
            const rule = this.rulesCache.get(section);
            if (rule) {
                results[section] = rule;
            }
        }
        return results;
    }

    static generateLegalFacts(rules: Record<string, LegalRule>): string[] {
        const facts = new Set<string>();
        for (const [section, rule] of Object.entries(rules)) {
            facts.add(`${section} is a ${rule.bailable ? 'Bailable' : 'Non-Bailable'} offence.`);
            facts.add(`${section} is a ${rule.cognizable ? 'Cognizable' : 'Non-Cognizable'} offence.`);
            facts.add(`${section} is a ${rule.compoundable ? 'Compoundable' : 'Non-Compoundable'} offence.`);
            facts.add(`${section} max punishment: ${rule.maxPunishment}.`);
        }
        return Array.from(facts);
    }

    static generateRights(rules: Record<string, LegalRule>): string[] {
        const rights = new Set<string>();
        for (const rule of Object.values(rules)) {
            rule.rights.forEach(r => rights.add(r));
        }
        return Array.from(rights);
    }

    static generateDeadlines(rules: Record<string, LegalRule>): string[] {
        const deadlines = new Set<string>();
        for (const [section, rule] of Object.entries(rules)) {
            if (rule.chargesheetDeadline && rule.chargesheetDeadline !== "N/A") {
                deadlines.add(`Chargesheet for ${section} must be filed within ${rule.chargesheetDeadline}.`);
            }
        }
        return Array.from(deadlines);
    }

    static generateWarnings(rules: Record<string, LegalRule>): string[] {
        const warnings = new Set<string>();
        for (const rule of Object.values(rules)) {
            rule.warnings.forEach(w => warnings.add(w));
        }
        return Array.from(warnings);
    }

    static async analyzeSections(sections: string[], documentType?: string | null): Promise<RuleEngineResult> {
        await this.initialize();
        
        let validRules = await this.getRules(sections);
        let validSections = Object.keys(validRules);
        
        // Document-aware fallback: if no sections matched but we have a valid document type
        if (validSections.length === 0 && documentType) {
            const docRule = this.rulesCache.get(documentType);
            if (docRule) {
                validRules = { [documentType]: docRule };
                validSections = [documentType];
            }
        }

        if (validSections.length === 0) {
            return {
                sections: [],
                rights: [],
                deadlines: [],
                warnings: [],
                facts: []
            };
        }

        return {
            sections: validSections,
            rights: this.generateRights(validRules),
            deadlines: this.generateDeadlines(validRules),
            warnings: this.generateWarnings(validRules),
            facts: this.generateLegalFacts(validRules)
        };
    }
}
