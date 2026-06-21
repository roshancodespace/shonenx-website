"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Apple, Smartphone, Monitor, Download, Terminal, HardDrive, Loader2, Check, Copy, AlertTriangle } from 'lucide-react';
import { usePlatformDetect } from '../hooks/usePlatformDetect';
import { fetchWithCache } from '../lib/fetchWithCache';
import { useRemoteConfig } from '../hooks/useRemoteConfig';

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}

interface Release {
  name: string;
  tag_name: string;
  prerelease: boolean;
  published_at: string;
  assets: ReleaseAsset[];
}

export function Downloads() {
  const { platform } = usePlatformDetect();
  const config = useRemoteConfig();
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [usePrerelease, setUsePrerelease] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  useEffect(() => {
    fetchWithCache('https://api.github.com/repos/Darkx-dev/ShonenX/releases')
      .then(data => {
        if (Array.isArray(data)) {
          setReleases(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const stableReleases = releases.filter(r => !r.prerelease);
  const preReleases = releases.filter(r => r.prerelease);
  
  const latestStable = stableReleases[0];
  const latestPre = preReleases[0];
  const isPrereleaseNewer = latestPre && latestStable && new Date(latestPre.published_at) > new Date(latestStable.published_at);

  const targetRelease = usePrerelease ? (latestPre || latestStable) : (latestStable || releases[0]);
  const currentVersion = targetRelease?.tag_name || 'Loading...';

  const totalDownloads = releases.reduce((acc, release) => acc + (release.assets || []).reduce((sum, asset) => sum + (asset.download_count || 0), 0), 0);

  const formatDownloads = (count: number) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
  };

  const androidAssets = targetRelease?.assets?.filter(a => a.name.endsWith('.apk')) || [];
  const arm64 = androidAssets.find(a => a.name.includes('arm64-v8a'));
  const armv7 = androidAssets.find(a => a.name.includes('armeabi-v7a'));
  const x86 = androidAssets.find(a => a.name.includes('x86_64'));

  const winExe = targetRelease?.assets?.find(a => a.name.endsWith('.exe') && a.name.includes('Setup'));
  const winZip = targetRelease?.assets?.find(a => a.name.endsWith('.zip') && a.name.includes('Portable'));

  const linuxBundle = targetRelease?.assets?.find(a => a.name.includes('linux-bundle.zip'));

  const copyInstallScript = () => {
    navigator.clipboard.writeText('bash <(curl -fsSL https://raw.githubusercontent.com/Darkx-dev/ShonenX/main/install.sh)');
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const getFormatSize = (bytes?: number) => {
    if (!bytes) return '';
    return `(${(bytes / (1024 * 1024)).toFixed(1)} MB)`;
  };

  return (
    <section id="download" className="py-24 border-b border-shonen-border bg-scanlines relative min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <h2 className="font-mono text-shonen-red text-sm tracking-widest uppercase mb-4">[ BINARY_DISTRIBUTION ]</h2>
            <h3 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight leading-none">
              Get the app. <br/>
              <span className="text-neutral-500">Free forever.</span>
            </h3>
          </div>
          <div className="flex flex-col items-end gap-4">
            {totalDownloads > 0 && (
              <div className="font-mono flex items-center gap-2 border border-shonen-border bg-shonen-dark px-3 py-1.5 text-xs text-neutral-300">
                <Download size={14} className="text-shonen-red" />
                <span>{formatDownloads(totalDownloads)} GLOBAL DOWNLOADS</span>
              </div>
            )}
            <div className="font-mono text-xs text-neutral-400 text-right uppercase max-w-xs border-l-2 border-shonen-red pl-4">
              Downloaded securely from official GitHub releases.
            </div>
            
            <div className="flex items-center gap-2 bg-shonen-dark border border-shonen-border p-1">
              <button 
                onClick={() => setUsePrerelease(false)}
                className={`font-mono text-xs px-4 py-2 transition-colors ${!usePrerelease ? 'bg-shonen-surface text-white font-bold' : 'text-neutral-500 hover:text-white'}`}
              >
                Stable
              </button>
              <button 
                onClick={() => setUsePrerelease(true)}
                className={`font-mono text-xs px-4 py-2 transition-colors flex items-center gap-2 ${usePrerelease ? 'bg-shonen-surface text-shonen-red font-bold' : 'text-neutral-500 hover:text-white'}`}
              >
                Pre-release
                {!!isPrereleaseNewer && !usePrerelease && (
                  <span className="bg-shonen-red text-black px-1 py-0.5 text-[8px] font-bold leading-none animate-pulse">NEW</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="w-full flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-shonen-red" size={48} />
          </div>
        ) : config && config.downloadsEnabled === false ? (
          <div className="w-full border border-shonen-red/50 bg-shonen-red/10 p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
            <AlertTriangle className="text-shonen-red mb-4" size={48} />
            <h3 className="font-display font-bold text-3xl uppercase mb-4 text-white">Downloads Disabled</h3>
            <p className="font-mono text-neutral-400 max-w-lg mb-6">
              Downloads are temporarily disabled. Please check the website announcements or our GitHub repository for more information.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
              <a href="https://github.com/roshancodeapace/ShonenX/releases" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-shonen-red text-black px-6 py-3 font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors">
                <Download size={16} /> View GitHub Releases
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-shonen-border border border-shonen-border">
            
            {/* Android Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              whileHover={{ scale: 1.02, zIndex: 10, position: 'relative' }}
              className={`p-8 flex flex-col group transition-all duration-300 ${platform === 'android' ? 'bg-shonen-surface' : 'bg-shonen-dark hover:bg-shonen-surface'}`}
            >
              <div className={`flex justify-between items-start mb-8 transition-colors duration-300 ${platform === 'android' ? 'text-shonen-red' : 'text-white group-hover:text-shonen-red'}`}>
                <motion.div whileHover={{ rotate: [-5, 5, -5, 0], transition: { duration: 0.4 } }}>
                  <Smartphone size={32} />
                </motion.div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`font-mono text-[10px] uppercase border px-2 py-1 transition-colors duration-300 border-shonen-red text-shonen-red`}>
                    {currentVersion}
                  </span>
                  {platform === 'android' && (
                    <span className="font-mono text-[8px] bg-shonen-red text-black px-1 font-bold">Detected OS</span>
                  )}
                </div>
              </div>
              
              <div className="flex-grow transform transition-transform duration-300 group-hover:translate-x-2">
                <p className="font-mono tracking-widest text-neutral-500 text-[10px] uppercase mb-2">Android</p>
                <h3 className="font-display font-bold text-2xl uppercase mb-1">Mobile / TV</h3>
                <p className="font-mono text-neutral-400 text-xs mb-6">Select your architecture to download the APK.</p>
              </div>
              
              <div className="flex flex-col gap-2 w-full mt-auto">
                {arm64 && (
                  <a href={arm64.browser_download_url} className="w-full flex flex-col items-center justify-center p-3 font-mono font-bold text-[10px] uppercase tracking-widest transition-colors bg-shonen-red text-black hover:bg-white relative overflow-hidden group/btn">
                    <span className="mb-0.5 flex items-center gap-2"><Download size={12} className="group-hover/btn:animate-bounce" /> ARM64-v8a</span>
                    <span className="text-[8px] opacity-70">Recommended {getFormatSize(arm64.size)}</span>
                  </a>
                )}
                {armv7 && (
                  <a href={armv7.browser_download_url} className="w-full flex items-center justify-between p-3 font-mono font-bold text-[10px] uppercase tracking-widest transition-colors bg-shonen-dark border border-white/10 hover:bg-white hover:text-black hover:border-white">
                    <span className="flex items-center gap-2 text-white/80 inherit-current"><Download size={12} /> ARMeabi-v7a</span>
                  </a>
                )}
                {x86 && (
                  <a href={x86.browser_download_url} className="w-full flex items-center justify-between p-3 font-mono font-bold text-[10px] uppercase tracking-widest transition-colors bg-shonen-dark border border-white/10 hover:bg-white hover:text-black hover:border-white">
                    <span className="flex items-center gap-2 text-white/80 inherit-current"><Download size={12} /> x86_64</span>
                  </a>
                )}
                {androidAssets.length === 0 && (
                  <div className="text-xs text-neutral-500 font-mono py-2">No Android releases found.</div>
                )}
              </div>
            </motion.div>

            {/* Windows Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              whileHover={{ scale: 1.02, zIndex: 10, position: 'relative' }}
              className={`p-8 flex flex-col group transition-all duration-300 ${platform === 'windows' ? 'bg-shonen-surface' : 'bg-shonen-dark hover:bg-shonen-surface'}`}
            >
              <div className={`flex justify-between items-start mb-8 transition-colors duration-300 ${platform === 'windows' ? 'text-shonen-red' : 'text-white group-hover:text-shonen-red'}`}>
                <motion.div whileHover={{ rotate: [-5, 5, -5, 0], transition: { duration: 0.4 } }}>
                  <Monitor size={32} />
                </motion.div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`font-mono text-[10px] uppercase border px-2 py-1 transition-colors duration-300 border-shonen-red text-shonen-red`}>
                    {currentVersion}
                  </span>
                  {platform === 'windows' && (
                    <span className="font-mono text-[8px] bg-shonen-red text-black px-1 font-bold">Detected OS</span>
                  )}
                </div>
              </div>
              
              <div className="flex-grow transform transition-transform duration-300 group-hover:translate-x-2">
                <p className="font-mono tracking-widest text-neutral-500 text-[10px] uppercase mb-2">Windows</p>
                <h3 className="font-display font-bold text-2xl uppercase mb-1">Desktop App</h3>
                <p className="font-mono text-neutral-400 text-xs mb-6">Choose between the full installer or portable executable.</p>
              </div>
              
              <div className="flex flex-col gap-2 w-full mt-auto">
                {winExe && (
                  <a href={winExe.browser_download_url} className="w-full flex items-center justify-center p-3 font-mono font-bold text-[10px] uppercase tracking-widest transition-colors bg-shonen-red text-black hover:bg-white group/btn">
                    <span className="flex items-center gap-2"><Download size={12} className="group-hover/btn:animate-bounce" /> Setup Installer .exe</span>
                  </a>
                )}
                {winZip && (
                  <a href={winZip.browser_download_url} className="w-full flex items-center justify-between p-3 font-mono font-bold text-[10px] uppercase tracking-widest transition-colors bg-shonen-dark border border-white/10 hover:bg-white hover:text-black hover:border-white">
                    <span className="flex items-center gap-2 text-white/80 inherit-current"><Download size={12} /> Portable .zip</span>
                  </a>
                )}
                {(!winExe && !winZip) && (
                  <div className="text-xs text-neutral-500 font-mono py-2">No Windows releases found.</div>
                )}
              </div>
            </motion.div>

            {/* Linux Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
              whileHover={{ scale: 1.02, zIndex: 10, position: 'relative' }}
              className={`p-8 flex flex-col group transition-all duration-300 ${platform === 'linux' ? 'bg-shonen-surface' : 'bg-shonen-dark hover:bg-shonen-surface'}`}
            >
              <div className={`flex justify-between items-start mb-8 transition-colors duration-300 ${platform === 'linux' ? 'text-shonen-red' : 'text-white group-hover:text-shonen-red'}`}>
                <motion.div whileHover={{ rotate: [-5, 5, -5, 0], transition: { duration: 0.4 } }}>
                  <HardDrive size={32} />
                </motion.div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`font-mono text-[10px] uppercase border px-2 py-1 transition-colors duration-300 border-shonen-red text-shonen-red`}>
                    {currentVersion}
                  </span>
                  {platform === 'linux' && (
                    <span className="font-mono text-[8px] bg-shonen-red text-black px-1 font-bold">Detected OS</span>
                  )}
                </div>
              </div>
              
              <div className="flex-grow transform transition-transform duration-300 group-hover:translate-x-2">
                <p className="font-mono tracking-widest text-neutral-500 text-[10px] uppercase mb-2">Linux</p>
                <h3 className="font-display font-bold text-2xl uppercase mb-1">Native Bundle</h3>
                <p className="font-mono text-neutral-400 text-xs mb-6">Or use our one-line install script to setup the desktop entry automatically.</p>
              </div>
              
              <div className="flex flex-col gap-2 w-full mt-auto">
                <button 
                  onClick={copyInstallScript}
                  className="w-full flex items-center justify-center p-3 font-mono font-bold text-[10px] uppercase tracking-widest transition-colors bg-shonen-red text-black hover:bg-white gap-2"
                >
                  {copiedScript ? <Check size={12} /> : <Terminal size={12} />}
                  {copiedScript ? 'Copied to Clipboard' : 'Copy Install Script'}
                </button>
                {linuxBundle && (
                  <a href={linuxBundle.browser_download_url} className="w-full flex items-center justify-between p-3 font-mono font-bold text-[10px] uppercase tracking-widest transition-colors bg-shonen-dark border border-white/10 hover:bg-white hover:text-black hover:border-white">
                    <span className="flex items-center gap-2 text-white/80 inherit-current"><Download size={12} /> Bundle .zip</span>
                  </a>
                )}
              </div>
            </motion.div>

          </div>
        )}
        
        {config?.downloadsEnabled !== false && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="mt-12 bg-shonen-surface border border-shonen-border p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-shonen-dark/50 to-transparent pointer-events-none z-0"></div>
            <div className="flex items-center gap-4 relative z-10 w-full">
              <div className="w-10 h-10 bg-shonen-dark flex items-center justify-center border border-white/10 text-white rounded">
                <Terminal size={18} />
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="font-mono font-bold text-sm uppercase">Quick Install (Linux source)</h4>
                <p className="font-mono text-xs text-neutral-400 mt-1 truncate max-w-full">
                  bash &lt;(curl -fsSL https://raw.githubusercontent.com/Darkx-dev/ShonenX/main/install.sh)
                </p>
              </div>
            </div>
            <button 
              onClick={copyInstallScript}
              className="relative z-10 font-mono text-xs uppercase px-6 py-3 border border-shonen-border hover:bg-white hover:text-black transition-colors whitespace-nowrap flex items-center gap-2"
            >
              {copiedScript ? <Check size={14} /> : <Copy size={14} />}
              {copiedScript ? 'Copied' : 'Copy Script'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

