import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/common/Button'
import { mockUser } from '@/lib/mockData'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export function Navbar() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [user, setUser] = useLocalStorage('nyaya_user', mockUser)
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How it Works', path: '/how-it-works' },
    { name: 'History', path: '/history' },
    { name: 'Profile', path: '/profile' }
  ]

  // Close mobile menu on navigate and handle body scroll lock
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  const handleLanguageChange = (lang: string) => {
    setUser({ ...user, language: lang })
  }

  const getLangButtonClasses = (lang: string) => {
    const isActive = user.language === lang
    return `px-[13px] py-[7px] transition-all relative z-10 ${
      isActive ? 'text-[var(--color-ivory)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-ivory)]'
    }`
  }

  return (
    <header className="sticky top-0 z-[100] flex items-center justify-between border-b border-[var(--color-border)] bg-[rgba(13,13,13,0.86)] px-5 py-4 backdrop-blur-[10px] md:px-8">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-2.5 font-heading text-[19px] font-[560] text-[var(--color-ivory)]">
        <img src="/icon.jpeg" alt="Nyaya Mitra Logo" className="h-[34px] w-[34px] shrink-0 rounded-full object-cover bg-white p-0.5" />
        Nyaya Mitra
      </Link>

      {/* Center: Links (Desktop) */}
      <nav className="hidden items-center gap-9 lg:flex">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path
          return (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-[14.5px] transition-colors hover:text-[var(--color-gold-bright)] ${
                isActive ? 'text-[var(--color-gold-bright)] font-medium' : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {link.name}
            </Link>
          )
        })}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 md:gap-5">
        {/* Language Switcher */}
        <div className="relative hidden overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-[12.5px] sm:flex">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={() => handleLanguageChange('English')}
            className={getLangButtonClasses('English')}
          >
            {user.language === 'English' && (
              <motion.div layoutId="langIndicator" className="absolute inset-0 z-0 bg-[var(--color-primary)]" />
            )}
            <span className="relative z-10">EN</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={() => handleLanguageChange('Hindi')}
            className={getLangButtonClasses('Hindi')}
          >
            {user.language === 'Hindi' && (
              <motion.div layoutId="langIndicator" className="absolute inset-0 z-0 bg-[var(--color-primary)]" />
            )}
            <span className="relative z-10">हिं</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={() => handleLanguageChange('Telugu')}
            className={getLangButtonClasses('Telugu')}
          >
            {user.language === 'Telugu' && (
              <motion.div layoutId="langIndicator" className="absolute inset-0 z-0 bg-[var(--color-primary)]" />
            )}
            <span className="relative z-10">తె</span>
          </motion.button>
        </div>

        {/* Upload CTA (Persistent) */}
        <Button asChild className="hidden rounded-[3px] border border-[var(--color-primary-hover)] bg-[var(--color-primary)] px-5 py-[11px] font-sans text-[14.5px] font-medium text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-primary-hover)] md:flex">
          <Link to="/upload">Upload Document</Link>
        </Button>

        {/* Mobile Hamburger */}
        <button 
          className="relative z-[110] flex h-[36px] w-[36px] items-center justify-center lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#C9C0B4]">
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Profile Avatar Placeholder (Desktop) */}
        <Link to="/profile" className="hidden h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[14px] font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold-bright)] lg:flex">
          {user.avatar && user.avatar.length > 1 ? (
            <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            user.avatar || 'P'
          )}
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full z-[100] flex flex-col border-b border-[var(--color-border)] bg-[#0D0D0D] p-5 shadow-2xl lg:hidden"
            >
              <nav className="mb-6 flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path
                  return (
                    <Link 
                      key={link.name} 
                      to={link.path} 
                      className={`text-[16px] font-medium ${
                        isActive ? 'text-[var(--color-gold-bright)]' : 'text-[#C9C0B4]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                })}
              </nav>
              <div className="flex flex-col gap-4">
                <Button asChild className="w-full justify-center rounded-[3px] border border-[var(--color-primary-hover)] bg-[var(--color-primary)] py-3">
                  <Link to="/upload">Upload Document</Link>
                </Button>
                <Link to="/profile" className="flex items-center gap-3 border-t border-[var(--color-border)] pt-4 hover:bg-[rgba(255,255,255,0.02)] p-2 rounded-md transition-colors">
                  <div className="flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] font-medium text-[var(--color-text-secondary)]">
                    {user.avatar && user.avatar.length > 1 ? (
                      <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      user.avatar || 'P'
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-[#C9C0B4]">{user.name}</div>
                    <div className="text-[13px] text-[var(--color-text-secondary)]">View Profile</div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
