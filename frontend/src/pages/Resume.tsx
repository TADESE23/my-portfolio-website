import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import api from '../services/api';
import { Education, Experience, Profile } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';

const DEFAULT_EDUCATION: Education[] = [
  {
    id: 1,
    institution: 'Addis Ababa University',
    degree: 'Bachelor of Science',
    field_of_study: 'Computer Science',
    start_date: '2020-10-01',
    end_date: '2024-07-05',
    description: 'Graduated with high distinction. Covered advanced topics including Data Structures, Algorithms, Software Engineering, Artificial Intelligence, Database Management Systems, and Machine Learning.',
    current: false
  }
];

const DEFAULT_EXPERIENCE: Experience[] = [
  {
    id: 1,
    company: 'University of Gondar',
    position: 'Full Stack Developer',
    location: 'Gondar',
    start_date: '2023-07-01',
    end_date: '2023-10-31',
    description: 'Developed and optimized frontend interfaces using React and Tailwind CSS. Built REST API endpoints in Node.js/Express. Wrote unit tests and automated builds via GitHub Actions.',
    current: false
  }
];

const Resume: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [education, setEducation] = useState<Education[]>(DEFAULT_EDUCATION);
  const [experience, setExperience] = useState<Experience[]>(DEFAULT_EXPERIENCE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const results = await Promise.allSettled([
          api.get('/resume/profile/'),
          api.get('/resume/education/'),
          api.get('/resume/experience/'),
        ]);

        const profileRes = results[0].status === 'fulfilled' ? results[0].value : null;
        const eduRes = results[1].status === 'fulfilled' ? results[1].value : null;
        const expRes = results[2].status === 'fulfilled' ? results[2].value : null;

        if (profileRes?.data && profileRes.data.length > 0) {
          setProfile(profileRes.data[0]);
        }
        if (eduRes?.data && eduRes.data.length > 0) {
          setEducation(eduRes.data);
        }
        if (expRes?.data && expRes.data.length > 0) {
          setExperience(expRes.data);
        }
      } catch (err) {
        console.warn('API connection fallback active');
      }
    };
    fetchResumeData();
  }, []);

  const localCvUrl = profile?.cv || '#';
  const localEdu: Education[] = education;
  const localExp: Experience[] = experience;

  return (
    <section className="min-h-screen py-28 bg-slate-50 dark:bg-slatebg-dark transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Download Link Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-16 pb-8 border-b border-slate-200 dark:border-slatebg-border/60">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              My Interactive Resume
            </h2>
            <p className="text-sm text-slatefg-muted dark:text-slatefg-dark/80 mt-1 font-inter">
              A comprehensive history of my professional and academic background.
            </p>
          </div>

          <a
            href={localCvUrl}
            download="Tadese_Mesfin_CV.pdf"
            className="flex items-center gap-2 bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-2xl shadow-md hover:-translate-y-0.5 transition-all duration-300 font-inter text-sm"
          >
            <FaDownload /> Download PDF CV
          </a>
        </div>

        {/* Resume Timeline grid split */}
        <div className="space-y-16">
          
          {/* Work Experience */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <FaBriefcase className="text-primary w-5 h-5" /> Work Experience
            </h3>

            <div className="relative border-l-2 border-slate-200 dark:border-slatebg-border pl-8 ml-3 space-y-12">
              {loading ? (
                <LoadingSkeleton type="list" count={1} />
              ) : (
                localExp.map((exp) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative space-y-2"
                  >
                    {/* Ring indicator */}
                    <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-slate-100 dark:bg-slatebg-card border-4 border-primary" />
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <h4 className="text-lg font-bold text-slate-800 dark:text-white">
                        {exp.position}
                      </h4>
                      <span className="text-xs font-semibold text-primary dark:text-secondary-light font-inter">
                        {new Date(exp.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {
                          exp.current ? 'Present' : exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''
                        }
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slatefg-muted dark:text-slatefg-dark/80 font-inter">
                      {exp.company} &bull; {exp.location}
                    </p>
                    <p className="text-xs sm:text-sm text-slatefg-muted dark:text-slatefg-dark/70 font-inter leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Academic Education */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              <FaGraduationCap className="text-secondary w-5 h-5" /> Education
            </h3>

            <div className="relative border-l-2 border-slate-200 dark:border-slatebg-border pl-8 ml-3 space-y-12">
              {loading ? (
                <LoadingSkeleton type="list" count={1} />
              ) : (
                localEdu.map((edu) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative space-y-2"
                  >
                    {/* Ring indicator */}
                    <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-slate-100 dark:bg-slatebg-card border-4 border-secondary" />

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <h4 className="text-lg font-bold text-slate-800 dark:text-white">
                        {edu.degree} in {edu.field_of_study}
                      </h4>
                      <span className="text-xs font-semibold text-secondary dark:text-secondary-light font-inter">
                        {new Date(edu.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {
                          edu.current ? 'Present' : edu.end_date ? new Date(edu.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''
                        }
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slatefg-muted dark:text-slatefg-dark/80 font-inter">
                      {edu.institution}
                    </p>
                    <p className="text-xs sm:text-sm text-slatefg-muted dark:text-slatefg-dark/70 font-inter leading-relaxed whitespace-pre-line">
                      {edu.description}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Resume;
