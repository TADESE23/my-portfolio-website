import React, { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes, FaGithub, FaExternalLinkAlt, FaCheckCircle,
  FaCalendarAlt, FaLayerGroup, FaCode, FaPlay, FaLock,
  FaDatabase, FaServer, FaDesktop, FaMobileAlt, FaStar,
  FaArrowRight
} from 'react-icons/fa';
import { Project } from '../types';
import { getImageUrl } from '../services/api';

// ─── Tech colour palette ────────────────────────────────────────────────────────
const TECH_COLORS: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  'React':           { bg: 'bg-sky-50 dark:bg-sky-950/60',      text: 'text-sky-700 dark:text-sky-300',      border: 'border-sky-200 dark:border-sky-800',      icon: '⚛️' },
  'Node.js':         { bg: 'bg-green-50 dark:bg-green-950/60',  text: 'text-green-700 dark:text-green-300',  border: 'border-green-200 dark:border-green-800',  icon: '🟢' },
  'Express':         { bg: 'bg-slate-50 dark:bg-slate-800/60',  text: 'text-slate-600 dark:text-slate-300',  border: 'border-slate-200 dark:border-slate-700',  icon: '🚂' },
  'MySQL':           { bg: 'bg-orange-50 dark:bg-orange-950/60',text: 'text-orange-700 dark:text-orange-300',border: 'border-orange-200 dark:border-orange-800',icon: '🗃️' },
  'PostgreSQL':      { bg: 'bg-indigo-50 dark:bg-indigo-950/60',text: 'text-indigo-700 dark:text-indigo-300',border: 'border-indigo-200 dark:border-indigo-800',icon: '🐘' },
  'Python':          { bg: 'bg-yellow-50 dark:bg-yellow-950/60',text: 'text-yellow-700 dark:text-yellow-300',border: 'border-yellow-200 dark:border-yellow-800',icon: '🐍' },
  'Django':          { bg: 'bg-emerald-50 dark:bg-emerald-950/60',text:'text-emerald-700 dark:text-emerald-300',border:'border-emerald-200 dark:border-emerald-800',icon:'🎸' },
  'TypeScript':      { bg: 'bg-blue-50 dark:bg-blue-950/60',   text: 'text-blue-700 dark:text-blue-300',   border: 'border-blue-200 dark:border-blue-800',   icon: '🔷' },
  'JavaScript':      { bg: 'bg-yellow-50 dark:bg-yellow-950/60',text:'text-yellow-600 dark:text-yellow-300',border:'border-yellow-200 dark:border-yellow-800',icon:'⚡' },
  'Telegram Bot API':{ bg: 'bg-sky-50 dark:bg-sky-950/60',     text: 'text-sky-700 dark:text-sky-300',     border: 'border-sky-200 dark:border-sky-800',     icon: '✈️' },
  'MongoDB':         { bg: 'bg-green-50 dark:bg-green-950/60', text: 'text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-800', icon: '🍃' },
  'Redis':           { bg: 'bg-red-50 dark:bg-red-950/60',     text: 'text-red-700 dark:text-red-300',     border: 'border-red-200 dark:border-red-800',     icon: '🔴' },
  'Docker':          { bg: 'bg-blue-50 dark:bg-blue-950/60',   text: 'text-blue-700 dark:text-blue-300',   border: 'border-blue-200 dark:border-blue-800',   icon: '🐳' },
  'Tailwind CSS':    { bg: 'bg-teal-50 dark:bg-teal-950/60',   text: 'text-teal-700 dark:text-teal-300',   border: 'border-teal-200 dark:border-teal-800',   icon: '🌊' },
  'default':         { bg: 'bg-violet-50 dark:bg-violet-950/60',text:'text-violet-700 dark:text-violet-300',border:'border-violet-200 dark:border-violet-800',icon:'📦' },
};

// ─── Hero gradients ─────────────────────────────────────────────────────────────
const HERO_GRADIENTS = [
  { from: '#2563EB', via: '#4F46E5', to: '#7C3AED' },
  { from: '#059669', via: '#0D9488', to: '#0891B2' },
  { from: '#E11D48', via: '#DB2777', to: '#A21CAF' },
  { from: '#D97706', via: '#EA580C', to: '#DC2626' },
  { from: '#7C3AED', via: '#6D28D9', to: '#4338CA' },
  { from: '#0891B2', via: '#0284C7', to: '#1D4ED8' },
];

// ─── Feature icons & categories ─────────────────────────────────────────────────
const FEATURE_META = [
  { icon: <FaStar className="text-amber-500" />,      bg: 'bg-amber-50 dark:bg-amber-950/40',    border: 'border-amber-100 dark:border-amber-900/60' },
  { icon: <FaLock className="text-emerald-500" />,    bg: 'bg-emerald-50 dark:bg-emerald-950/40',border: 'border-emerald-100 dark:border-emerald-900/60' },
  { icon: <FaDatabase className="text-indigo-500" />, bg: 'bg-indigo-50 dark:bg-indigo-950/40',  border: 'border-indigo-100 dark:border-indigo-900/60' },
  { icon: <FaDesktop className="text-sky-500" />,     bg: 'bg-sky-50 dark:bg-sky-950/40',        border: 'border-sky-100 dark:border-sky-900/60' },
  { icon: <FaMobileAlt className="text-pink-500" />,  bg: 'bg-pink-50 dark:bg-pink-950/40',      border: 'border-pink-100 dark:border-pink-900/60' },
  { icon: <FaServer className="text-violet-500" />,   bg: 'bg-violet-50 dark:bg-violet-950/40',  border: 'border-violet-100 dark:border-violet-900/60' },
  { icon: <FaCode className="text-orange-500" />,     bg: 'bg-orange-50 dark:bg-orange-950/40',  border: 'border-orange-100 dark:border-orange-900/60' },
  { icon: <FaLayerGroup className="text-teal-500" />, bg: 'bg-teal-50 dark:bg-teal-950/40',      border: 'border-teal-100 dark:border-teal-900/60' },
];

// ─── Project type detection ──────────────────────────────────────────────────────
const inferProjectType = (name: string, techs: string[]): string => {
  const n = name.toLowerCase();
  if (n.includes('bot') || techs.includes('Telegram Bot API')) return 'Chatbot / Automation';
  if (n.includes('network') || n.includes('social'))           return 'Social Platform';
  if (n.includes('management') || n.includes('system'))        return 'Enterprise System';
  if (techs.some(t => ['React', 'TypeScript'].includes(t)))    return 'Web Application';
  return 'Software Project';
};

// ─── URL helpers ─────────────────────────────────────────────────────────────────
const formatUrl = (url: string) => {
  if (!url || url === '#') return '#';
  if (!url.startsWith('http://') && !url.startsWith('https://')) return `https://${url}`;
  return url;
};

const formatYear = (dateStr: string) => {
  try { return new Date(dateStr).getFullYear().toString(); }
  catch { return '2024'; }
};

// ─── Mock browser chrome for UI preview ─────────────────────────────────────────
const MockBrowserChrome: React.FC<{ gradient: { from: string; via: string; to: string }; projectName: string; idx: number }> = ({ gradient, projectName, idx }) => {
  const views = ['Dashboard', 'User Profile', 'Analytics'];
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      {/* Browser top bar */}
      <div className="bg-[#1e2330] px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 bg-[#12151f] rounded-md px-3 py-1 text-[10px] text-slate-400 font-mono truncate">
          localhost:3000 / {projectName.toLowerCase().replace(/\s+/g, '-')}
        </div>
      </div>
      {/* Browser content */}
      <div
        className="relative h-40 flex flex-col"
        style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.via}, ${gradient.to})` }}
      >
        {/* Fake nav */}
        <div className="flex items-center justify-between px-4 py-2 bg-black/20 backdrop-blur-sm">
          <span className="text-white text-[10px] font-bold">{projectName.split(' ').slice(0, 2).join(' ')}</span>
          <div className="flex gap-2">
            {['Home', 'Dashboard', 'Reports'].map(n => (
              <span key={n} className="text-white/60 text-[9px]">{n}</span>
            ))}
          </div>
        </div>
        {/* Fake content */}
        <div className="flex-1 p-4 grid grid-cols-3 gap-2 opacity-80">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/15 rounded-lg p-2 flex flex-col gap-1.5">
              <div className="h-1.5 bg-white/40 rounded w-3/4" />
              <div className="h-4 bg-white/60 rounded" />
              <div className="h-1 bg-white/30 rounded w-1/2" />
            </div>
          ))}
        </div>
        {/* Page label */}
        <div className="absolute bottom-2 right-2">
          <span className="bg-black/30 backdrop-blur-sm text-white/70 text-[9px] px-2 py-0.5 rounded-full">
            {views[idx % views.length]}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Tab definitions ─────────────────────────────────────────────────────────────
type Tab = 'overview' | 'features' | 'tech';

// ─── Main component ──────────────────────────────────────────────────────────────
interface ProjectDemoModalProps {
  project: Project | null;
  projectIndex: number;
  onClose: () => void;
}

const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({ project, projectIndex, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (project) {
      setActiveTab('overview');
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  const grad = HERO_GRADIENTS[projectIndex % HERO_GRADIENTS.length];
  const heroStyle = { background: `linear-gradient(135deg, ${grad.from}, ${grad.via}, ${grad.to})` };
  const hasLiveUrl = !!project.live_url && project.live_url !== '#';
  const hasImage   = !!project.image;
  const projectType = inferProjectType(project.name, project.technologies_names);

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'features', label: 'Features', count: project.features.length },
    { key: 'tech',     label: 'Tech Stack', count: project.technologies_names.length },
  ];

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            id="project-demo-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-4xl max-h-[96vh] sm:max-h-[90vh] bg-white dark:bg-[#0d1117] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden border border-slate-200/60 dark:border-white/8"
          >
            {/* ══════════════════════════════
                HERO BANNER
            ══════════════════════════════ */}
            <div className="relative h-52 sm:h-64 flex-shrink-0 overflow-hidden" style={heroStyle}>
              {/* Geometric background decoration */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
                <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-white/5" />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
                />
              </div>

              {/* Project image or animated placeholder */}
              {hasImage ? (
                <img
                  src={getImageUrl(project.image)}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-end pr-10 sm:pr-16 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                    className="opacity-20"
                  >
                    <div className="text-[100px] sm:text-[130px] leading-none select-none">
                      {projectType.includes('Bot') ? '🤖' : projectType.includes('Social') ? '🌐' : projectType.includes('Enterprise') ? '🏢' : '💻'}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                id="project-demo-close-btn"
                aria-label="Close demo"
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-200 backdrop-blur-sm border border-white/10"
              >
                <FaTimes className="w-3.5 h-3.5" />
              </button>

              {/* Hero content overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase font-black tracking-widest bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/20">
                    App {String(project.order || projectIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wide bg-white/10 backdrop-blur-sm text-white/80 px-3 py-1 rounded-full border border-white/10">
                    {projectType}
                  </span>
                  {hasLiveUrl && (
                    <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wide bg-green-500/70 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      Live
                    </span>
                  )}
                </div>
                <h2
                  id="demo-modal-title"
                  className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-lg"
                >
                  {project.name}
                </h2>
              </div>
            </div>

            {/* ══════════════════════════════
                TABS
            ══════════════════════════════ */}
            <div className="flex-shrink-0 border-b border-slate-100 dark:border-white/6 px-4 sm:px-6 bg-white dark:bg-[#0d1117]">
              <div className="flex gap-0 -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    id={`demo-tab-${tab.key}`}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative px-4 sm:px-5 py-3.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 border-b-2 flex items-center gap-1.5 ${
                      activeTab === tab.key
                        ? 'text-primary border-primary'
                        : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        activeTab === tab.key
                          ? 'bg-primary/15 text-primary'
                          : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ══════════════════════════════
                TAB CONTENT (scrollable)
            ══════════════════════════════ */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* ─── OVERVIEW TAB ─── */}
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="p-5 sm:p-7 space-y-7"
                  >
                    {/* Quick stat pills */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { icon: <FaCalendarAlt className="text-primary w-3.5 h-3.5" />,   label: 'Year',       value: formatYear(project.created_at), accent: 'from-blue-500/10 to-indigo-500/10' },
                        { icon: <FaLayerGroup  className="text-secondary w-3.5 h-3.5" />, label: 'Stack',      value: `${project.technologies_names.length} Technologies`, accent: 'from-violet-500/10 to-purple-500/10' },
                        { icon: <FaCode        className="text-accent w-3.5 h-3.5" />,    label: 'Features',   value: `${project.features.length} Built`,  accent: 'from-cyan-500/10 to-teal-500/10' },
                      ].map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.07 }}
                          className={`bg-gradient-to-br ${stat.accent} rounded-2xl p-3 sm:p-4 text-center border border-slate-100 dark:border-white/6`}
                        >
                          <div className="flex justify-center mb-1.5">{stat.icon}</div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold font-inter">{stat.label}</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white mt-1 leading-tight">{stat.value}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.12 }}
                    >
                      <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                        <span className="w-3 h-px bg-primary rounded-full" />
                        About This Project
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-inter">
                        {project.description}
                      </p>
                    </motion.div>

                    {/* UI Preview — mock browser windows */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                        <span className="w-3 h-px bg-secondary rounded-full" />
                        UI Preview
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.22 + i * 0.08 }}
                          >
                            <MockBrowserChrome gradient={HERO_GRADIENTS[(projectIndex + i) % HERO_GRADIENTS.length]} projectName={project.name} idx={i} />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Highlights — quick feature peek */}
                    {project.features.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            <span className="w-3 h-px bg-accent rounded-full" />
                            Key Highlights
                          </h3>
                          <button
                            onClick={() => setActiveTab('features')}
                            className="text-[10px] text-primary font-bold hover:text-secondary flex items-center gap-1 transition-colors"
                          >
                            See all <FaArrowRight className="text-[8px]" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          {project.features.slice(0, 3).map((f, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.06 }}
                              className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 font-inter"
                            >
                              <FaCheckCircle className="text-primary flex-shrink-0 w-3.5 h-3.5" />
                              {f}
                            </motion.div>
                          ))}
                          {project.features.length > 3 && (
                            <button
                              onClick={() => setActiveTab('features')}
                              className="text-xs text-primary/70 hover:text-primary font-semibold ml-6 mt-1 transition-colors"
                            >
                              +{project.features.length - 3} more features →
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* ─── FEATURES TAB ─── */}
                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="p-5 sm:p-7"
                  >
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-inter mb-6">
                      {project.name} ships with <strong className="text-slate-800 dark:text-white">{project.features.length} core features</strong> engineered for real-world use.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.features.map((feature, i) => {
                        const meta = FEATURE_META[i % FEATURE_META.length];
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`group flex items-start gap-4 p-4 rounded-2xl border ${meta.bg} ${meta.border} hover:shadow-sm transition-all duration-200 cursor-default`}
                          >
                            <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-xl bg-white dark:bg-black/20 shadow-sm border ${meta.border} text-sm group-hover:scale-110 transition-transform`}>
                              {meta.icon}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800 dark:text-white leading-snug font-inter">
                                {feature}
                              </p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                                Feature {String(i + 1).padStart(2, '0')}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ─── TECH STACK TAB ─── */}
                {activeTab === 'tech' && (
                  <motion.div
                    key="tech"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="p-5 sm:p-7"
                  >
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-inter mb-6">
                      Built with a curated <strong className="text-slate-800 dark:text-white">{project.technologies_names.length}-technology stack</strong> optimized for performance and scalability.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.technologies_names.map((tech, i) => {
                        const c = TECH_COLORS[tech] || TECH_COLORS['default'];
                        return (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className={`flex items-center gap-4 p-4 rounded-2xl border ${c.bg} ${c.border} group hover:shadow-sm transition-all`}
                          >
                            <span className="text-2xl group-hover:scale-110 transition-transform">{c.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className={`font-bold text-sm ${c.text}`}>{tech}</p>
                              <div className="mt-1.5 h-1 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${65 + (i * 7) % 35}%` }}
                                  transition={{ delay: i * 0.07 + 0.2, duration: 0.7, ease: 'easeOut' }}
                                  className={`h-full rounded-full bg-current opacity-60`}
                                  style={{ color: c.text.includes('sky') ? '#0ea5e9' : c.text.includes('green') ? '#22c55e' : c.text.includes('orange') ? '#f97316' : c.text.includes('indigo') ? '#6366f1' : c.text.includes('emerald') ? '#10b981' : c.text.includes('blue') ? '#3b82f6' : c.text.includes('yellow') ? '#eab308' : c.text.includes('teal') ? '#14b8a6' : '#8b5cf6' }}
                                />
                              </div>
                            </div>
                            <span className={`text-xs font-bold ${c.text} opacity-60`}>
                              {i === 0 ? 'Primary' : i < 2 ? 'Core' : 'Tooling'}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ══════════════════════════════
                STICKY FOOTER
            ══════════════════════════════ */}
            <div className="flex-shrink-0 p-4 sm:p-5 border-t border-slate-100 dark:border-white/6 bg-white dark:bg-[#0d1117] flex flex-col sm:flex-row gap-3">
              <a
                href={formatUrl(project.github_url)}
                target="_blank"
                rel="noopener noreferrer"
                id={`project-github-${project.id}`}
                className="flex items-center justify-center gap-2.5 flex-1 py-3 px-5 rounded-2xl bg-slate-100 dark:bg-white/8 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold text-sm transition-all duration-300 group border border-slate-200 dark:border-white/8"
              >
                <FaGithub className="group-hover:scale-110 transition-transform" />
                Source Code
              </a>

              <a
                href={hasLiveUrl ? formatUrl(project.live_url) : undefined}
                target={hasLiveUrl ? '_blank' : undefined}
                rel="noopener noreferrer"
                id={`project-live-${project.id}`}
                aria-disabled={!hasLiveUrl}
                onClick={!hasLiveUrl ? (e) => e.preventDefault() : undefined}
                className={`flex items-center justify-center gap-2.5 flex-1 py-3 px-5 font-bold rounded-2xl transition-all duration-300 text-sm group ${
                  hasLiveUrl
                    ? 'bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white shadow-lg shadow-primary/20 hover:shadow-secondary/25 hover:-translate-y-0.5'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-200 dark:border-white/5'
                }`}
              >
                {hasLiveUrl ? (
                  <>
                    <FaPlay className="text-xs group-hover:scale-110 transition-transform" />
                    View Live Demo
                    <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                  </>
                ) : (
                  <>
                    <FaExternalLinkAlt className="text-xs opacity-60" />
                    Demo Not Available
                  </>
                )}
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDemoModal;
