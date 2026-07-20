import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';
import api from '../services/api';
import { Certificate } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Certifications: React.FC = () => {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await api.get('/resume/certificates/');
        setCerts(res.data);
      } catch (err) {
        console.warn('API error, using static fallback certifications list');
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  const localCerts: Certificate[] = certs.length > 0 ? certs : [
    {
      id: 1,
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta (via Coursera)',
      date: '2024-02-15',
      image: null,
      description: 'Comprehensive 9-course program covering JavaScript, React, UI/UX, version control with Git, and frontend testing methodologies.',
      url: 'https://coursera.org/verify/meta-frontend'
    },
    {
      id: 2,
      name: 'DeepLearning.AI TensorFlow Developer Specialization',
      issuer: 'DeepLearning.AI (via Coursera)',
      date: '2024-05-20',
      image: null,
      description: 'Specialization covering neural network construction, computer vision, natural language processing, and time-series predictions in TensorFlow.',
      url: 'https://coursera.org/verify/tensorflow-developer'
    }
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
            Certifications
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
            Professional certifications validating my knowledge in Software Engineering, AI, and Front-End frameworks.
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {loading ? (
            <LoadingSkeleton type="card" count={2} />
          ) : localCerts.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slatebg-card border border-slate-200/50 dark:border-slatebg-border/30 rounded-3xl p-6 md:p-8 flex gap-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Left icon branding */}
              <div className="flex-shrink-0">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 flex items-center justify-center">
                  <FaCertificate className="w-8 h-8" />
                </div>
              </div>

              {/* Right content details */}
              <div className="flex-grow space-y-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-snug">
                    {cert.name}
                  </h3>
                  <p className="text-sm font-semibold text-slatefg-muted dark:text-slatefg-dark/85 font-inter">
                    Issued by: {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slatefg-muted dark:text-slatefg-dark/60 font-inter">
                  <FaCalendarAlt />
                  <span>
                    Issued: {new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slatefg-muted dark:text-slatefg-dark/80 font-inter leading-relaxed">
                  {cert.description}
                </p>

                {cert.url && (
                  <div className="pt-2">
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-dark dark:text-secondary-light font-bold hover:underline font-inter"
                    >
                      Verify Credentials <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
