import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';
import api, { getImageUrl } from '../services/api';
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

  const defaultCerts: Certificate[] = [
    {
      id: 1,
      name: '5 Million Ethiopian Coders Initiative',
      issuer: 'Programming Basics',
      date: '2024-01-01',
      image: null,
      description: 'Completed the foundational programming training as part of the 5 Million Ethiopian Coders initiative.',
      url: ''
    },
    {
      id: 2,
      name: 'Overview of AI Completion',
      issuer: 'Huawei',
      date: '2024-03-10',
      image: null,
      description: 'Completed the overview of Artificial Intelligence course provided by Huawei.',
      url: ''
    },
    {
      id: 3,
      name: 'Cybersecurity and Networking Fundamentals',
      issuer: 'KG CYBER (Kibir Gasha Cyber PLC)',
      date: '2024-05-15',
      image: null,
      description: 'Successfully completed the two-month Cybersecurity and Networking Fundamentals Training Program aligned with the ISC2 Certified in Cybersecurity (CC) domains.',
      url: ''
    },
    {
      id: 4,
      name: 'Student Startup Competition - Top Winner',
      issuer: 'University of Gondar',
      date: '2025-11-20',
      image: null,
      description: 'In recognition of outstanding achievement as one of the Top Winners in the Student Startup Competition, held at the University of Gondar.',
      url: ''
    }
  ];

  // Combine fetched certificates with default list, filtering out any duplicates by name
  const displayCerts: Certificate[] = certs.length > 0
    ? [...certs, ...defaultCerts.filter(d => !certs.some(c => c.name.toLowerCase() === d.name.toLowerCase()))]
    : defaultCerts;

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
            Professional certifications validating my expertise in Software Engineering, Programming Basics, AI, Cybersecurity, and Innovation.
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {loading ? (
            <LoadingSkeleton type="card" count={2} />
          ) : displayCerts.map((cert, idx) => (
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
                {cert.image ? (
                  <img
                    src={getImageUrl(cert.image)}
                    alt={cert.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl shadow-sm border border-slate-200 dark:border-slatebg-border/30"
                  />
                ) : (
                  <div className="p-4 sm:p-5 rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 flex items-center justify-center">
                    <FaCertificate className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                )}
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
