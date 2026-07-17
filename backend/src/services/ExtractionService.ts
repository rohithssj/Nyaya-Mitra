import { aiService } from './AIService.js';
import type { ExtractionResult } from '../types/extraction.js';
import { AI_CONFIG } from '../config/ai.js';
import { EXTRACTION_PROMPT } from '../prompts/extraction.js';

export class ExtractionService {
    static async performExtraction(ocrText: string, documentId: string, classificationType?: string): Promise<ExtractionResult | null> {
        const startTime = Date.now();
        
        try {
            console.log('\nExtraction Started\n');
            console.log(`Document:\n${documentId}\n`);
            console.log(`Cache:\nMISS\n`);
            console.log(`Model:\n${AI_CONFIG.entityModel}\n`);

            let prompt = `${EXTRACTION_PROMPT}\n\n`;
            if (classificationType && classificationType !== 'Unknown') {
                prompt += `CONTEXT: This document has been classified as "${classificationType}".\n\n`;
            }
            prompt += `DOCUMENT TEXT:\n${ocrText}`;

            const result = await aiService.generate(
                [AI_CONFIG.entityModel],
                prompt,
                undefined,
                { temperature: 0 }
            );

            const processingTime = Date.now() - startTime;
            
            let parsedJson: any;
            try {
                const cleanText = result.text.replace(/```json/gi, '').replace(/```/g, '').trim();
                parsedJson = JSON.parse(cleanText);
            } catch (e) {
                console.error("Failed to parse extraction JSON:", result.text);
                return null;
            }

            // Normalization
            const cleanStr = (val: any) => (typeof val === 'string' && val.trim() !== '' ? val.trim() : null);
            const cleanArr = (val: any) => (Array.isArray(val) ? Array.from(new Set(val.filter(v => typeof v === 'string').map(v => v.trim()).filter(v => v !== ''))) : []);

            const dates = Array.isArray(parsedJson.dates) ? parsedJson.dates.map((d: any) => ({
                type: cleanStr(d.type),
                value: cleanStr(d.value)
            })).filter((d: any) => d.type && d.value) : [];

            const extractionResult: ExtractionResult = {
                documentType: cleanStr(parsedJson.documentType),
                court: cleanStr(parsedJson.court),
                policeStation: cleanStr(parsedJson.policeStation),
                caseNumber: cleanStr(parsedJson.caseNumber),
                firNumber: cleanStr(parsedJson.firNumber),
                crimeNumber: cleanStr(parsedJson.crimeNumber),
                judge: cleanStr(parsedJson.judge),
                complainant: cleanStr(parsedJson.complainant),
                accused: cleanStr(parsedJson.accused),
                advocate: cleanStr(parsedJson.advocate),
                sections: cleanArr(parsedJson.sections),
                acts: cleanArr(parsedJson.acts),
                dates: dates,
                addresses: cleanArr(parsedJson.addresses),
                offences: cleanArr(parsedJson.offences),
                importantPersons: cleanArr(parsedJson.importantPersons),
                importantOrganizations: cleanArr(parsedJson.importantOrganizations),
                
                processingTime,
                model: result.modelUsed,
                processedAt: new Date().toISOString()
            };

            console.log('Extraction Complete\n');
            return extractionResult;

        } catch (error: any) {
            console.error('\n--- DEBUG: CAUGHT EXCEPTION IN EXTRACTION SERVICE ---\n');
            console.dir(error, { depth: null });
            console.error('\n-----------------------------------------------------\n');
            return null;
        }
    }
}
