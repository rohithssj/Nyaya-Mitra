export const SUPPORTED_DOCUMENT_TYPES = [
    'FIR',
    'Chargesheet',
    'Court Summons',
    'Court Notice',
    'Legal Notice',
    'Bail Order',
    'Arrest Memo',
    'Charge Memo',
    'Affidavit',
    'Warrant',
    'Unknown'
] as const;

export type SupportedDocumentType = typeof SUPPORTED_DOCUMENT_TYPES[number];
