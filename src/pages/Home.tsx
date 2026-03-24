import { useState, type SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { SEOHead } from '@/components/seo/SEOHead';
import eclipseHeroBg from '@/assets/eclipse-hero.png';

// Placeholder project data
const artistProjects = [{
  id: 'artist-1',
  title: 'Madhuram Gothalwal - Kismat',
  description: 'Music video for Kismat by Madhuram Gothalwal - full creative and production',
  videoUrl: '/videos/artists/kismat.mp4',
  projectUrl: 'https://www.youtube.com/watch?v=iaNPe3Q0Xa0',
  poster: '/thumbnails/kismat_cover.png'
}, {
  id: 'artist-2',
  title: 'Divyam Sodhi X Khwaab - Ehsaas',
  description: 'An intimate concert film capturing Divyam Sodhi X Khwaab live',
  videoUrl: '/videos/artists/ehsaas.mp4',
  projectUrl: 'https://www.instagram.com/p/DUvhxpKierg/',
  poster: '/thumbnails/ehsaas_thumbnail.jpg'
}, {
  id: 'artist-3',
  title: 'Thaikkudam Bridge - Navarasam',
  description: 'High-octane visuals for Thaikkudam Bridge fusing Navarasam with raw live energy',
  videoUrl: '/videos/artists/navarasam.mp4',
  projectUrl: 'https://www.instagram.com/p/DOgQLdFkrqe/',
  poster: ''
}, {
  id: 'artist-4',
  title: 'Shefali Alvares',
  description: 'A documentary concert film exploring Shefali Alvares on and off stage"',
  videoUrl: '/videos/artists/shefali.mp4',
  projectUrl: 'https://www.instagram.com/p/DPB3KwFDala/',
  poster: '/thumbnails/shefali_thumbnail.jpg',
}, {
  id: 'artist-5',
  title: 'Thaikkudam Bridge',
  description: 'A concert film celebrating Thaikkudam Bridge through the voices of their fans',
  videoUrl: '/videos/artists/thaikkudam_reel.mp4',
  projectUrl: 'https://www.instagram.com/p/DOJDQsoEgf6/',
  poster: ''
}, {
  id: 'artist-6',
  title: 'Pho',
  description: 'A feel-good concert film capturing Pho live',
  videoUrl: '/videos/artists/pho.mp4',
  projectUrl: 'https://www.instagram.com/p/DLz1p9pT3P1/',
  poster: '/thumbnails/pho_thumbnail.jpg'
}];
const brandProjects = [{
  id: 'brand-1',
  title: 'Levels - Campaign',
  description: 'A nostalgic tribute to football',
  videoUrl: '/videos/brands/levels.mp4',
  projectUrl: '/videos/brands/levels.mp4',
  poster: '/thumbnails/levels_thumbnail.png'
}, ];

const galleryImageModules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const galleryImages = Object.entries(galleryImageModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, {
    numeric: true,
    sensitivity: 'base'
  }))
  .map(([, imageUrl]) => imageUrl);

function GalleryGridItem({ imageSrc, index }: { imageSrc: string; index: number }) {
  const [isLandscape, setIsLandscape] = useState<boolean | null>(null);

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    if (w <= 0 || h <= 0) return;
    setIsLandscape(w / h > 1.08);
  };

  const spanClass = isLandscape === true ? 'sm:col-span-2' : 'sm:col-span-1';

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-lg bg-white/5 ${spanClass}`}
      initial={{
        opacity: 0,
        scale: 0.9
      }}
      whileInView={{
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.03
      }}
      viewport={{
        once: true,
        amount: 0.1
      }}
      whileHover={{
        scale: 1.02
      }}
    >
      <img
        src={imageSrc}
        alt={`Gallery photo ${index + 1}`}
        className="block w-full h-auto object-contain"
        loading="lazy"
        onLoad={handleImageLoad}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}

/**
 * Homepage with hero section and toggleable project showcases
 */
export default function Home() {
  const [activeSection, setActiveSection] = useState<'artists' | 'brands'>('artists');
  const projects = activeSection === 'artists' ? artistProjects : brandProjects;
  const scrollToProjects = () => {
    document.getElementById('project-showcase')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleSectionChange = (section: 'artists' | 'brands') => {
    setActiveSection(section);
    scrollToProjects();
  };
  return <>
      <SEOHead />
      
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative h-screen w-full flex flex-col items-center justify-center px-6">
          {/* Eclipse background image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img src={eclipseHeroBg} alt="" className="w-[500px] md:w-[600px] lg:w-[700px] opacity-40 select-none" draggable={false} />
          </div>
          {/* Hero Content */}
          <motion.div className="text-center space-y-8 max-w-4xl" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1,
          ease: "easeOut"
        }}>
            <motion.h1 className="font-extralight text-[#a5cdcf] text-left leading-[1.05]" style={{
            fontFamily: 'Maleah, sans-serif'
          }} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 1,
            delay: 0.2
          }}>
              <span className="block text-6xl md:text-8xl lg:text-9xl tracking-[0.08em]">ECLIPSE</span>
              <span className="block text-5xl md:text-7xl lg:text-8xl tracking-[0.08em]">MEDIA</span>
            </motion.h1>
            
            <motion.p className="text-xl md:text-2xl font-light tracking-widest text-white/90" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 1,
            delay: 0.4
          }}>
              {photographerInfo.tagline}
            </motion.p>
          </motion.div>

          {/* Toggle Slider - Positioned at bottom */}
          <motion.div className="absolute bottom-24 md:bottom-28 flex flex-col items-center justify-center gap-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1,
          delay: 0.6
        }}>
            <div className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
              {/* Sliding background indicator */}
              <motion.div className="absolute h-[calc(100%-8px)] bg-white rounded-full" initial={false} animate={{
              x: activeSection === 'artists' ? 4 : '100%',
              width: activeSection === 'artists' ? 'calc(50% - 4px)' : 'calc(50% - 4px)'
            }} transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }} />
              <button onClick={() => handleSectionChange('artists')} className={`relative z-10 px-6 md:px-8 py-2.5 text-xs md:text-sm font-light tracking-widest uppercase transition-colors duration-300 ${activeSection === 'artists' ? 'text-black' : 'text-white/70 hover:text-white'}`}>
                For Artists
              </button>
              <button onClick={() => handleSectionChange('brands')} className={`relative z-10 px-6 md:px-8 py-2.5 text-xs md:text-sm font-light tracking-widest uppercase transition-colors duration-300 ${activeSection === 'brands' ? 'text-black' : 'text-white/70 hover:text-white'}`}>
                For Brands
              </button>
            </div>
            
            {/* Tagline below toggle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeSection}
                className="text-xl md:text-2xl lg:text-3xl font-extralight tracking-wide text-white/90 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {activeSection === 'artists' ? 'Stories of artists, captured.' : 'Where brands become stories.'}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Project Showcase Section */}
        <section id="project-showcase" className="bg-black">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection} initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} transition={{
            duration: 0.5
          }}>
              {/* For Brands Services Section */}
              {activeSection === 'brands' && <motion.div className="py-12 md:py-16 flex flex-col items-center justify-center px-6 text-center" initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8
            }}>
                  <div className="space-y-3">
                    <h3 className="text-base md:text-lg font-light tracking-widest text-white/60 uppercase mb-4">
                      Our Services
                    </h3>
                    <ul className="space-y-2 text-lg md:text-xl font-light text-white/90">
                      <li>Brand Films</li>
                      <li>Campaign Shoots</li>
                      <li>Event Coverage</li>
                    </ul>
                  </div>
                </motion.div>}
              {projects.map((project, index) => <div key={project.id} className="relative w-full h-screen">
                  {/* Video Background */}
                  <video autoPlay muted loop playsInline preload="metadata" poster={project.poster} className="absolute inset-0 w-full h-full object-cover">
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
                  
                  {/* Project Text Overlay */}
                  <motion.div className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:pb-32 px-6" initial={{
                opacity: 0,
                y: 40
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.8,
                delay: 0.2
              }} viewport={{
                once: true,
                amount: 0.5
              }}>
                    <div className="text-center max-w-3xl space-y-4">
                      
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-white">
                        <a
                          href={project.projectUrl || project.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#a5cdcf] transition-colors duration-300 underline-offset-8 hover:underline"
                        >
                          {project.title}
                        </a>
                      </h2>
                      <p className="text-base md:text-lg font-light text-white/80 max-w-xl mx-auto">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                </div>)}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Photo Gallery Section */}
        <section id="photo-gallery" className="bg-black py-16 md:py-24 px-6">
          <motion.div className="max-w-7xl mx-auto" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true,
          amount: 0.1
        }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wide text-white mb-12 text-center">
              Our Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 [grid-auto-rows:auto] grid-flow-dense">
              {galleryImages.map((imageSrc, i) => (
                <GalleryGridItem key={imageSrc} imageSrc={imageSrc} index={i} />
              ))}
            </div>
            {galleryImages.length === 0 && <p className="mt-6 text-center text-white/60">
                {/* Add photos to <code>src/assets/gallery</code> to show them here automatically. */}
              </p>}
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about-section" className="bg-black min-h-screen flex items-center justify-center px-6">
          <motion.div className="max-w-4xl mx-auto text-center" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true,
          amount: 0.3
        }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wide text-white mb-8">
              About Us
            </h2>
            <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed mb-8">
              {photographerInfo.biography}
            </p>
            {/* <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base font-light text-white/60">
              {photographerInfo.clients.map(client => <span key={client} className="px-4 py-2 border border-white/20 rounded-full">
                  {client}
                </span>)}
            </div> */}
          </motion.div>
        </section>
      </div>
    </>;
}