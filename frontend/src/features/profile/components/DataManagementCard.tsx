import * as React from 'react'
import type { UserProfile } from '@/lib/types/user'
import { Card } from '@/components/common/Card'
import { downloadStringAsFile } from '@/lib/utils/download'

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, actionText }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-md border border-[var(--color-border)] bg-[#121212] p-6 shadow-2xl">
        <h3 className="mb-2 text-xl font-medium text-white">{title}</h3>
        <p className="mb-6 text-sm text-[var(--color-text-secondary)]">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="rounded border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">Cancel</button>
          <button onClick={() => { onConfirm(); onClose(); }} className="rounded bg-red-900/80 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 transition-colors">{actionText}</button>
        </div>
      </div>
    </div>
  )
}

export function DataManagementCard({ user }: { user: UserProfile }) {
  const [modalState, setModalState] = React.useState<{isOpen: boolean; type: string}>({isOpen: false, type: ''})

  const handleExportData = () => {
    const data = {
      profile: user,
      documents: JSON.parse(localStorage.getItem('nyaya_document_cache') || '[]')
    }
    downloadStringAsFile(JSON.stringify(data, null, 2), `nyaya-export-${user.id}.json`)
  }

  const handleDownloadSettings = () => {
    downloadStringAsFile(JSON.stringify(user, null, 2), `nyaya-settings-${user.id}.json`)
  }

  const handleClearCache = () => {
    // We only clear the document cache, preserving the profile
    localStorage.removeItem('nyaya_document_cache')
    alert('Local document cache cleared.')
    window.location.reload()
  }

  const handleResetApp = () => {
    // Clear all nyaya keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('nyaya_')) {
        localStorage.removeItem(key)
      }
    }
    alert('Application reset. Reloading...')
    window.location.reload()
  }

  const openModal = (type: string) => setModalState({ isOpen: true, type })
  const closeModal = () => setModalState({ isOpen: false, type: '' })

  return (
    <section>
      <h2 className="mb-5 font-heading text-[18px] font-medium text-[var(--color-ivory)]">Data Management</h2>
      <Card className="p-[26px]">
        <div className="flex flex-col gap-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-[var(--color-border)] pb-6">
            <button onClick={handleExportData} className="flex flex-col items-start gap-1 p-4 bg-black/20 border border-[var(--color-border)] rounded hover:border-[var(--color-gold)] transition-colors text-left">
              <span className="text-sm font-medium text-white">Export My Data</span>
              <span className="text-xs text-[var(--color-text-secondary)]">Download all profile and document data as JSON.</span>
            </button>
            <button onClick={handleDownloadSettings} className="flex flex-col items-start gap-1 p-4 bg-black/20 border border-[var(--color-border)] rounded hover:border-[var(--color-gold)] transition-colors text-left">
              <span className="text-sm font-medium text-white">Download Settings</span>
              <span className="text-xs text-[var(--color-text-secondary)]">Export only your application preferences.</span>
            </button>
          </div>

          <div className="pt-2">
            <h3 className="font-mono text-[12px] uppercase text-[#E08B96] mb-4">Danger Zone</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-4 bg-red-950/10 border border-red-900/30 rounded">
                <div>
                  <div className="text-sm font-medium text-red-200">Clear Local Cache</div>
                  <div className="text-xs text-red-400/70">Remove cached document processing data. Preserves settings.</div>
                </div>
                <button onClick={() => openModal('cache')} className="px-3 py-1.5 text-xs bg-red-900/20 text-red-300 border border-red-900/50 rounded hover:bg-red-900/40">Clear Cache</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-950/20 border border-red-900/40 rounded">
                <div>
                  <div className="text-sm font-medium text-red-200">Delete All Documents</div>
                  <div className="text-xs text-red-400/70">Remove all analyzed documents and history. Preserves settings.</div>
                </div>
                <button onClick={() => openModal('cache')} className="px-3 py-1.5 text-xs bg-red-900/30 text-red-300 border border-red-900/50 rounded hover:bg-red-900/50">Delete Docs</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-950/30 border border-red-900/60 rounded">
                <div>
                  <div className="text-sm font-medium text-red-300">Reset Application</div>
                  <div className="text-xs text-red-400/80">Restore the application to its initial state. This cannot be undone.</div>
                </div>
                <button onClick={() => openModal('reset')} className="px-4 py-2 text-xs bg-red-900 text-white font-medium rounded hover:bg-red-800 shadow-[0_0_10px_rgba(220,38,38,0.2)]">Reset App</button>
              </div>
            </div>
          </div>
          
        </div>
      </Card>

      <ConfirmModal 
        isOpen={modalState.isOpen && modalState.type === 'cache'} 
        onClose={closeModal} 
        onConfirm={handleClearCache} 
        title="Clear Documents & Cache?" 
        message="This will remove all processed documents and history from your local storage. You will need to upload your documents again to analyze them. Your profile preferences will remain unchanged." 
        actionText="Clear Documents" 
      />

      <ConfirmModal 
        isOpen={modalState.isOpen && modalState.type === 'reset'} 
        onClose={closeModal} 
        onConfirm={handleResetApp} 
        title="Reset Application?" 
        message="Are you completely sure? This will delete all your settings, profile data, documents, and chat history. You will be logged out and returned to the default state." 
        actionText="Yes, Reset Everything" 
      />
    </section>
  )
}
