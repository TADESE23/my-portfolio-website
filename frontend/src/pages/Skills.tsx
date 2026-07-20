import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaPython, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, 
  FaGithub, FaDocker, FaBootstrap, FaCode 
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiDjango, SiFlask, 
  SiFastapi, SiExpress, SiMysql, SiMongodb, SiTensorflow 
} from 'react-icons/si';
import { DiPostgresql } from 'react-icons/di';
import { IoLogoJavascript } from 'react-icons/io';
import api from '../services/api';
import { Skill } from '../types';

// Icon Renderer mapping
const getSkillIcon = (iconName: string, skillName: string) => {
  const name = (iconName || skillName).toLowerCase().replace(/[^a-z0-9]/g, '');
  
  switch (name) {
    case 'react':
    case 'fareact':
      return <FaReact className="w-8 h-8 text-sky-400" />;
    case 'nextjs':
    case 'sinextdotjs':
      return <SiNextdotjs className="w-8 h-8 text-black dark:text-white" />;
    case 'javascript':
    case 'iologojavascript':
      return <IoLogoJavascript className="w-8 h-8 text-amber-400" />;
    case 'typescript':
    case 'sitypescript':
      return <SiTypescript className="w-8 h-8 text-blue-500" />;
    case 'tailwindcss':
    case 'sitailwindcss':
      return <SiTailwindcss className="w-8 h-8 text-teal-400" />;
    case 'bootstrap':
    case 'fabootstrap':
      return <FaBootstrap className="w-8 h-8 text-purple-600" />;
    case 'html5':
    case 'html':
    case 'fahtml5':
      return <FaHtml5 className="w-8 h-8 text-orange-500" />;
    case 'css3':
    case 'css':
    case 'facss3alt':
      return <FaCss3Alt className="w-8 h-8 text-blue-600" />;
    case 'python':
    case 'fapython':
      return <FaPython className="w-8 h-8 text-yellow-500" />;
    case 'django':
    case 'sidjango':
      return <SiDjango className="w-8 h-8 text-emerald-600" />;
    case 'flask':
    case 'siflask':
      return <SiFlask className="w-8 h-8 text-slate-500" />;
    case 'fastapi':
    case 'sifastapi':
      return <SiFastapi className="w-8 h-8 text-emerald-500" />;
    case 'nodejs':
    case 'fanodejs':
      return <FaNodeJs className="w-8 h-8 text-green-500" />;
    case 'express':
    case 'siexpress':
      return <SiExpress className="w-8 h-8 text-slate-600" />;
    case 'mysql':
    case 'simysql':
      return <SiMysql className="w-8 h-8 text-sky-600" />;
    case 'postgresql':
    case 'postgres':
    case 'dipostgresql':
      return <DiPostgresql className="w-8 h-8 text-indigo-500" />;
    case 'mongodb':
    case 'simongodb':
      return <SiMongodb className="w-8 h-8 text-green-600" />;
    case 'tensorflow':
    case 'sitensorflow':
      return <SiTensorflow className="w-8 h-8 text-orange-500" />;
    case 'git':
    case 'fagitalt':
      return <FaGitAlt className="w-8 h-8 text-orange-600" />;
    case 'github':
    case 'fagithub':
      return <FaGithub className="w-8 h-8 text-slate-800 dark:text-white" />;
    case 'docker':
    case 'fadocker':
      return <FaDocker className="w-8 h-8 text-sky-500" />;
    default:
      return <FaCode className="w-8 h-8 text-primary" />;
  }
};

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills/');
        setSkills(res.data);
      } catch (err) {
        console.warn('API error, using static fallback skills list');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const localSkills: Skill[] = skills.length > 0 ? skills : [
    // Frontend
    { id: 1, name: 'React', percentage: 90, category: 'frontend', icon: 'FaReact' },
    { id: 2, name: 'Next.js', percentage: 80, category: 'frontend', icon: 'SiNextdotjs' },
    { id: 3, name: 'JavaScript', percentage: 92, category: 'frontend', icon: 'IoLogoJavascript' },
    { id: 4, name: 'TypeScript', percentage: 85, category: 'frontend', icon: 'SiTypescript' },
    { id: 5, name: 'TailwindCSS', percentage: 95, category: 'frontend', icon: 'SiTailwindcss' },
    { id: 6, name: 'Bootstrap', percentage: 85, category: 'frontend', icon: 'FaBootstrap' },
    { id: 7, name: 'HTML5', percentage: 98, category: 'frontend', icon: 'FaHtml5' },
    { id: 8, name: 'CSS3', percentage: 92, category: 'frontend', icon: 'FaCss3Alt' },
    
    // Backend
    { id: 9, name: 'Django', percentage: 88, category: 'backend', icon: 'SiDjango' },
    { id: 10, name: 'Flask', percentage: 75, category: 'backend', icon: 'SiFlask' },
    { id: 11, name: 'FastAPI', percentage: 80, category: 'backend', icon: 'SiFastapi' },
    { id: 12, name: 'Node.js', percentage: 85, category: 'backend', icon: 'FaNodeJs' },
    { id: 13, name: 'Express', percentage: 82, category: 'backend', icon: 'SiExpress' },
    
    // Database
    { id: 14, name: 'MySQL', percentage: 85, category: 'database', icon: 'SiMysql' },
    { id: 15, name: 'PostgreSQL', percentage: 88, category: 'database', icon: 'DiPostgresql' },
    { id: 16, name: 'MongoDB', percentage: 78, category: 'database', icon: 'SiMongodb' },
    
    // AI
    { id: 17, name: 'TensorFlow', percentage: 75, category: 'ai', icon: 'SiTensorflow' },
    
    // Programming
    { id: 18, name: 'Python', percentage: 90, category: 'programming', icon: 'FaPython' },
    
    // Tools
    { id: 19, name: 'Git', percentage: 90, category: 'tools', icon: 'FaGitAlt' },
    { id: 20, name: 'GitHub', percentage: 92, category: 'tools', icon: 'FaGithub' },
    { id: 21, name: 'Docker', percentage: 80, category: 'tools', icon: 'FaDocker' }
  ];

  const categories = [
    { key: 'frontend', label: 'Frontend Stack' },
    { key: 'backend', label: 'Backend Development' },
    { key: 'database', label: 'Database Architectures' },
    { key: 'programming', label: 'Programming Languages' },
    { key: 'ai', label: 'Artificial Intelligence & ML' },
    { key: 'tools', label: 'DevOps & Tooling' }
  ];

  return (
    <section className="min-h-screen py-28 bg-slate-50 dark:bg-slatebg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            My Technical Skills
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-primary mx-auto mt-4 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slatefg-muted dark:text-slatefg-dark/80 mt-4 text-base font-inter"
          >
            A breakdown of my software engineering capabilities and technologies I use daily.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {categories.map((cat, catIdx) => {
            const catSkills = localSkills.filter(s => s.category === cat.key);
            if (catSkills.length === 0) return null;

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.05 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-slate-800 dark:text-white border-l-4 border-primary pl-3">
                  {cat.label}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catSkills.map((skill, idx) => (
                    <motion.div
                      key={skill.id}
                      whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}
                      className="glass-panel p-6 rounded-2xl flex items-center gap-4 border border-slate-200/50 dark:border-slatebg-border/30"
                    >
                      {/* Left Icon */}
                      <div className="p-3 bg-slate-100 dark:bg-slatebg-card rounded-xl">
                        {getSkillIcon(skill.icon, skill.name)}
                      </div>

                      {/* Right Competency progress */}
                      <div className="flex-grow space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm text-slate-800 dark:text-slatefg-dark">
                            {skill.name}
                          </span>
                          <span className="text-xs font-semibold text-primary dark:text-secondary-light font-inter">
                            {skill.percentage}%
                          </span>
                        </div>
                        {/* Progress Bar Container */}
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.05 }}
                            className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;
