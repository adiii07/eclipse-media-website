import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ContactPanel } from './ContactPanel';
import logo from '@/assets/ECLIPSE_MEDIA2.png';

const navLinks = [
  { name: 'Our Work', targetId: 'project-showcase' },
  { name: 'About Us', targetId: 'about-section' },
];

/**
 * Main header component with scroll-aware styling
 * Transparent on hero section, solid when scrolled
 * Mobile responsive with hamburger menu
 */
export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  
  // Header is transparent only on homepage hero when not scrolled
  const isTransparent = location.pathname === '/' && !isScrolled;

  const scrollToSection = (targetId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isTransparent
            ? 'bg-transparent'
            : 'bg-background/80 border-b border-border shadow-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <motion.img
                src={logo}
                alt="Eclipse Media"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-14 w-auto"
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                  <motion.div
                    key={link.targetId}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <button
                      onClick={() => scrollToSection(link.targetId)}
                      className="relative text-lg leading-7 font-light tracking-wide text-white transition-colors duration-300 hover:text-white/80"
                    >
                      {link.name}
                    </button>
                  </motion.div>
                ))}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <button
                  onClick={() => setContactOpen(true)}
                  className="relative text-lg leading-7 font-light tracking-wide text-white transition-colors duration-300 hover:text-white/80"
                >
                  Connect
                </button>
              </motion.div>
            </nav>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center gap-2">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'size-9',
                      isTransparent && 'text-white hover:bg-white/10'
                    )}
                    aria-label="Open menu"
                  >
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-80">
                  <nav className="flex flex-col gap-6 mt-8">
                    {navLinks.map((link) => (
                      <button
                        key={link.targetId}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          scrollToSection(link.targetId);
                        }}
                        className="text-lg leading-7 font-light tracking-wide text-foreground hover:text-foreground/80 text-left"
                      >
                        {link.name}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setContactOpen(true);
                      }}
                      className="text-lg leading-7 font-light tracking-wide text-foreground hover:text-foreground/80 text-left"
                    >
                      Connect
                    </button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Contact Panel - rendered outside header for proper z-index */}
      <ContactPanel isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
