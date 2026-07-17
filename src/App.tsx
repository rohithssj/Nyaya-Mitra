import * as React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'

import { AboutPage } from './features/landing/pages/AboutPage'
import { UploadPage } from './features/upload/pages/UploadPage'
import { ProcessingPage } from './features/processing/pages/ProcessingPage'
import { ResultsPage } from './features/results/pages/ResultsPage'
import { DraftPage } from './features/draft/pages/DraftPage'

// Pages
const Landing = () => <AboutPage />
const Upload = () => <UploadPage />
const Processing = () => <ProcessingPage />
const Results = () => <ResultsPage />
const Draft = () => <DraftPage />
// Placeholder Pages
const History = () => <div className="flex h-full items-center justify-center p-10"><h1 className="text-3xl font-heading">History Page</h1></div>
const Settings = () => <div className="flex h-full items-center justify-center p-10"><h1 className="text-3xl font-heading">Settings Page</h1></div>
const NotFound = () => <div className="flex h-full flex-col items-center justify-center p-10"><h1 className="mb-4 text-6xl font-heading text-[var(--color-primary)]">404</h1><p className="text-[var(--color-text-secondary)]">Page not found</p></div>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<Landing />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/results/:documentId" element={<Results />} />
          <Route path="/draft/:documentId" element={<Draft />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
