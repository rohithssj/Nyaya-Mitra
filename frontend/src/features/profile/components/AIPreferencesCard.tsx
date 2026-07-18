import type { UserProfile } from '@/lib/types/user'
import { Card } from '@/components/common/Card'
import { useAutoSaveToast } from './LanguageRegionCard'

export function AIPreferencesCard({ user, updateProfile }: { user: UserProfile; updateProfile: (u: Partial<UserProfile>) => void }) {
  const { triggerToast, Toast } = useAutoSaveToast()

  const handleChange = (key: keyof UserProfile, value: any) => {
    updateProfile({ [key]: value })
    triggerToast()
  }

  return (
    <section className="relative">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-heading text-[18px] font-medium text-[var(--color-ivory)]">AI Preferences</h2>
        <Toast />
      </div>
      <Card className="p-[26px]">
        <div className="flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--color-border)] pb-6 gap-4">
            <div>
              <div className="mb-1 text-[14.5px] font-medium text-[var(--color-ivory)]">Preferred AI Model</div>
              <div className="text-[13px] text-[var(--color-text-secondary)]">The core model powering your legal analysis.</div>
            </div>
            <select 
              value={user.preferredAIModel} 
              onChange={(e) => handleChange('preferredAIModel', e.target.value)}
              className="w-full sm:w-[200px] bg-[#1A1A1A] border border-[var(--color-border)] text-sm text-white rounded px-3 py-2 focus:outline-none focus:border-[var(--color-gold)]"
            >
              <option value="Gemini 2.0 Flash Lite">Gemini 2.0 Flash Lite (Fast)</option>
              <option value="Gemini 1.5 Pro">Gemini 1.5 Pro (Accurate)</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--color-border)] pb-6 gap-4">
            <div>
              <div className="mb-1 text-[14.5px] font-medium text-[var(--color-ivory)]">Response Length</div>
              <div className="text-[13px] text-[var(--color-text-secondary)]">Determines verbosity of chat and rights generation.</div>
            </div>
            <div className="flex bg-black/40 border border-[var(--color-border)] rounded overflow-hidden">
              {['Short', 'Medium', 'Detailed'].map(len => (
                <button 
                  key={len}
                  onClick={() => handleChange('responseLength', len)}
                  className={`px-4 py-1.5 text-xs font-medium transition-colors ${user.responseLength === len ? 'bg-[var(--color-gold-bright)] text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-6">
            <div>
              <div className="mb-1 text-[14.5px] font-medium text-[var(--color-ivory)]">Enable AI Suggestions</div>
              <div className="text-[13px] text-[var(--color-text-secondary)]">Show suggested questions in the Chat Assistant.</div>
            </div>
            <div onClick={() => handleChange('enableAISuggestions', !user.enableAISuggestions)} className={`relative flex h-[24px] w-[44px] cursor-pointer items-center rounded-full p-1 transition-colors ${user.enableAISuggestions ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-border)]'}`}>
              <div className={`h-[16px] w-[16px] rounded-full bg-[var(--color-ivory)] transition-transform ${user.enableAISuggestions ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="mb-1 text-[14.5px] font-medium text-[var(--color-ivory)]">Show Developer Information</div>
              <div className="text-[13px] text-[var(--color-text-secondary)]">Display raw extraction scores and API logs in Results.</div>
            </div>
            <div onClick={() => handleChange('showDeveloperInfo', !user.showDeveloperInfo)} className={`relative flex h-[24px] w-[44px] cursor-pointer items-center rounded-full p-1 transition-colors ${user.showDeveloperInfo ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-border)]'}`}>
              <div className={`h-[16px] w-[16px] rounded-full bg-[var(--color-ivory)] transition-transform ${user.showDeveloperInfo ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
            </div>
          </div>

        </div>
      </Card>
    </section>
  )
}
