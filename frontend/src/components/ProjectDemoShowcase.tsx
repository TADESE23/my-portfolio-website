import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight,
  FaUsers, FaChartBar, FaShieldAlt, FaBell, FaSearch, FaCheckCircle,
  FaPlay, FaCode, FaRocket, FaTelegram, FaDatabase, FaNetworkWired,
  FaStar, FaEye, FaLayerGroup, FaBolt, FaLaptopCode
} from 'react-icons/fa';
import { Project } from '../types';

// ─── URL helper ──────────────────────────────────────────────────────────────
const formatUrl = (url: string) => {
  if (!url || url === '#') return '#';
  if (!url.startsWith('http://') && !url.startsWith('https://')) return `https://${url}`;
  return url;
};

// ─── Project gradient palette ─────────────────────────────────────────────────
const GRADIENTS = [
  { from: '#1e40af', to: '#6d28d9', accent: '#818cf8', light: '#dbeafe' },
  { from: '#065f46', to: '#0891b2', accent: '#34d399', light: '#d1fae5' },
  { from: '#9f1239', to: '#c2410c', accent: '#fb7185', light: '#ffe4e6' },
  { from: '#7c3aed', to: '#db2777', accent: '#c084fc', light: '#f3e8ff' },
];

// ─── Animated SMS Dashboard mockup ───────────────────────────────────────────
const SMSDemoScreen: React.FC<{ active: boolean }> = ({ active }) => {
  const students = [
    { name: 'Abel Tesfaye', grade: 'A+', attend: '98%', fee: 'Paid', color: 'bg-emerald-400' },
    { name: 'Sara Bekele', grade: 'B+', attend: '94%', fee: 'Paid', color: 'bg-blue-400' },
    { name: 'Yonas Hailu', grade: 'A', attend: '96%', fee: 'Pending', color: 'bg-amber-400' },
    { name: 'Meron Alemu', grade: 'A+', attend: '99%', fee: 'Paid', color: 'bg-pink-400' },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-2 p-3 text-white overflow-hidden">
      {/* Top stats row */}
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { label: 'Students', val: '1,240', icon: <FaUsers className="text-blue-300" /> },
          { label: 'Attendance', val: '96.2%', icon: <FaCheckCircle className="text-green-300" /> },
          { label: 'Reports', val: '342', icon: <FaChartBar className="text-purple-300" /> },
          { label: 'Alerts', val: '3', icon: <FaBell className="text-amber-300" /> },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center border border-white/10"
          >
            <div className="flex justify-center mb-1">{s.icon}</div>
            <div className="text-[11px] font-bold">{s.val}</div>
            <div className="text-[8px] text-white/60 uppercase tracking-wide">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Student table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
        className="bg-white/8 rounded-xl border border-white/10 flex-1 overflow-hidden"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/10">
          <FaSearch className="text-white/40 text-[10px]" />
          <span className="text-[9px] text-white/40">Search students...</span>
          <span className="ml-auto text-[8px] bg-blue-500/40 text-blue-200 px-2 py-0.5 rounded-full">All Classes</span>
        </div>
        <div className="divide-y divide-white/5">
          {students.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={active ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.07 }}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 transition-colors"
            >
              <div className={`w-5 h-5 rounded-full ${s.color} flex items-center justify-center text-[7px] font-bold text-white flex-shrink-0`}>
                {s.name[0]}
              </div>
              <span className="text-[9px] font-medium flex-1 truncate">{s.name}</span>
              <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded">{s.grade}</span>
              <span className="text-[8px] text-green-300">{s.attend}</span>
              <span className={`text-[7px] px-1.5 py-0.5 rounded-full ${s.fee === 'Paid' ? 'bg-green-500/30 text-green-300' : 'bg-amber-500/30 text-amber-300'}`}>
                {s.fee}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom chart bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="bg-white/8 rounded-xl border border-white/10 p-2"
      >
        <div className="text-[8px] text-white/50 uppercase tracking-wide mb-1.5">Monthly Attendance</div>
        <div className="flex items-end gap-1 h-8">
          {[70, 85, 92, 88, 96, 93, 98].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={active ? { height: `${h}%` } : {}}
              transition={{ delay: 0.9 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
              className="flex-1 bg-gradient-to-t from-blue-400 to-blue-200 rounded-sm opacity-80"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// ─── Animated HRMS mockup ─────────────────────────────────────────────────────
const HRMSDemoScreen: React.FC<{ active: boolean }> = ({ active }) => {
  const employees = [
    { name: 'Fikirte M.', role: 'Engineer', status: 'Checked In', dept: 'Dev', color: 'bg-cyan-400' },
    { name: 'Dawit A.', role: 'Designer', status: 'On Leave', dept: 'UX', color: 'bg-pink-400' },
    { name: 'Hanna G.', role: 'Manager', status: 'Checked In', dept: 'HR', color: 'bg-purple-400' },
    { name: 'Bereket T.', role: 'Analyst', status: 'Remote', dept: 'Data', color: 'bg-amber-400' },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-2 p-3 text-white overflow-hidden">
      {/* Header row */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: 'Total Staff', val: '284', icon: <FaUsers className="text-cyan-300" />, trend: '+12' },
          { label: 'Present', val: '241', icon: <FaCheckCircle className="text-green-300" />, trend: '85%' },
          { label: 'On Leave', val: '18', icon: <FaBell className="text-amber-300" />, trend: '-3' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={active ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="bg-white/10 rounded-xl p-2 border border-white/10"
          >
            <div className="flex items-center gap-1.5 mb-1">{s.icon}<span className="text-[8px] text-white/60">{s.label}</span></div>
            <div className="text-sm font-bold">{s.val}</div>
            <div className="text-[8px] text-emerald-300">{s.trend}</div>
          </motion.div>
        ))}
      </div>

      {/* Employee list */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
        className="flex-1 bg-white/8 rounded-xl border border-white/10 overflow-hidden"
      >
        <div className="text-[8px] text-white/50 uppercase tracking-widest px-3 pt-2 pb-1">Employee Directory</div>
        {employees.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 + i * 0.07 }}
            className="flex items-center gap-2 px-3 py-1.5 border-t border-white/5"
          >
            <div className={`w-5 h-5 rounded-full ${e.color} flex items-center justify-center text-[7px] font-bold text-white flex-shrink-0`}>
              {e.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-semibold truncate">{e.name}</div>
              <div className="text-[7px] text-white/50">{e.role} · {e.dept}</div>
            </div>
            <span className={`text-[7px] px-1.5 py-0.5 rounded-full ${
              e.status === 'Checked In' ? 'bg-green-500/30 text-green-300'
              : e.status === 'On Leave' ? 'bg-amber-500/30 text-amber-300'
              : 'bg-blue-500/30 text-blue-300'
            }`}>{e.status}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Payroll progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 0.9 }}
        className="bg-white/8 rounded-xl border border-white/10 p-2"
      >
        <div className="flex justify-between items-center mb-1">
          <span className="text-[8px] text-white/60">Payroll Cycle — August</span>
          <span className="text-[8px] text-emerald-300 font-bold">78% Processed</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={active ? { width: '78%' } : {}}
            transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

// ─── Animated ProLink Social Network mockup ───────────────────────────────────
const ProLinkDemoScreen: React.FC<{ active: boolean }> = ({ active }) => {
  const posts = [
    { user: 'Kalkidan B.', role: 'ML Engineer', action: 'Shared a portfolio project', likes: 47, time: '2m ago', color: 'bg-violet-400' },
    { user: 'Eyob T.', role: 'Backend Dev', action: 'Posted a job opening', likes: 23, time: '14m ago', color: 'bg-blue-400' },
    { user: 'Mika H.', role: 'UX Designer', action: 'Seeking collaborators', likes: 61, time: '1h ago', color: 'bg-pink-400' },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-2 p-3 text-white overflow-hidden">
      {/* Header bar */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 border border-white/10"
      >
        <FaNetworkWired className="text-violet-300 text-sm" />
        <span className="text-[10px] font-bold tracking-wide">ProLink Feed</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-[8px] text-green-300">312 online</span>
        </div>
      </motion.div>

      {/* Posts feed */}
      {posts.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="bg-white/8 rounded-xl border border-white/10 p-2.5"
        >
          <div className="flex items-start gap-2">
            <div className={`w-6 h-6 rounded-full ${p.color} flex items-center justify-center text-[8px] font-bold flex-shrink-0`}>
              {p.user[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold">{p.user}</span>
                <span className="text-[7px] text-white/40">·</span>
                <span className="text-[7px] text-white/40">{p.role}</span>
              </div>
              <p className="text-[9px] text-white/70 mt-0.5">{p.action}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[8px] text-pink-300 flex items-center gap-1"><FaStar className="text-[7px]" /> {p.likes}</span>
                <span className="text-[8px] text-blue-300 flex items-center gap-1"><FaEye className="text-[7px]" /> Reply</span>
                <span className="text-[7px] text-white/30 ml-auto">{p.time}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Chat preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
        className="bg-white/8 rounded-xl border border-white/10 p-2"
      >
        <div className="text-[8px] text-white/50 mb-1.5 flex items-center gap-1"><FaBolt className="text-amber-300" />Live Chat</div>
        <div className="space-y-1">
          {['Looking for React devs...', 'Check my new portfolio!', 'Django + React = 🔥'].map((m, i) => (
            <div key={i} className={`text-[8px] px-2 py-1 rounded-lg ${i % 2 === 0 ? 'bg-violet-500/20 text-violet-200 mr-6' : 'bg-white/10 text-white/70 ml-6'}`}>{m}</div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// ─── Animated Telegram Bot mockup ─────────────────────────────────────────────
const TelegramBotDemoScreen: React.FC<{ active: boolean }> = ({ active }) => {
  const messages = [
    { from: 'bot', text: '👋 Welcome! I\'m your CS Exit Exam Bot. Type /start to begin.' },
    { from: 'user', text: '/quiz algorithms' },
    { from: 'bot', text: '📚 Q12: What is the time complexity of merge sort?\n\nA) O(n)  B) O(n log n)  C) O(n²)  D) O(log n)' },
    { from: 'user', text: 'B' },
    { from: 'bot', text: '✅ Correct! Merge sort is O(n log n). Score: 9/12 🎯' },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-2 p-3 text-white overflow-hidden">
      {/* Telegram header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 bg-[#229ED9]/20 rounded-xl px-3 py-2 border border-[#229ED9]/30"
      >
        <FaTelegram className="text-[#229ED9] text-base" />
        <div>
          <div className="text-[9px] font-bold">@ExitExamBot</div>
          <div className="text-[7px] text-white/50">1,420 students active</div>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-[7px] text-green-300">Online</span>
        </div>
      </motion.div>

      {/* Chat messages */}
      <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.from === 'bot' ? -10 : 10 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 + i * 0.15 }}
            className={`max-w-[85%] ${m.from === 'user' ? 'self-end' : 'self-start'}`}
          >
            <div className={`text-[8px] leading-relaxed px-2.5 py-1.5 rounded-xl whitespace-pre-line ${
              m.from === 'bot'
                ? 'bg-white/12 text-white/85 border border-white/10'
                : 'bg-[#229ED9]/40 text-white border border-[#229ED9]/20'
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Score tracker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1.1 }}
        className="bg-white/8 rounded-xl border border-white/10 p-2 flex items-center gap-3"
      >
        <FaDatabase className="text-[#229ED9] text-sm flex-shrink-0" />
        <div className="flex-1">
          <div className="text-[8px] text-white/60 mb-1">Progress Tracker</div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={active ? { width: '75%' } : {}}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-[#229ED9] to-teal-400 rounded-full"
            />
          </div>
        </div>
        <span className="text-[9px] font-bold text-[#229ED9]">75%</span>
      </motion.div>
    </div>
  );
};

// ─── Demo screens map ─────────────────────────────────────────────────────────
const DEMO_SCREENS: Record<number, React.FC<{ active: boolean }>> = {
  1: SMSDemoScreen,
  2: HRMSDemoScreen,
  3: ProLinkDemoScreen,
  4: TelegramBotDemoScreen,
};

const DEFAULT_DEMO_SCREEN: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="w-full h-full flex items-center justify-center text-white/40">
    <FaLaptopCode className="text-3xl" />
  </div>
);

// ─── Project icon map ─────────────────────────────────────────────────────────
const PROJECT_ICONS: Record<number, React.ReactNode> = {
  1: <FaUsers className="text-2xl" />,
  2: <FaShieldAlt className="text-2xl" />,
  3: <FaNetworkWired className="text-2xl" />,
  4: <FaTelegram className="text-2xl" />,
};

// ─── Main Component ───────────────────────────────────────────────────────────
interface ProjectDemoShowcaseProps {
  projects: Project[];
  onOpenDemo?: (project: Project, index: number) => void;
}

const ProjectDemoShowcase: React.FC<ProjectDemoShowcaseProps> = ({ projects, onOpenDemo }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [screenKey, setScreenKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = projects[activeIdx];
  const grad = GRADIENTS[activeIdx % GRADIENTS.length];
  const DemoScreen = DEMO_SCREENS[active?.id] || DEFAULT_DEMO_SCREEN;

  const goTo = (idx: number) => {
    setActiveIdx(idx);
    setScreenKey(k => k + 1);
    setIsPlaying(false);
  };

  const prev = () => goTo((activeIdx - 1 + projects.length) % projects.length);
  const next = () => goTo((activeIdx + 1) % projects.length);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveIdx(i => {
          const next = (i + 1) % projects.length;
          setScreenKey(k => k + 1);
          return next;
        });
      }, 4000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, projects.length]);

  if (!projects.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="w-full mt-24 mb-8"
      id="project-demo-showcase"
    >
      {/* ── Section header ── */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3"
        >
          <FaRocket className="text-[10px]" />
          Interactive Demo
        </motion.div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
          See Projects{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            In Action
          </span>
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-inter">
          Animated live previews of each application's core UI
        </p>
      </div>

      {/* ── Main showcase card ── */}
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-white/8">

          {/* LEFT: Animated mockup screen */}
          <div
            className="relative min-h-[400px] lg:min-h-[500px] flex flex-col overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '22px 22px' }}
              />
            </div>

            {/* Browser chrome top bar */}
            <div className="relative z-10 bg-black/25 backdrop-blur-sm px-4 py-2.5 flex items-center gap-2.5 border-b border-white/10 flex-shrink-0">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 bg-black/30 rounded-md px-3 py-1 text-[9px] text-white/50 font-mono truncate">
                localhost:3000/{active?.name?.toLowerCase().replace(/\s+/g, '-') ?? ''}
              </div>
              {/* Autoplay button */}
              <button
                onClick={() => setIsPlaying(p => !p)}
                className={`flex items-center gap-1.5 text-[9px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                  isPlaying
                    ? 'bg-white/20 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
              >
                <FaPlay className="text-[7px]" />
                {isPlaying ? 'Auto' : 'Play'}
              </button>
            </div>

            {/* Animated demo content */}
            <div className="relative z-10 flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`screen-${screenKey}-${activeIdx}`}
                  initial={{ opacity: 0, scale: 0.97, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <DemoScreen active={true} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <div className="relative z-10 flex justify-between items-center px-4 py-3 bg-black/20 border-t border-white/10 flex-shrink-0">
              <button
                onClick={prev}
                id="demo-prev-btn"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`transition-all rounded-full ${
                      i === activeIdx
                        ? 'w-6 h-2 bg-white'
                        : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                id="demo-next-btn"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>

          {/* RIGHT: Project info panel */}
          <div className="bg-white dark:bg-[#0d1117] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${activeIdx}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col h-full p-6 sm:p-8 gap-5"
              >
                {/* Project number badge + icon */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
                  >
                    {PROJECT_ICONS[active?.id] ?? <FaCode className="text-xl" />}
                  </div>
                  <div className="text-right">
                    <span
                      className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full text-white"
                      style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
                    >
                      App {String(active?.order || activeIdx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Project name */}
                <div>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {active?.name}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed font-inter">
                    {active?.description}
                  </p>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Features', val: active?.features?.length, icon: <FaStar style={{ color: grad.from }} /> },
                    { label: 'Technologies', val: active?.technologies_names?.length, icon: <FaLayerGroup style={{ color: grad.to }} /> },
                    { label: 'Year Built', val: new Date(active?.created_at || Date.now()).getFullYear(), icon: <FaCode style={{ color: grad.accent }} /> },
                  ].map((s, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-white/5 rounded-xl p-3 text-center border border-slate-100 dark:border-white/8">
                      <div className="flex justify-center mb-1">{s.icon}</div>
                      <div className="text-lg font-black text-slate-800 dark:text-white">{s.val}</div>
                      <div className="text-[9px] text-slate-400 uppercase tracking-wide font-inter">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Features list */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Key Features</span>
                    <div className="flex-1 h-px bg-slate-100 dark:bg-white/8" />
                  </div>
                  <div className="space-y-1.5">
                    {active?.features?.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300 font-inter"
                      >
                        <FaCheckCircle className="flex-shrink-0 text-xs" style={{ color: grad.from }} />
                        {f}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech stack pills */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Stack</span>
                    <div className="flex-1 h-px bg-slate-100 dark:bg-white/8" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {active?.technologies_names?.map(tech => (
                      <span
                        key={tech}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-lg border"
                        style={{
                          background: `${grad.from}18`,
                          borderColor: `${grad.from}30`,
                          color: grad.from,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3 pt-2 mt-auto">
                  <a
                    href={formatUrl(active?.github_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`showcase-github-${active?.id}`}
                    className="flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-2xl bg-slate-100 dark:bg-white/8 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold text-sm transition-all border border-slate-200 dark:border-white/8 group"
                  >
                    <FaGithub className="group-hover:scale-110 transition-transform" />
                    Source Code
                  </a>
                  {active?.live_url && active.live_url !== '#' ? (
                    <a
                      href={formatUrl(active.live_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`showcase-live-${active?.id}`}
                      className="flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-2xl font-bold text-sm text-white transition-all group hover:-translate-y-0.5 shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
                    >
                      <FaExternalLinkAlt className="text-xs group-hover:scale-110 transition-transform" />
                      Live Demo
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenDemo && active && onOpenDemo(active, activeIdx)}
                      id={`showcase-live-${active?.id}`}
                      className="flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-2xl font-bold text-sm text-white transition-all group hover:-translate-y-0.5 shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
                    >
                      <FaRocket className="text-xs group-hover:scale-110 transition-transform" />
                      Explore Demo
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Project selector thumbnails */}
        <div className="flex gap-3 mt-5 justify-center flex-wrap">
          {projects.map((p, i) => {
            const g = GRADIENTS[i % GRADIENTS.length];
            return (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                id={`demo-thumb-${p.id}`}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all duration-300 text-sm font-semibold ${
                  i === activeIdx
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slatebg-card text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:scale-105 hover:shadow-md'
                }`}
                style={i === activeIdx ? {
                  background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                  borderColor: 'transparent',
                } : {}}
              >
                <span>{PROJECT_ICONS[p.id] ?? <FaCode />}</span>
                <span className="hidden sm:block text-xs">{p.name.split(' ').slice(0, 2).join(' ')}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectDemoShowcase;
