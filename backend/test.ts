import { aiService } from './src/services/AIService.js';
console.log('Testing OpenRouter...');
aiService.generate(['google/gemini-2.0-flash-lite'], 'Classify this legal document. Return ONLY valid JSON: { "type": "FIR", "confidence": 0.99 }', undefined, { temperature: 0 })
  .then(r => console.log('Response:', r))
  .catch(e => {
    console.error('Error Object:', e);
    console.error('Error Name:', e.name);
    console.error('Error Message:', e.message);
    if (e.status) console.error('Status:', e.status);
    if (e.details) console.error('Details:', e.details);
  });
