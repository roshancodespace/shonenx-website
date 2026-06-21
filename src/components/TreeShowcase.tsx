"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { Folder, FolderOpen, FileCode2, Image as ImageIcon, ChevronRight, ChevronDown, Terminal, X, Maximize2 } from 'lucide-react';
import { usePlatformDetect } from '../hooks/usePlatformDetect';

type FileNode = {
  id: string;
  name: string;
  imageLabel: string;
  aspectRatio: 'video' | 'mobile' | 'auto';
  size: string;
  imgSrc?: string;
};

type FolderNode = {
  id: string;
  name: string;
  children: FileNode[];
};

const treeData: FolderNode[] = [
  {
    id: 'f1',
    name: 'core_engine',
    children: [
      { id: 'file1', name: 'main_dashboard.png', imageLabel: 'ShonenX Main Dashboard', aspectRatio: 'mobile', size: '2.4MB', imgSrc: 'https://res.cloudinary.com/dscoexe9l/image/upload/v1781979110/Screenshot_20260620_211126_bsnvdk.jpg' },
      { id: 'file3', name: 'tracking_sync.png', imageLabel: 'MAL/AniList Tracking', aspectRatio: 'mobile', size: '1.4MB', imgSrc: 'https://res.cloudinary.com/dscoexe9l/image/upload/v1781978996/1000232654_py5khk.jpg' },
    ]
  },
  {
    id: 'f2',
    name: 'reader_and_player',
    children: [
      { id: 'file6', name: 'settings.png', imageLabel: 'Advanced Settings', aspectRatio: 'mobile', size: '1.2MB', imgSrc: 'https://res.cloudinary.com/dscoexe9l/image/upload/v1781979110/Screenshot_20260620_211312_qcor7h.jpg' },
    ]
  },
  {
    id: 'f3',
    name: 'discovery_ui',
    children: [
      { id: 'file7', name: 'anime_details.png', imageLabel: 'Manga/Anime Detail Overlays', aspectRatio: 'mobile', size: '2.1MB', imgSrc: 'https://res.cloudinary.com/dscoexe9l/image/upload/v1781979113/Screenshot_20260620_211212_tumczi.jpg' },
      { id: 'file8', name: 'episodes_list.png', imageLabel: 'Chapter/Episode Navigation', aspectRatio: 'mobile', size: '1.8MB', imgSrc: 'https://res.cloudinary.com/dscoexe9l/image/upload/v1781979112/Screenshot_20260620_211235_iim4rh.jpg' },
    ]
  }
];

export function TreeShowcase() {
  const { platform } = usePlatformDetect();
  const osSuffix = platform !== 'unknown' ? ` // ${platform.toUpperCase()}` : '';
  
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'f1': true,
    'f2': true,
    'f3': true
  });
  const [activeFile, setActiveFile] = useState<FileNode>(treeData[0].children[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFolder = (id: string) => {
    setOpenFolders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-24 border-b border-shonen-border bg-shonen-dark relative">
      <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="font-mono text-shonen-red text-sm tracking-widest uppercase mb-2 flex items-center gap-2">
              <Terminal size={14} />
              [ SYSTEM_HIERARCHY ]
            </h2>
            <h3 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tighter">
              Architecture Preview
            </h3>
          </div>
          <div className="hidden md:block font-mono text-xs text-neutral-500 uppercase">
            ROOT // SHONEN_X_V2.4.1
          </div>
        </div>

        <div className="border border-shonen-border bg-black grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          
          {/* File Explorer (Left Pane) */}
          <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-shonen-border flex flex-col bg-[#0a0a0a]">
            <div className="px-4 py-3 border-b border-shonen-border font-mono text-[10px] uppercase text-neutral-500 tracking-widest flex items-center gap-2">
              <FileCode2 size={12} />
              Explorer
            </div>
            <div className="p-4 font-mono text-xs overflow-y-auto">
              <div className="mb-2 text-neutral-400 font-bold">SHONEN_X_PROJECT</div>
              
              <div className="pl-2 border-l border-shonen-border/30 ml-1 mt-2 flex flex-col gap-1">
                {treeData.map((folder) => (
                  <div key={folder.id} className="flex flex-col">
                    <div 
                      className="flex items-center gap-2 py-1.5 px-2 hover:bg-shonen-surface cursor-pointer text-neutral-300 transition-colors"
                      onClick={() => toggleFolder(folder.id)}
                    >
                      {openFolders[folder.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      {openFolders[folder.id] ? <FolderOpen size={14} className="text-shonen-red" /> : <Folder size={14} className="text-neutral-500" />}
                      <span className="uppercase">{folder.name}</span>
                    </div>
                    
                    <AnimatePresence initial={false}>
                      {openFolders[folder.id] && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col ml-6 border-l border-shonen-border/30 pl-2 overflow-hidden"
                        >
                          {folder.children.map((file) => (
                            <div 
                              key={file.id}
                              className={`flex items-center justify-between py-1.5 px-2 cursor-pointer transition-colors ${
                                activeFile.id === file.id 
                                  ? 'bg-shonen-red/10 text-shonen-red border-l-2 border-shonen-red -ml-[3px]' 
                                  : 'text-neutral-500 hover:text-neutral-300 hover:bg-shonen-surface -ml-[1px] border-l border-transparent'
                              }`}
                              onClick={() => setActiveFile(file)}
                            >
                              <div className="flex items-center gap-2 truncate pr-2">
                                <ImageIcon size={12} className={activeFile.id === file.id ? 'text-shonen-red' : 'text-neutral-600'} />
                                <span className="truncate">{file.name}</span>
                              </div>
                              <span className="text-[9px] opacity-50 shrink-0">{file.size}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Panel (Right Pane) */}
          <div className="lg:col-span-9 bg-shonen-surface relative flex flex-col min-h-[400px]">
             {/* Header */}
             <div className="flex items-center justify-between px-4 py-3 border-b border-shonen-border bg-[#0a0a0a]">
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2 bg-shonen-dark border border-shonen-border px-3 py-1 font-mono text-xs text-neutral-300">
                   <ImageIcon size={12} className="text-shonen-red" />
                   {activeFile.name}
                 </div>
               </div>
               <button 
                 onClick={() => setIsFullscreen(true)}
                 className="flex items-center gap-2 text-neutral-500 hover:text-white font-mono text-[10px] uppercase transition-colors px-2 py-1 border border-transparent hover:border-shonen-border"
               >
                 <Maximize2 size={12} />
                 <span className="hidden sm:inline">Preview Full</span>
               </button>
             </div>
             
             {/* Canvas Container */}
             <div 
               className="flex-grow p-4 md:p-8 flex items-center justify-center relative overflow-hidden bg-scanlines cursor-zoom-in"
               onClick={() => setIsFullscreen(true)}
             >
               <motion.div
                 key={activeFile.id}
                 initial={{ opacity: 0, y: 15, scale: 0.98 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 transition={{ type: "spring", stiffness: 300, damping: 25 }}
                 className="w-full h-full flex items-center justify-center relative z-10"
               >
                 <ScreenshotPlaceholder 
                   label={`${activeFile.imageLabel}${osSuffix}`} 
                   aspectRatio={activeFile.aspectRatio}
                   imgSrc={activeFile.imgSrc}
                   className="h-[500px] w-auto max-w-full shadow-2xl border border-shonen-border ring-1 ring-white/5" 
                 />
               </motion.div>
             </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm p-4 md:p-12 flex flex-col items-center justify-center cursor-zoom-out"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="absolute top-4 right-4 md:top-8 md:right-8">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
                className="bg-shonen-dark border border-shonen-border p-3 text-white hover:text-shonen-red hover:border-shonen-red transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase text-neutral-500 tracking-widest bg-black/50 px-4 py-2 border border-shonen-border backdrop-blur-md">
              {activeFile.name} // {activeFile.size} // CLICK ANYWHERE TO CLOSE
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex items-center justify-center p-4 md:p-8 w-full max-w-[90vw] max-h-[90vh]"
              onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
            >
              <ScreenshotPlaceholder 
                label={`${activeFile.imageLabel}${osSuffix}`} 
                aspectRatio={activeFile.aspectRatio}
                imgSrc={activeFile.imgSrc}
                className="h-[80vh] max-h-[800px] w-auto object-contain border border-shonen-border shadow-[0_0_100px_rgba(255,51,51,0.15)] ring-1 ring-white/10 container-snap" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
