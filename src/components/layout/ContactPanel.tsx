import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Instagram } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactPanel({ isOpen, onClose }: ContactPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-[100]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-black/80 backdrop-blur-lg z-[100] border-l border-white/10"
          >
            <div className="h-full flex flex-col p-8 md:p-12">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Close contact panel"
              >
                <X className="size-6" />
              </button>

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                <h2 className="text-3xl md:text-4xl font-light tracking-wide text-white mb-2">
                  Let's Connect
                </h2>
                <p className="text-white/50 font-light text-sm tracking-wide">
                  We'd love to hear from you
                </p>
              </motion.div>

              {/* Contact Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 space-y-8"
              >
                {/* Email */}
                <a
                  href={`mailto:${photographerInfo.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <Mail className="size-5 text-white/70" />
                  </div>
                  <div>
                    <p className="text-xs font-light tracking-widest text-white/40 uppercase mb-1">
                      Email
                    </p>
                    <p className="text-white/80 font-light group-hover:text-white transition-colors">
                      {photographerInfo.email}
                    </p>
                  </div>
                </a>

                {/* Phone */}
                {photographerInfo.phone && (
                  <a
                    href={`tel:${photographerInfo.phone}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                      <Phone className="size-5 text-white/70" />
                    </div>
                    <div>
                      <p className="text-xs font-light tracking-widest text-white/40 uppercase mb-1">
                        Phone
                      </p>
                      <p className="text-white/80 font-light group-hover:text-white transition-colors">
                        {photographerInfo.phone}
                      </p>
                    </div>
                  </a>
                )}

              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pt-12"
              >
                <p className="text-xs font-light tracking-widest text-white/40 uppercase mb-4">
                  Follow Us
                </p>
                <div className="flex gap-4">
                  {photographerInfo.socialLinks?.instagram && (
                    <a
                      href={photographerInfo.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Instagram className="size-5 text-white/70" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
