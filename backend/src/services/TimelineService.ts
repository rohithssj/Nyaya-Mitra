import type { ClassificationResult } from '../types/document.js';
import type { ExtractionResult } from '../types/extraction.js';
import type { RuleEngineResult } from '../types/rules.js';

export interface TimelineEvent {
    title: string;
    date?: string | undefined;
    description: string;
}

export interface TimelineResult {
    events: TimelineEvent[];
}

export class TimelineService {
    static generateTimeline(
        classification: ClassificationResult | undefined,
        extraction: ExtractionResult | undefined,
        ruleEngine: RuleEngineResult | undefined
    ): TimelineResult {
        const events: TimelineEvent[] = [];
        
        const docType = extraction?.documentType || classification?.type || 'Unknown';
        
        if (docType === 'FIR') {
            const firDate = extraction?.dates?.find(d => d.type.toLowerCase().includes('fir') || d.type.toLowerCase().includes('issue'))?.value || new Date().toISOString().split('T')[0];
            events.push({
                title: 'FIR Registered',
                date: firDate,
                description: 'First Information Report was officially registered.'
            });
            events.push({
                title: 'Produced before Magistrate',
                description: 'The accused must be produced before a Magistrate within 24 hours of arrest (if arrested).'
            });
            
            // Look for chargesheet deadline in rule engine
            const chargesheetRule = ruleEngine?.deadlines?.find(d => d.toLowerCase().includes('chargesheet'));
            if (chargesheetRule) {
                events.push({
                    title: 'Chargesheet Deadline',
                    description: chargesheetRule
                });
            } else {
                events.push({
                    title: 'Chargesheet Deadline',
                    description: 'Police must file a chargesheet within 60 or 90 days depending on the offence severity.'
                });
            }
            events.push({
                title: 'Trial Begins',
                description: 'Court proceedings commence based on the chargesheet.'
            });

        } else if (docType === 'Court Summons') {
            const issueDate = extraction?.dates?.find(d => d.type.toLowerCase().includes('issue'))?.value;
            events.push({
                title: 'Summons Issued',
                date: issueDate,
                description: 'Court formally issued the summons.'
            });
            
            const appearanceDate = extraction?.dates?.find(d => d.type.toLowerCase().includes('appear') || d.type.toLowerCase().includes('hearing'))?.value;
            events.push({
                title: 'Appearance before Court',
                date: appearanceDate,
                description: 'You must appear before the court on this specific date.'
            });
            
            events.push({
                title: 'Court Proceedings',
                description: 'The court case proceeds to the next stage.'
            });

        } else if (docType === 'Legal Notice' || docType === 'Police Notice') {
            const issueDate = extraction?.dates?.find(d => d.type.toLowerCase().includes('issue') || d.type.toLowerCase().includes('notice'))?.value;
            events.push({
                title: 'Notice Issued',
                date: issueDate,
                description: `A ${docType} was issued to you.`
            });
            
            const deadline = ruleEngine?.deadlines?.[0] || 'You must respond within the stipulated time frame.';
            events.push({
                title: 'Response Deadline',
                description: deadline
            });
            
            events.push({
                title: 'Further Legal Action',
                description: 'If you fail to respond, the sender may initiate further legal or penal proceedings.'
            });
            
        } else if (docType === 'Bail Order') {
            const issueDate = extraction?.dates?.find(d => d.type.toLowerCase().includes('issue') || d.type.toLowerCase().includes('order'))?.value;
            events.push({
                title: 'Bail Order Issued',
                date: issueDate,
                description: 'The court has granted the bail order.'
            });
            events.push({
                title: 'Furnish Sureties',
                description: 'You must provide the required sureties to the court or police station.'
            });
            events.push({
                title: 'Release from Custody',
                description: 'You will be released after bail conditions are successfully met.'
            });
        }
        
        return { events };
    }
}
