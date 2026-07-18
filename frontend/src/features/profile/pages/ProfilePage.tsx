import * as React from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { mockUser } from '@/lib/mockData'
import type { UserProfile } from '@/lib/types/user'

import { ProfileCard } from '../components/ProfileCard'
import { StatisticsCard } from '../components/StatisticsCard'
import { LanguageRegionCard } from '../components/LanguageRegionCard'
import { AIPreferencesCard } from '../components/AIPreferencesCard'
import { ApplicationSettingsCard } from '../components/ApplicationSettingsCard'
import { DataManagementCard } from '../components/DataManagementCard'
import { AboutCard } from '../components/AboutCard'
import { PrivacySecurityCard } from '../components/PrivacySecurityCard'
import { SupportCard } from '../components/SupportCard'

export function ProfilePage() {
  const [user, setUser] = useLocalStorage<UserProfile>('nyaya_user', mockUser)
  const [activeTab, setActiveTab] = React.useState<'profile' | 'preferences' | 'privacy'>('profile')

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser({ ...user, ...updates })
  }

  return (
    <div className="w-full pb-[80px] pt-[40px]">
      <div className="mx-auto w-full max-w-[1000px] px-4 md:px-7">
        
        <div className="mb-8 border-b border-[var(--color-border)] pb-6">
          <div className="mb-2 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
            User Workspace
          </div>
          <h1 className="font-heading text-3xl font-[560]">Profile & Settings</h1>
        </div>

        <div className="grid grid-cols-1 gap-[40px] lg:grid-cols-[220px_1fr]">
          
          {/* Sidebar Tabs */}
          <div className="flex flex-col gap-2 font-mono text-[13.5px]">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`text-left py-2 pl-4 transition-colors ${activeTab === 'profile' ? 'border-l-[2px] border-[var(--color-gold)] bg-[rgba(184,134,11,0.08)] text-[var(--color-gold-bright)]' : 'border-l-[2px] border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-ivory)]'}`}
            >
              👤 Profile
            </button>
            <button 
              onClick={() => setActiveTab('preferences')}
              className={`text-left py-2 pl-4 transition-colors ${activeTab === 'preferences' ? 'border-l-[2px] border-[var(--color-gold)] bg-[rgba(184,134,11,0.08)] text-[var(--color-gold-bright)]' : 'border-l-[2px] border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-ivory)]'}`}
            >
              ⚙️ Preferences
            </button>
            <button 
              onClick={() => setActiveTab('privacy')}
              className={`text-left py-2 pl-4 transition-colors ${activeTab === 'privacy' ? 'border-l-[2px] border-[var(--color-gold)] bg-[rgba(184,134,11,0.08)] text-[var(--color-gold-bright)]' : 'border-l-[2px] border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-ivory)]'}`}
            >
              🛡️ Privacy & Data
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex flex-col gap-8">
            
            {activeTab === 'profile' && (
              <>
                <ProfileCard user={user} updateProfile={updateProfile} />
                <StatisticsCard />
                <AboutCard />
                <SupportCard />
              </>
            )}

            {activeTab === 'preferences' && (
              <>
                <LanguageRegionCard user={user} updateProfile={updateProfile} />
                <AIPreferencesCard user={user} updateProfile={updateProfile} />
                <ApplicationSettingsCard user={user} updateProfile={updateProfile} />
              </>
            )}

            {activeTab === 'privacy' && (
              <>
                <DataManagementCard user={user} />
                <PrivacySecurityCard />
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
