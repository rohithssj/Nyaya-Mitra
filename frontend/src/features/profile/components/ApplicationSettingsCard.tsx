import type { UserProfile } from '@/lib/types/user'
import { Card } from '@/components/common/Card'
import { useAutoSaveToast } from './LanguageRegionCard'

export function ApplicationSettingsCard({ user, updateProfile }: { user: UserProfile; updateProfile: (u: Partial<UserProfile>) => void }) {
  const { triggerToast, Toast } = useAutoSaveToast()

  const handleChange = (key: keyof UserProfile, value: any) => {
    updateProfile({ [key]: value })
    triggerToast()
  }

  return (
    <section className="relative">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-heading text-[18px] font-medium text-[var(--color-ivory)]">Application Settings</h2>
        <Toast />
      </div>
      <Card className="p-[26px]">
        <div className="flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--color-border)] pb-6 gap-4">
            <div>
              <div className="mb-1 text-[14.5px] font-medium text-[var(--color-ivory)]">Interface Theme</div>
              <div className="text-[13px] text-[var(--color-text-secondary)]">Choose your visual preference.</div>
            </div>
            <div className="flex bg-black/40 border border-[var(--color-border)] rounded overflow-hidden">
              {['Dark', 'Light', 'System'].map(t => (
                <button 
                  key={t}
                  onClick={() => handleChange('theme', t)}
                  className={`px-4 py-1.5 text-xs font-medium transition-colors ${user.theme === t ? 'bg-[var(--color-gold-bright)] text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--color-border)] pb-6 gap-4">
            <div>
              <div className="mb-1 text-[14.5px] font-medium text-[var(--color-ivory)]">Animations</div>
              <div className="text-[13px] text-[var(--color-text-secondary)]">Reduce motion for a calmer experience.</div>
            </div>
            <div className="flex bg-black/40 border border-[var(--color-border)] rounded overflow-hidden">
              {['Default', 'Reduce Motion'].map(a => (
                <button 
                  key={a}
                  onClick={() => handleChange('animations', a)}
                  className={`px-4 py-1.5 text-xs font-medium transition-colors ${user.animations === a ? 'bg-[var(--color-gold-bright)] text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-6">
            <div>
              <div className="mb-1 text-[14.5px] font-medium text-[var(--color-ivory)]">Email Notifications</div>
              <div className="text-[13px] text-[var(--color-text-secondary)]">Receive updates on your document processing.</div>
            </div>
            <div onClick={() => handleChange('notifications', !user.notifications)} className={`relative flex h-[24px] w-[44px] cursor-pointer items-center rounded-full p-1 transition-colors ${user.notifications ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-border)]'}`}>
              <div className={`h-[16px] w-[16px] rounded-full bg-[var(--color-ivory)] transition-transform ${user.notifications ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="mb-1 text-[14.5px] font-medium text-[var(--color-ivory)]">Auto-Save Profile</div>
              <div className="text-[13px] text-[var(--color-text-secondary)]">Automatically save your settings locally.</div>
            </div>
            <div onClick={() => handleChange('autoSave', !user.autoSave)} className={`relative flex h-[24px] w-[44px] cursor-pointer items-center rounded-full p-1 transition-colors ${user.autoSave ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-border)]'}`}>
              <div className={`h-[16px] w-[16px] rounded-full bg-[var(--color-ivory)] transition-transform ${user.autoSave ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
            </div>
          </div>

        </div>
      </Card>
    </section>
  )
}
