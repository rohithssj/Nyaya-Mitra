import * as React from 'react'
import type { UserProfile } from '@/lib/types/user'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { useFileUpload } from '@/hooks/useFileUpload'

export function ProfileCard({ user, updateProfile }: { user: UserProfile; updateProfile: (u: Partial<UserProfile>) => void }) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editForm, setEditForm] = React.useState({ name: user.name, email: user.email })

  const { fileInputRef, triggerUpload, onFileChange, accept } = useFileUpload({
    onSuccess: (doc) => {
      if (doc.previewUrl) updateProfile({ avatar: doc.previewUrl })
    }
  })

  const handleSave = () => {
    updateProfile(editForm)
    setIsEditing(false)
  }

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-[18px] font-medium text-[var(--color-ivory)]">Personal Information</h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="text-[13px] text-[var(--color-gold-bright)] hover:underline">Edit Profile</button>
        ) : (
          <div className="flex gap-3">
            <button onClick={() => setIsEditing(false)} className="text-[13px] text-[var(--color-text-secondary)] hover:text-white">Cancel</button>
            <button onClick={handleSave} className="text-[13px] font-medium text-[var(--color-gold-bright)] hover:underline">Save</button>
          </div>
        )}
      </div>
      <Card className="p-[26px]">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-gold)] bg-[rgba(184,134,11,0.1)] text-[28px] font-medium text-[var(--color-gold-bright)]">
            {user.avatar.length > 2 ? <img src={user.avatar} alt="Avatar" className="h-full w-full object-cover" /> : user.avatar}
          </div>
          <div>
            <div className="text-lg font-bold text-white">{user.name}</div>
            <div className="text-sm text-[var(--color-text-secondary)] mb-2">{user.role} • Member since {user.memberSince} • ID: {user.id}</div>
            
            <input type="file" ref={fileInputRef} onChange={onFileChange} accept={accept} className="hidden" />
            <Button onClick={triggerUpload} variant="ghost" className="rounded border border-[var(--color-line)] px-3 py-1.5 text-xs text-white">Change Avatar</Button>
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
              className={`rounded-[3px] border px-4 py-[10px] font-sans text-[14px] text-[var(--color-ivory)] outline-none ${isEditing ? 'border-[var(--color-gold)] bg-black/40' : 'border-[var(--color-border)] bg-transparent'}`} 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[12px] uppercase text-[var(--color-text-secondary)]">Email Address</label>
            <input 
              type="email" 
              readOnly={!isEditing} 
              value={isEditing ? editForm.email : user.email} 
              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
              className={`rounded-[3px] border px-4 py-[10px] font-sans text-[14px] text-[var(--color-ivory)] outline-none ${isEditing ? 'border-[var(--color-gold)] bg-black/40' : 'border-[var(--color-border)] bg-transparent'}`} 
            />
          </div>
        </div>
      </Card>
    </section>
  )
}
