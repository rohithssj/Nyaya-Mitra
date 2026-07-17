import type { Document } from '../types/document.js';
import crypto from 'crypto';
import fs from 'fs/promises';

export class DocumentStore {
    private static cache: Map<string, Document> = new Map();

    static async calculateHash(filePath: string): Promise<string> {
        const fileBuffer = await fs.readFile(filePath);
        const hashSum = crypto.createHash('sha256');
        hashSum.update(fileBuffer);
        return hashSum.digest('hex');
    }

    static getCachedDocument(hash: string): Document | undefined {
        return this.cache.get(hash);
    }

    static saveDocument(hash: string, document: Document): void {
        this.cache.set(hash, document);
    }
}
