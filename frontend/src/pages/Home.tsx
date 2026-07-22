import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDownload, FaArrowRight, FaGithub, FaLinkedin, FaTelegramPlane } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import { fadeUp, staggerContainer, floatingIcon } from '../animations/framer';
import api from '../services/api';
import { fetchGithubStats } from '../services/github';

// Custom Typing Hook for high-performance React typing effect
const useTypewriter = (words: string[], speed = 100, delay = 1500) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: number;
    const word = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length - 1));
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length + 1));
      }, speed);
    }

    if (!isDeleting && currentText === word) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((currentWordIndex + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay]);

  return currentText;
};

// Animated Counter component
const Counter: React.FC<{ target: number; duration?: number }> = ({ target, duration = 1.5 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (end === 0) return;
    
    const increment = end / (duration * 60);
    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(handle);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(handle);
  }, [target, duration]);

  return <>{count}</>;
};

const Home: React.FC = () => {
  const typingText = useTypewriter([
    'Full Stack Software Engineer',
    'AI & Deep Learning Enthusiast',
    'Data Science Aspirant',
    'Problem Solver'
  ], 80, 1500);

  const [stats, setStats] = useState({
    projects: 4,
    skills: 22,
    blogs: 2,
    githubRepos: 0
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch stats and profile details from local APIs
    const loadHomeData = async () => {
      try {
        const [projRes, skillRes, blogRes, profRes, gitStats] = await Promise.all([
          api.get('/projects/'),
          api.get('/skills/'),
          api.get('/blogs/'),
          api.get('/resume/profile/'),
          fetchGithubStats()
        ]);
        
        setStats({
          projects: projRes.data.length || 4,
          skills: skillRes.data.length || 22,
          blogs: blogRes.data.length || 2,
          githubRepos: gitStats?.public_repos || 12
        });

        if (profRes.data && profRes.data.length > 0) {
          const profile = profRes.data[0];
          if (profile.profile_image) {
            setProfileImage(profile.profile_image);
          }
          if (profile.cv) {
            setCvUrl(profile.cv);
          }
        }
      } catch (err) {
        console.warn('API connection failed, falling back to mock counts');
      }
    };
    loadHomeData();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-50 dark:bg-slatebg-dark py-20 px-4 md:px-8">
      {/* Dynamic Canvas Particles */}
      <ParticlesBackground />

      {/* Decorative Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl dark:bg-primary/5 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl dark:bg-secondary/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12 md:mb-16">
        {/* Left Intro Info */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          <motion.div variants={fadeUp(0)} className="inline-block px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary tracking-wide uppercase font-inter">
            Welcome to my universe
          </motion.div>
          
          <motion.h1 variants={fadeUp(0.15)} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Hi, I'm <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Tadese Mesfin</span>
          </motion.h1>

          {/* Typing Line */}
          <motion.div variants={fadeUp(0.3)} className="h-8 md:h-10 text-lg md:text-2xl font-medium text-slatefg-muted dark:text-slatefg-dark/80">
            <span>{typingText}</span>
            <span className="animate-ping text-primary">|</span>
          </motion.div>

          <motion.p variants={fadeUp(0.45)} className="text-base text-slatefg-muted dark:text-slatefg-dark/75 max-w-xl mx-auto lg:mx-0 leading-relaxed font-inter">
            A Computer Science graduate eager to build next-generation software systems, analyze high-velocity datasets, and develop robust, intelligent web applications. Seeking global scholarships in AI and Data Science.
          </motion.p>

          {/* Actions */}
          <motion.div variants={fadeUp(0.6)} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <a
              href={cvUrl || '#'}
              download="Tadese_Mesfin_CV.pdf"
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaDownload className="text-sm" /> Download CV
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-white dark:bg-slatebg-card hover:bg-slate-100 dark:hover:bg-slatebg-border text-slate-800 dark:text-white font-semibold py-3 px-6 rounded-2xl border border-slate-200 dark:border-slatebg-border hover:-translate-y-0.5 transition-all duration-300 shadow-md"
            >
              Contact Me <FaArrowRight className="text-xs" />
            </Link>
          </motion.div>

          {/* Quick Socials */}
          <motion.div variants={fadeUp(0.75)} className="flex justify-center lg:justify-start gap-4 pt-6 text-slatefg-muted dark:text-slatefg-dark/60">
            <a href="https://github.com/TADESE23" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
              <FaGithub className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/tadese-mesfin-mesfin-045412398" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="https://t.me/Mtade23" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
              <FaTelegramPlane className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Graphic / Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-5 flex justify-center"
        >
          <motion.div
            variants={floatingIcon}
            animate="animate"
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
          >
            {/* Background glowing rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent animate-spin-slow opacity-20 dark:opacity-30 blur-md" />
            <div className="absolute inset-4 rounded-full bg-white dark:bg-slatebg-dark z-10" />
            
            {/* Profile Avatar Frame */}
            <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-primary/30 z-20 shadow-2xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slatebg-card dark:to-slate-800 flex items-center justify-center">
              {profileImage ? (
                <img
                  src={profileImage.startsWith('http') ? profileImage : `http://127.0.0.1:8000${profileImage}`}
                  alt="Tadese Mesfin"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <span className="text-6xl sm:text-7xl block mb-2">👨‍💻</span>
                  <span className="text-xs font-bold font-inter text-slatefg-muted">Tadese Mesfin</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Statistics Overlay bottom */}
      <div className="w-full max-w-4xl mx-auto z-10 mt-6 md:mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {[
            { label: 'Completed Projects', val: stats.projects, suffix: '+', to: '/projects', icon: '🚀' },
            { label: 'Core Skills Stack', val: stats.skills, suffix: '', to: '/skills', icon: '⚡' },
            { label: 'GitHub Repositories', val: stats.githubRepos, suffix: '', to: 'https://github.com/TADESE23', icon: '🐙', external: true },
            { label: 'Blog Posts', val: stats.blogs, suffix: '', to: '/blog', icon: '✍️' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.07, y: -6 }}
              whileTap={{ scale: 0.97 }}
            >
              {item.external ? (
                <a
                  href={item.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block glass-panel p-4 rounded-2xl text-center shadow-md border border-slate-200/50 dark:border-slatebg-border/30 hover:border-primary/60 dark:hover:border-secondary/60 hover:shadow-primary/20 hover:shadow-xl transition-all duration-300 cursor-pointer no-underline"
                >
                  <span className="text-lg block mb-0.5">{item.icon}</span>
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-primary dark:text-secondary-light group-hover:text-secondary dark:group-hover:text-primary transition-colors duration-200">
                    <Counter target={item.val} />{item.suffix}
                  </h3>
                  <p className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/60 uppercase font-inter mt-1 leading-snug group-hover:text-primary dark:group-hover:text-secondary-light transition-colors duration-200">
                    {item.label}
                  </p>
                  <span className="text-[10px] text-primary/60 dark:text-secondary/60 group-hover:text-primary dark:group-hover:text-secondary font-semibold mt-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-200 tracking-wider">
                    VIEW →
                  </span>
                </a>
              ) : (
                <Link
                  to={item.to}
                  className="group block glass-panel p-4 rounded-2xl text-center shadow-md border border-slate-200/50 dark:border-slatebg-border/30 hover:border-primary/60 dark:hover:border-secondary/60 hover:shadow-primary/20 hover:shadow-xl transition-all duration-300 cursor-pointer no-underline"
                >
                  <span className="text-lg block mb-0.5">{item.icon}</span>
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-primary dark:text-secondary-light group-hover:text-secondary dark:group-hover:text-primary transition-colors duration-200">
                    <Counter target={item.val} />{item.suffix}
                  </h3>
                  <p className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/60 uppercase font-inter mt-1 leading-snug group-hover:text-primary dark:group-hover:text-secondary-light transition-colors duration-200">
                    {item.label}
                  </p>
                  <span className="text-[10px] text-primary/60 dark:text-secondary/60 group-hover:text-primary dark:group-hover:text-secondary font-semibold mt-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-200 tracking-wider">
                    VIEW →
                  </span>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
