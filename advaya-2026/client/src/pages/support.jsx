"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, HelpCircle, ChevronDown, MessageCircle } from "lucide-react";

const ContactCard = ({ item, index }) => (
  <motion.a
    href={item.action}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group relative overflow-hidden bg-[#0b0b0b] border border-[#f3cf7a]/10 p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-500 hover:border-[#f3cf7a]/40"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-[#f3cf7a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 mb-4 p-4 rounded-full bg-black border border-[#f3cf7a]/20 group-hover:scale-110 group-hover:border-[#f3cf7a] transition-all duration-500 text-[#f3cf7a]">
      {item.icon}
    </div>
    <h3 className="relative z-10 text-xs font-bold uppercase tracking-[0.3em] mb-2 opacity-60 group-hover:opacity-100 group-hover:text-white transition-all">
      {item.title}
    </h3>
    <p className="relative z-10 text-xl font-serif italic text-[#f3cf7a]">
      {item.value}
    </p>
  </motion.a>
);

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="border-b border-[#f3cf7a]/10 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className="text-lg md:text-xl font-light tracking-wide group-hover:text-[#f3cf7a] transition-colors">
          <span className="mr-6 font-serif italic opacity-30 text-sm">0{index + 1}</span>
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-[#f3cf7a]/40 group-hover:text-[#f3cf7a]"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-[#f3cf7a]/60 leading-relaxed max-w-3xl font-light italic">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Support() {
  const contacts = [
    {
      title: "Digital Correspondence",
      value: "advaya2k26@gmail.com",
      icon: <Mail size={24} strokeWidth={1.5} />,
      action: "mailto:advaya2k26@gmail.com",
    },
    {
      title: "Direct Line",
      value: "+91 98765 43210",
      icon: <Phone size={24} strokeWidth={1.5} />,
      action: "tel:+919876543210",
    },
    {
      title: "WhatsApp Support",
      value: "Chat with Us",
      icon: <MessageCircle size={24} strokeWidth={1.5} />,
      action: "https://wa.me/919876543210",
    },
  ];

  const faqs = [
    {
      q: "Who can join the Advaya lineage?",
      a: "Participation is exclusively reserved for the bright minds currently pursuing MCA, BCA, or BSc programs.",
    },
    {
      q: "Managing multiple event tracks?",
      a: "Indeed. You may register for multiple events, though you must master your own schedule. The organizers hold no sway over time overlaps.",
    },
    {
      q: "The policy on contributions?",
      a: "Registration fees are final and non-refundable. Consider your participation a committed step into the arena.",
    },
    {
      q: "When must I report for duty?",
      a: "Arrival at the sanctuary is required by 8:30 AM. For individual events, ensure your presence 20 minutes before the bell strikes.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f3cf7a] selection:bg-[#f3cf7a] selection:text-black">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_50%_0%,_rgba(243,207,122,0.12)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6">
        {/* Editorial Header */}
        <header className="max-w-4xl mx-auto text-center mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.8em] text-[#f3cf7a]/50"
          >
            Concierge Services
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif italic text-white mt-4 tracking-tighter"
          >
            How can we <br />
            <span className="text-[#f3cf7a]">assist you?</span>
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-px bg-[#f3cf7a] mx-auto mt-12 opacity-30"
          />
        </header>

        {/* Contact Matrix */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-40">
          {contacts.map((item, index) => (
            <ContactCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* FAQ Section: Minimalist Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-12 border-b border-[#f3cf7a]/20 pb-6">
            <h2 className="text-3xl font-serif italic flex items-center gap-4">
              <HelpCircle className="opacity-40" strokeWidth={1} size={32} />
              Inquiries
            </h2>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 pb-1">Common Questions</span>
          </div>

          <div className="mb-32">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>

        {/* Fine Print Footer */}
        <footer className="max-w-7xl mx-auto text-center border-t border-[#f3cf7a]/5 pt-20">
          <p className="text-[10px] uppercase tracking-[0.5em] opacity-30 hover:opacity-100 transition-opacity duration-1000 cursor-default">
            RVITM Department of MCA • Advaya 2K26 • Bengaluru
          </p>
        </footer>
      </div>
    </div>
  );
}