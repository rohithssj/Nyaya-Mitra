import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'

import { AboutPage } from './features/landing/pages/AboutPage'
import { UploadPage } from './features/upload/pages/UploadPage'
import { ProcessingPage } from './features/processing/pages/ProcessingPage'
import { ResultsPage } from './features/results/pages/ResultsPage'
import { DraftPage } from './features/draft/pages/DraftPage'
import { HowItWorksPage } from './features/landing/pages/HowItWorksPage'
import { HistoryPage } from './features/history/pages/HistoryPage'
import { ProfilePage } from './features/profile/pages/ProfilePage'

// Pages
const Home = () => <UploadPage />
const About = () => <AboutPage />
const HowItWorks = () => <HowItWorksPage />
const Upload = () => <UploadPage />
const Processing = () => <ProcessingPage />
const Results = () => <ResultsPage />
const Draft = () => <DraftPage />
const History = () => <HistoryPage />
const Profile = () => <ProfilePage />
// Placeholder Pages
const NotFound = () => <div className="flex h-full flex-col items-center justify-center p-10"><h1 className="mb-4 text-6xl font-heading text-[var(--color-primary)]">404</h1><p className="text-[var(--color-text-secondary)]">Page not found</p></div>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/results/:documentId" element={<Results />} />
          <Route path="/draft/:documentId" element={<Draft />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
