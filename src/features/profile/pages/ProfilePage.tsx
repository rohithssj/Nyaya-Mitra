import * as React from 'react'
import { mockUser, mockHistory } from '@/lib/mockData'
import { Button } from '@/components/common/Button'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useFileUpload } from '@/hooks/useFileUpload'

export function ProfilePage() {
  const [user, setUser] = useLocalStorage('nyaya_user', mockUser)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editForm, setEditForm] = React.useState({ name: user.name, email: user.email, language: user.language })
  const [recentActivity] = React.useState(mockHistory.slice(0, 2))

  const { fileInputRef, triggerUpload, onFileChange, accept } = useFileUpload({
    onSuccess: (doc) => {
      if (doc.previewUrl) setUser({ ...user, avatar: doc.previewUrl })
    }
  })

  const toggleNotifications = () => {
    setUser({ ...user, notifications: !user.notifications })
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({ ...user, language: e.target.value })
  }

  const handleSaveProfile = () => {
    setUser({ ...user, name: editForm.name, email: editForm.email })
    setIsEditing(false)
  }

  return (
    <div className="w-full pb-[80px] pt-[40px]">
      <div className="mx-auto w-full max-w-[860px] px-7">
        <div className="mb-8 border-b border-[var(--color-border)] pb-6">
          <div className="mb-2 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-gold-bright)] before:h-px before:w-[14px] before:bg-[var(--color-gold-bright)]">
            Account Management
          </div>
          <h1 className="font-heading text-3xl font-[560]">Profile Settings</h1>
        </div>

        <div className="grid grid-cols-1 gap-[40px] md:grid-cols-[1fr_2.5fr]">
          {/* Sidebar Nav */}
          <div className="flex flex-col gap-2 font-mono text-[13.5px]">
            <span className="cursor-pointer border-l-[2px] border-[var(--color-gold)] bg-[rgba(184,134,11,0.08)] py-2 pl-4 text-[var(--color-gold-bright)]">General Info</span>
            <span className="cursor-pointer border-l-[2px] border-transparent py-2 pl-4 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-ivory)]">Preferences</span>
            <span className="cursor-pointer border-l-[2px] border-transparent py-2 pl-4 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-ivory)]">Security</span>
            <span className="mt-4 cursor-pointer border-l-[2px] border-transparent py-2 pl-4 text-[#E08B96] transition-colors hover:text-[var(--color-maroon-bright)]">Log Out</span>
          </div>

          <div className="flex flex-col gap-[40px]">
            {/* Profile Section */}
            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-heading text-[18px] font-medium text-[var(--color-ivory)]">Personal Information</h2>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="text-[13px] text-[var(--color-gold-bright)] hover:underline">Edit Profile</button>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={() => setIsEditing(false)} className="text-[13px] text-[var(--color-text-secondary)] hover:text-white">Cancel</button>
                    <button onClick={handleSaveProfile} className="text-[13px] font-medium text-[var(--color-gold-bright)] hover:underline">Save</button>
                  </div>
                )}
              </div>
              <div className="rounded-[4px] border border-[var(--color-border)] bg-[var(--color-surface)] p-[26px]">
                <div className="mb-8 flex items-center gap-5">
                  <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-line)] bg-[var(--color-bg-elevated)] text-[24px] font-medium text-[var(--color-text-secondary)]">
                    {user.avatar.length > 1 ? <img src={user.avatar} alt="Avatar" className="h-full w-full object-cover" /> : user.avatar}
                  </div>
                  <div>
                    <input type="file" ref={fileInputRef} onChange={onFileChange} accept={accept} className="hidden" />
                    <Button onClick={triggerUpload} variant="ghost" className="mb-2 rounded-[3px] border border-[var(--color-line)] px-4 py-2 text-[13px]">Change Avatar</Button>
                    <div className="text-[12.5px] text-[var(--color-text-secondary)]">JPG, GIF or PNG. Max size of 800K.</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[12px] uppercase text-[var(--color-text-secondary)]">Full Name</label>
                    <input 
                      type="text" 
                      readOnly={!isEditing} 
                      value={isEditing ? editForm.name : user.name} 
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className={`rounded-[3px] border px-4 py-[10px] font-sans text-[14px] text-[var(--color-ivory)] outline-none ${isEditing ? 'border-[var(--color-gold)] bg-[var(--color-background)]' : 'border-[var(--color-border)] bg-[var(--color-bg-elevated)] focus:border-[var(--color-gold)]'}`} 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[12px] uppercase text-[var(--color-text-secondary)]">Email Address</label>
                    <input 
                      type="email" 
                      readOnly={!isEditing} 
                      value={isEditing ? editForm.email : user.email} 
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className={`rounded-[3px] border px-4 py-[10px] font-sans text-[14px] text-[var(--color-ivory)] outline-none ${isEditing ? 'border-[var(--color-gold)] bg-[var(--color-background)]' : 'border-[var(--color-border)] bg-[var(--color-bg-elevated)] focus:border-[var(--color-gold)]'}`} 
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section>
              <h2 className="mb-5 font-heading text-[18px] font-medium text-[var(--color-ivory)]">Preferences</h2>
              <div className="rounded-[4px] border border-[var(--color-border)] bg-[var(--color-surface)] p-[26px]">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-6">
                    <div>
                      <div className="mb-1 text-[14.5px] font-medium text-[var(--color-ivory)]">Preferred Language</div>
                      <div className="text-[13px] text-[var(--color-text-secondary)]">Determines the language of your legal summaries.</div>
                    </div>
                    <select value={user.language} onChange={handleLanguageChange} className="rounded-[3px] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2 text-[13.5px] text-[var(--color-ivory)] outline-none focus:border-[var(--color-gold)]">
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Telugu">Telugu</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="mb-1 text-[14.5px] font-medium text-[var(--color-ivory)]">Email Notifications</div>
                      <div className="text-[13px] text-[var(--color-text-secondary)]">Receive updates on your document processing.</div>
                    </div>
                    <div onClick={toggleNotifications} className={`relative flex h-[24px] w-[44px] cursor-pointer items-center rounded-full p-1 transition-colors ${user.notifications ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-border)]'}`}>
                      <div className={`h-[16px] w-[16px] rounded-full bg-[var(--color-ivory)] transition-transform ${user.notifications ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="mb-5 font-heading text-[18px] font-medium text-[var(--color-ivory)]">Recent Activity</h2>
              <div className="rounded-[4px] border border-[var(--color-border)] bg-[var(--color-surface)] p-[26px]">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id} className={`flex items-center justify-between py-4 ${index !== recentActivity.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-primary-hover)] bg-[rgba(122,31,43,0.16)] text-[var(--color-gold-bright)]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-[14.5px] font-medium text-[var(--color-ivory)]">Analyzed: {activity.name}</div>
                        <div className="font-mono text-[12px] text-[var(--color-text-secondary)]">{new Date(activity.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <Link to={`/results/${activity.id}`} className="font-mono text-[12px] text-[var(--color-gold-bright)] transition-colors hover:text-[var(--color-ivory)]">
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
