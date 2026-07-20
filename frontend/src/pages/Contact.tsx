import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaPen, FaPaperPlane, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTelegramPlane } from 'react-icons/fa';
import api from '../services/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      await api.post('/contact/messages/', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Failed to send message. Please try again.');
    }
  };

  const contactChannels = [
    { title: 'Email Address', value: 'tadesemesfin23@gmail.com', icon: <FaEnvelope className="text-primary w-5 h-5" />, href: 'mailto:tadesemesfin23@gmail.com' },
    { title: 'Phone / Telegram', value: '+251 900 000 000', icon: <FaPhone className="text-secondary w-5 h-5" />, href: 'https://t.me/Mtade23' },
    { title: 'Base Location', value: 'Addis Ababa, Ethiopia', icon: <FaMapMarkerAlt className="text-accent w-5 h-5" />, href: '#' }
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/TADESE23', icon: <FaGithub className="w-5 h-5" /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tadese-mesfin', icon: <FaLinkedin className="w-5 h-5" /> },
    { name: 'Telegram', url: 'https://t.me/Mtade23', icon: <FaTelegramPlane className="w-5 h-5" /> }
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
            Get In Touch
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
            Feel free to reach out for collaborations, project consulting, or scholarship opportunity advice.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          {/* Left Channel Grid */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Contact Details</h3>
            
            {contactChannels.map((channel, idx) => (
              <motion.a
                key={idx}
                href={channel.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="block p-6 bg-white dark:bg-slatebg-card border border-slate-200/50 dark:border-slatebg-border/30 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 dark:bg-slatebg-border rounded-xl">
                    {channel.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/60 uppercase tracking-wider font-inter">
                      {channel.title}
                    </h4>
                    <p className="text-sm font-bold text-slate-800 dark:text-slatefg-dark mt-1 font-inter">
                      {channel.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Socials Connection */}
            <div className="pt-4 space-y-4">
              <h4 className="font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider font-inter">
                Follow My Developments
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-white hover:bg-primary dark:bg-slatebg-card dark:hover:bg-primary text-slatefg-muted dark:text-slatefg-dark hover:text-white dark:hover:text-white border border-slate-200 dark:border-slatebg-border/30 shadow-sm transition-all duration-300"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white dark:bg-slatebg-card border border-slate-200/50 dark:border-slatebg-border/40 rounded-3xl p-8 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/70 font-inter">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slatebg-border bg-slate-50 dark:bg-slatebg-card text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-inter"
                  />
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Email & Subject columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/70 font-inter">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="name@example.com"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slatebg-border bg-slate-50 dark:bg-slatebg-card text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-inter"
                    />
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/70 font-inter">
                    Message Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Scholarship proposal, Project, etc."
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slatebg-border bg-slate-50 dark:bg-slatebg-card text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-inter"
                    />
                    <FaPen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Message body */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/77 font-inter">
                  Message Body
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your proposal..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slatebg-border bg-slate-50 dark:bg-slatebg-card text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-inter leading-relaxed"
                />
              </div>

              {/* Status prompt */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl text-xs font-semibold font-inter"
                  >
                    Your message was sent successfully! I will reply to you shortly.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl text-xs font-semibold font-inter"
                  >
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all duration-300 font-inter text-sm"
              >
                {status === 'submitting' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Google Map Embed */}
        <div className="w-full h-80 rounded-3xl overflow-hidden shadow-sm border border-slate-200/50 dark:border-slatebg-border/30">
          <iframe
            title="Google Map Addis Ababa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126115.11568266205!2d38.706173003053724!3d9.019195000570997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1717282828282!5m2!1sen!2set"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.6) invert(0.9) contrast(1.1) brightness(0.9)' }} // Sleek dark aesthetic filter
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
};

export default Contact;
