import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaAward, FaEye, FaBullseye, FaFlag } from 'react-icons/fa';
import { fadeUp, staggerContainer, zoomIn } from '../animations/framer';
import api from '../services/api';
import { Education, Experience, Profile } from '../types';

const About: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const [profileRes, eduRes, expRes] = await Promise.all([
          api.get('/resume/profile/'),
          api.get('/resume/education/'),
          api.get('/resume/experience/'),
        ]);

        if (profileRes.data && profileRes.data.length > 0) {
          setProfile(profileRes.data[0]);
        }
        setEducation(eduRes.data);
        setExperience(expRes.data);
      } catch (err) {
        console.warn('API error fetching resume details, using fallback data');
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const localProfile = profile || {
    name: 'Tadese Mesfin',
    title: 'Full Stack Developer | AI Enthusiast | Data Science Aspirant',
    about: 'I am a Computer Science graduate passionate about Full Stack Development, Artificial Intelligence, Data Science, and Software Engineering. I enjoy building scalable web applications using React, Django, Node.js, MySQL, PostgreSQL, TensorFlow, and Python. I am currently seeking international Master\'s scholarships in Artificial Intelligence and Data Science.',
    mission: 'To build intelligent, high-performance software solutions that bridge the gap between human capabilities and automated machine intelligence.',
    vision: 'To become a pioneering researcher and lead engineering teams in developing ethical, scalable AI applications that solve global challenges.',
    goals: 'Secure an international Master\'s scholarship in AI/Data Science; build impact-driven open-source projects; refine production deployment pipelines.',
    achievements: 'Graduated with High Distinction in Computer Science; Designed and deployed 4+ production-level web applications; Scaled networking platform userbase.',
  };

  const achievementsList = localProfile.achievements
    ? localProfile.achievements.split(';').map(item => item.trim()).filter(Boolean)
    : [
        'Graduated with High Distinction in Computer Science',
        'Designed and deployed 4+ production-level web applications',
        'Scaled networking platform userbase',
        'Built exit exam bot supporting hundreds of students',
      ];

  const goalsList = localProfile.goals
    ? localProfile.goals.split(';').map(item => item.trim()).filter(Boolean)
    : [
        "Secure an international Master's scholarship in AI/Data Science",
        'Build impact-driven open-source software',
        'Refine production cloud deployment architectures',
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
            About Me
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
            My story, objectives, education journey, and career roadmap.
          </motion.p>
        </div>

        {/* Introduction & Achievements Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel p-8 rounded-3xl shadow-sm space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Professional Journey</h3>
            <p className="text-slatefg-muted dark:text-slatefg-dark/80 leading-relaxed font-inter whitespace-pre-line text-sm sm:text-base">
              {localProfile.about}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 dark:from-slatebg-card dark:to-slatebg-card p-8 rounded-3xl border border-primary/20 shadow-md space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary dark:text-secondary-light flex items-center gap-2">
              <FaAward /> Key Achievements
            </h3>
            <ul className="space-y-4">
              {achievementsList.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 text-slate-800 dark:text-slatefg-dark/85 font-inter text-sm"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Mission, Vision, Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: 'My Mission', content: localProfile.mission || 'To build intelligent, high-performance software solutions.', icon: <FaFlag className="text-primary w-6 h-6" /> },
            { title: 'My Vision', content: localProfile.vision || 'To become a pioneering researcher and lead ethical engineering teams.', icon: <FaEye className="text-secondary w-6 h-6" /> },
            { title: 'My Goals', list: goalsList, icon: <FaBullseye className="text-accent w-6 h-6" /> }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-panel p-8 rounded-3xl shadow-md flex flex-col items-center text-center space-y-4 border border-slate-200/50 dark:border-slatebg-border/30"
            >
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slatebg-card shadow-inner">
                {card.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white">{card.title}</h4>
              
              {card.list ? (
                <ul className="text-left w-full space-y-2 text-xs text-slatefg-muted dark:text-slatefg-dark/80 font-inter">
                  {card.list.map((g, gIdx) => (
                    <li key={gIdx} className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slatefg-muted dark:text-slatefg-dark/80 font-inter leading-relaxed">
                  {card.content}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Timeline Grid (Edu & Exp) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3 border-b pb-4 border-slate-200 dark:border-slatebg-border">
              <FaGraduationCap className="text-primary w-7 h-7" /> Education
            </h3>

            <div className="relative pl-6 border-l-2 border-primary/30 space-y-8">
              {loading ? (
                <div className="h-20 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-xl" />
              ) : education.length > 0 ? (
                education.map((edu, idx) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative bg-white dark:bg-slatebg-card p-6 rounded-2xl border border-slate-200/50 dark:border-slatebg-border/30 shadow-sm"
                  >
                    {/* Ring dot */}
                    <div className="absolute -left-[33px] top-7 w-4 h-4 rounded-full bg-primary border-4 border-slate-50 dark:border-slatebg-dark" />
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full font-inter">
                      {edu.start_date.split('-')[0]} - {edu.current ? 'Present' : edu.end_date?.split('-')[0]}
                    </span>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mt-3">{edu.degree}</h4>
                    <p className="text-sm font-semibold text-slatefg-muted dark:text-slatefg-dark/80">{edu.institution} | {edu.field_of_study}</p>
                    <p className="text-xs text-slatefg-muted dark:text-slatefg-dark/70 mt-2 font-inter leading-relaxed">{edu.description}</p>
                  </motion.div>
                ))
              ) : (
                <div className="relative bg-white dark:bg-slatebg-card p-6 rounded-2xl border border-slate-200/50 dark:border-slatebg-border/30 shadow-sm">
                  <div className="absolute -left-[33px] top-7 w-4 h-4 rounded-full bg-primary border-4 border-slate-50 dark:border-slatebg-dark" />
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full font-inter">2020 - 2024</span>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white mt-3">Bachelor of Science in Computer Science</h4>
                  <p className="text-sm font-semibold text-slatefg-muted dark:text-slatefg-dark/80">Addis Ababa University</p>
                  <p className="text-xs text-slatefg-muted dark:text-slatefg-dark/70 mt-2 font-inter leading-relaxed">
                    Graduated with High Distinction. Covered algorithms, software engineering, databases, computer networks, and data analytics.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3 border-b pb-4 border-slate-200 dark:border-slatebg-border">
              <FaBriefcase className="text-secondary w-7 h-7" /> Professional Experience
            </h3>

            <div className="relative pl-6 border-l-2 border-secondary/30 space-y-8">
              {loading ? (
                <div className="h-20 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-xl" />
              ) : experience.length > 0 ? (
                experience.map((exp, idx) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative bg-white dark:bg-slatebg-card p-6 rounded-2xl border border-slate-200/50 dark:border-slatebg-border/30 shadow-sm"
                  >
                    {/* Ring dot */}
                    <div className="absolute -left-[33px] top-7 w-4 h-4 rounded-full bg-secondary border-4 border-slate-50 dark:border-slatebg-dark" />
                    <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full font-inter">
                      {exp.start_date.split('-')[0]} - {exp.current ? 'Present' : exp.end_date?.split('-')[0]}
                    </span>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mt-3">{exp.position}</h4>
                    <p className="text-sm font-semibold text-slatefg-muted dark:text-slatefg-dark/80">{exp.company} | {exp.location}</p>
                    <p className="text-xs text-slatefg-muted dark:text-slatefg-dark/70 mt-2 font-inter leading-relaxed">{exp.description}</p>
                  </motion.div>
                ))
              ) : (
                <div className="relative bg-white dark:bg-slatebg-card p-6 rounded-2xl border border-slate-200/50 dark:border-slatebg-border/30 shadow-sm">
                  <div className="absolute -left-[33px] top-7 w-4 h-4 rounded-full bg-secondary border-4 border-slate-50 dark:border-slatebg-dark" />
                  <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full font-inter">2023 - 2023</span>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white mt-3">Full Stack Developer Intern</h4>
                  <p className="text-sm font-semibold text-slatefg-muted dark:text-slatefg-dark/80">Local Tech Startup</p>
                  <p className="text-xs text-slatefg-muted dark:text-slatefg-dark/70 mt-2 font-inter leading-relaxed">
                    Designed reactive layout modules, developed server-side logic in Node.js, and wrote documentation schemas.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
