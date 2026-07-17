export const mockUser = {
  id: 'u_12345',
  name: 'Vikram Singh',
  email: 'vikram.singh@example.com',
  language: 'English',
  theme: 'Dark',
  notifications: true,
  avatar: 'V'
};

export const mockHistory = [
  {
    id: 'doc_9982',
    name: 'State vs. Sharma (FIR)',
    type: 'FIR',
    date: '2026-07-15T10:30:00Z',
    status: 'Analyzed',
    jurisdiction: 'Hyderabad'
  },
  {
    id: 'doc_9983',
    name: 'Notice under Sec 41A CrPC',
    type: 'Legal Notice',
    date: '2026-07-12T14:15:00Z',
    status: 'Analyzed',
    jurisdiction: 'Delhi'
  }
];

export const mockDocumentResults = {
  'mock-doc-123': {
    title: 'Your FIR, explained',
    meta: 'Uploaded today · Section 41A, CrPC',
    tags: [
      { text: 'Bailable · your right', type: 'gold' },
      { text: 'Chargesheet due · 60 days', type: 'maroon' },
      { text: 'Court: Metropolitan Magistrate, Hyderabad', type: 'muted' }
    ],
    summary: 'This FIR has been filed against you under a section of the law that allows bail as a right — the police cannot keep you in custody without producing you before a magistrate within 24 hours. The investigating officer has 60 days to file a chargesheet. Until then, you can apply for bail directly; you do not need to wait for the case to proceed further.',
    questions: [
      'What happens if I miss the deadline?',
      'Can I apply for bail myself?',
      'What does Section 41A mean?'
    ],
    facts: [
      { label: 'Bail status', value: 'Bailable', type: 'gold' },
      { label: 'Chargesheet deadline', value: 'Mar 4', type: 'maroon' },
      { label: 'Investigating officer', value: 'SI R. Kumar', type: 'muted' },
      { label: 'Jurisdiction', value: 'Hyderabad', type: 'muted' }
    ]
  }
};

export const mockDraft = {
  'mock-doc-123': {
    court: 'IN THE COURT OF THE METROPOLITAN MAGISTRATE',
    location: 'Hyderabad',
    applicant: '[Applicant Name]',
    firNumber: '[FIR Number]',
    section: 'Section 41A CrPC',
    date: '[Date]'
  }
};
