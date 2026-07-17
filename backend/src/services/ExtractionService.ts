import { aiService } from './AIService.js';
import type { ExtractionResult } from '../types/extraction.js';
import { AI_CONFIG } from '../config/ai.js';
import { EXTRACTION_PROMPT } from '../prompts/extraction.js';

export class ExtractionService {
    static async performExtraction(ocrText: string, documentId: string, classificationType?: string): Promise<ExtractionResult | null> {
        const startTime = Date.now();
        
        try {
            console.log('\n========== Extraction ==========');
            console.log(`Model:\n${AI_CONFIG.entityModel}`);

            let prompt = `${EXTRACTION_PROMPT}\n\n`;
            if (classificationType && classificationType !== 'Unknown') {
                prompt += `CONTEXT: This document has been classified as "${classificationType}".\n\n`;
            }
            prompt += `DOCUMENT TEXT:\n${ocrText}`;
            console.log(`Prompt:\n${prompt}`);

            const result = await aiService.generate(
                [AI_CONFIG.entityModel],
                prompt,
                undefined,
                { temperature: 0 }
            );

            console.log(`Raw Response:\n${result.text}`);

            const processingTime = Date.now() - startTime;
            
            let parsedJson: any;
            try {
                const cleanText = result.text.replace(/```json/gi, '').replace(/```/g, '').trim();
                parsedJson = JSON.parse(cleanText);
                console.log(`Parsed JSON:\n${JSON.stringify(parsedJson, null, 2)}`);
            } catch (e: any) {
                console.error(`\nParsing Error:\n${e.message}\n${e.stack}`);
                console.error(`Raw Response that failed parsing:\n${result.text}`);
                throw e;
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

            console.log('Finished\n');
            return extractionResult;

        } catch (error: any) {
            console.error(`\nAPI/Execution Error:\nStatus: ${error.status || 'N/A'}`);
            console.error(`Provider Error: ${JSON.stringify(error.details || {})}`);
            console.error(`Message: ${error.message}`);
            console.error(`Stack: ${error.stack}`);
            
            // Restore graceful fallback as requested
            return null;
        }
    }
}
