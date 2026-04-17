/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Camera, Instagram, Mail, X, ChevronRight, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Photo {
  id: number;
  category: string;
  title: string;
  url: string;
}

// --- Constants ---
const PHOTOS: Photo[] = [
  { id: 1, category: '建筑', title: '现代构筑', url: '/摄影作品/1f0da5756eca3dea18b011a213847a55.jpg' },
  { id: 2, category: '自然', title: '森之语', url: '/摄影作品/214186f764a000a2435bb4f4f3a29fda.jpg' },
  { id: 3, category: '人文', title: '城中叙事', url: '/摄影作品/30c5e6fbe23164c21d9109b873137e39.jpg' },
  { id: 4, category: '建筑', title: '几何律动', url: '/摄影作品/3c61392fdb8f6b068c88dae7e78cde6e.jpg' },
  { id: 5, category: '自然', title: '微光瞬间', url: '/摄影作品/42775ddc5f5251076533d41da655ea0f.jpg' },
  { id: 6, category: '人文', title: '街角日常', url: '/摄影作品/6423603aaf1e09367285856a3c618878.jpg' },
  { id: 7, category: '建筑', title: '极简主义', url: '/摄影作品/66a8b3989b8c32204ca6890cfc116aff.jpg' },
  { id: 8, category: '自然', title: '远山', url: '/摄影作品/78d83b60bc03ed0662e3e0ed005740e0.jpg' },
  { id: 9, category: '人文', title: '时光印记', url: '/摄影作品/7b3cb80395803c663fba84b195bff78c.jpg' },
  { id: 10, category: '建筑', title: '都市脊梁', url: '/摄影作品/89c15a96b4c74db3a0976bfc448604bc.jpg' },
  { id: 11, category: '自然', title: '碧水青空', url: '/摄影作品/8eb2fce9ce9a5fcb1d934bce3623622b.jpg' },
  { id: 12, category: '人文', title: '群生相', url: '/摄影作品/99b3353702ec034b444bd861ccffaef8.jpg' },
  { id: 13, category: '建筑', title: '光影交织', url: '/摄影作品/9e8b84dd2cb0d2806795c51e00a4e6ad.jpg' },
  { id: 14, category: '自然', title: '原野呼唤', url: '/摄影作品/b6bf0470af2e19f442285c3c402aa6f9.jpg' },
  { id: 15, category: '人文', title: '烟火气', url: '/摄影作品/b8415dd631bf9633e7f78007cba06f63.jpg' },
  { id: 16, category: '建筑', title: '悬浮空间', url: '/摄影作品/ce00528765fcf5dc2a51f81bda077eab.jpg' },
  { id: 17, category: '自然', title: '破晓', url: '/摄影作品/ce062d646a59988ac91e297e6a5ccd16.jpg' },
  { id: 18, category: '人文', title: '独行者', url: '/摄影作品/e8cd2e96288a3fb05b0a3635d553b1b7.jpg' },
];

const CATEGORIES = ['全部', '建筑', '自然', '人文'];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const filteredPhotos = activeCategory === '全部' 
    ? PHOTOS 
    : PHOTOS.filter(p => p.category === activeCategory);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-950 selection:text-white transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/80 backdrop-blur-xl py-4 border-b border-zinc-100' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl font-light tracking-tighter uppercase whitespace-nowrap">Studio.Wu</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-12 text-[11px] uppercase tracking-[0.25em] font-medium">
            <a href="#works" className="hover:text-zinc-400 transition-colors">作品</a>
            <a href="#about" className="hover:text-zinc-400 transition-colors">关于</a>
            <a href="#contact" className="hover:text-zinc-400 transition-colors">联系</a>
          </div>

          <button 
            className="md:hidden p-2 hover:bg-zinc-50 rounded-full transition-colors" 
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* 2. Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center gap-12 text-3xl uppercase tracking-[0.2em] font-light"
          >
            <motion.button 
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              className="absolute top-8 right-6 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </motion.button>
            <motion.a 
              href="#works" 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsMenuOpen(false)}
            >
              作品集
            </motion.a>
            <motion.a 
              href="#about" 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
            >
              关于我
            </motion.a>
            <motion.a 
              href="#contact" 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            >
              联系方式
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Hero Section */}
      <header className="pt-48 pb-24 px-6 max-w-7xl mx-auto border-b border-zinc-50">
        <motion.h1 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-9xl font-light tracking-tight leading-[0.9] mb-12"
        >
          通过镜头<br />
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="italic font-serif"
          >
            捕捉
          </motion.span> 那些被忽视的瞬间
        </motion.h1>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap gap-8 md:gap-14 text-[10px] uppercase tracking-[0.3em] font-medium"
        >
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`pb-3 transition-colors relative group ${activeCategory === cat ? 'text-zinc-950' : 'text-zinc-400 hover:text-zinc-600'}`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-zinc-950" 
                />
              )}
            </button>
          ))}
        </motion.div>
      </header>

      {/* 4. Gallery Grid */}
      <main id="works" className="max-w-7xl mx-auto px-6 py-24">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div 
                layout
                key={photo.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative group cursor-zoom-in overflow-hidden bg-zinc-100 break-inside-avoid rounded-sm shadow-sm hover:shadow-2xl transition-all duration-700"
                onClick={() => setSelectedImage(photo)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
                  <p className="text-white text-[9px] uppercase tracking-[0.4em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{photo.category}</p>
                  <h3 className="text-white text-2xl font-light tracking-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{photo.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* 5. About Section */}
      <section id="about" className="bg-zinc-50/50 py-48 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl rounded-sm bg-zinc-100"
          >
            <img 
              src="/wu-zexiao.jpg" 
              alt="Wu Zexiao" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top scale-110 hover:scale-100 transition-transform duration-[2s]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('unsplash')) {
                  target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000';
                }
              }}
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-12"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">我是吴泽枭，一名专注于光影与构图的 <span className="italic font-serif">独立摄影师</span>。</h2>
            <p className="text-zinc-500 leading-relaxed text-xl font-light">
              在快节奏的世界里，我倾向于慢下来。摄影不仅是记录，更是一种感官的延伸。我寻找城市中的几何秩序，也追逐自然界那转瞬即逝的光线。
            </p>
            <div className="flex flex-wrap gap-12">
              <a href="#" className="flex items-center gap-3 group text-[11px] uppercase tracking-[0.4em] font-semibold border-b border-transparent hover:border-zinc-950 pb-2 transition-all">
                Instagram <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#" className="flex items-center gap-3 group text-[11px] uppercase tracking-[0.4em] font-semibold border-b border-transparent hover:border-zinc-950 pb-2 transition-all">
                Behance <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer id="contact" className="py-24 px-6 border-t border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
            <Camera className="w-4 h-4" />
            <p className="text-[10px] uppercase tracking-[0.4em]">© 2024 Studio Wu. Independent Photography.</p>
          </div>
          <div className="flex gap-14">
             <Instagram className="w-5 h-5 cursor-pointer hover:text-zinc-400 transition-all hover:-translate-y-1" />
             <Mail className="w-5 h-5 cursor-pointer hover:text-zinc-400 transition-all hover:-translate-y-1" />
          </div>
        </div>
      </footer>

      {/* 7. Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-16"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="absolute top-8 right-8 text-zinc-950 p-2 hover:bg-zinc-50 rounded-full transition-colors hidden md:block"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} strokeWidth={1} />
            </motion.button>
            
            <div className="max-w-6xl w-full h-full flex flex-col items-center justify-center pointer-events-none">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-h-[75vh] w-full pointer-events-auto flex items-center justify-center"
              >
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain shadow-[0_40px_100px_rgba(0,0,0,0.15)] rounded-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-12 text-center space-y-3 pointer-events-auto"
              >
                <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-400 font-medium">{selectedImage.category}</p>
                <h2 className="text-3xl font-light tracking-tight">{selectedImage.title}</h2>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

