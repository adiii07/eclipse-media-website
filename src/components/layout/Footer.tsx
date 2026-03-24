import { Instagram } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { Separator } from '@/components/ui/separator';

/**
 * Minimal footer component with social links and copyright
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-light tracking-wide">
            © {currentYear} {photographerInfo.name}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {photographerInfo.socialLinks.instagram && (
              <a
                href={photographerInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
