import * as React from 'react'
import type { UserProfile } from '@/lib/types/user'
import { Card } from '@/components/common/Card'
import { motion, AnimatePresence } from 'framer-motion'

export function useAutoSaveToast() {
  const [showToast, setShowToast] = React.useState(false)

  const triggerToast = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const Toast = () => (
    <AnimatePresence>
      {showToast && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute right-0 top-0 text-xs text-[var(--color-gold-bright)] flex items-center gap-1 bg-black/40 px-2 py-1 rounded"
        >
          ✓ Preferences saved
        </motion.div>
      )}
    </AnimatePresence>
  )

  return { triggerToast, Toast }
}

export function LanguageRegionCard({ user, updateProfile }: { user: UserProfile; updateProfile: (u: Partial<UserProfile>) => void }) {
  const { triggerToast, Toast } = useAutoSaveToast()

  const handleChange = (key: keyof UserProfile, value: any) => {
    updateProfile({ [key]: value })
    triggerToast()
  }

  return (
    <section className="relative">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-heading text-[18px] font-medium text-[var(--color-ivory)]">Language & Region</h2>
        <Toast />
      </div>
      <Card className="p-[26px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[12px] uppercase text-[var(--color-text-secondary)]">Language</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="language" checked={user.language === 'English'} onChange={() => handleChange('language', 'English')} className="accent-[var(--color-gold-bright)]" />
                <span className="text-sm text-white">English</span>
              </label>
              <label className="flex items-center gap-3 cursor-not-allowed opacity-50">
                <input type="radio" name="language" disabled checked={false} className="accent-[var(--color-gold-bright)]" />
                <span className="text-sm text-white">Hindi</span>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">Coming Soon</span>
              </label>
              <label className="flex items-center gap-3 cursor-not-allowed opacity-50">
                <input type="radio" name="language" disabled checked={false} className="accent-[var(--color-gold-bright)]" />
                <span className="text-sm text-white">Telugu</span>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">Coming Soon</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[12px] uppercase text-[var(--color-text-secondary)]">Region & Timezone</h3>
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-[13px] text-gray-400 mb-1">Country</div>
                <select 
                  value={user.region} 
                  onChange={(e) => handleChange('region', e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[var(--color-border)] text-sm text-white rounded px-3 py-2 focus:outline-none focus:border-[var(--color-gold)]"
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>
              <div>
                <div className="text-[13px] text-gray-400 mb-1">Timezone</div>
                <select 
                  value={user.timezone} 
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[var(--color-border)] text-sm text-white rounded px-3 py-2 focus:outline-none focus:border-[var(--color-gold)]"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </Card>
    </section>
  )
}
