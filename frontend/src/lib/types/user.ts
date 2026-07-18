export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  memberSince: string;
  avatar: string;
  language: string;
  region: string;
  timezone: string;
  theme: 'Dark' | 'Light' | 'System';
  notifications: boolean;
  animations: 'Default' | 'Reduce Motion';
  autoSave: boolean;
  preferredAIModel: string;
  responseLength: 'Short' | 'Medium' | 'Detailed';
  enableAISuggestions: boolean;
  showDeveloperInfo: boolean;
}
