export interface ExtractedDate {
    type: string;
    value: string;
}

export interface ExtractionResult {
    documentType: string | null;
    court: string | null;
    policeStation: string | null;
    caseNumber: string | null;
    firNumber: string | null;
    crimeNumber: string | null;
    judge: string | null;
    complainant: string | null;
    accused: string | null;
    advocate: string | null;
    sections: string[];
    acts: string[];
    dates: ExtractedDate[];
    addresses: string[];
    offences: string[];
    importantPersons: string[];
    importantOrganizations: string[];
    
    // Metadata
    processingTime: number;
    model: string;
    processedAt: string;
    
    [key: string]: any; // Extensible for future fields
}
