'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';

export default function Home() {
  const [showLearnMore, setShowLearnMore] = useState(false);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial="initial"
        animate="animate"
        variants={containerVariants}
        className="max-w-2xl w-full text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              TheNetrider
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Your AI-Powered Partner for Digital Growth & Learning
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass p-6 rounded-2xl">
              <div className="text-3xl mb-2">🎓</div>
              <h3 className="text-white font-semibold mb-2">AI Academy</h3>
              <p className="text-gray-400 text-sm">
                Master digital skills with cutting-edge AI courses
              </p>
            </div>

            <div className="glass p-6 rounded-2xl">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="text-white font-semibold mb-2">Digital Marketing</h3>
              <p className="text-gray-400 text-sm">
                Grow your business with proven digital strategies
              </p>
            </div>

            <div className="glass p-6 rounded-2xl">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="text-white font-semibold mb-2">Web Development</h3>
              <p className="text-gray-400 text-sm">
                Build amazing web experiences with expert guidance
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-gray-400 text-center">
            💬 Click the chat button in the bottom-right corner to ask me anything!
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.a
            href="https://thenetrider.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 
            text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 
            transition-all duration-300 min-w-[220px] text-center relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 
            group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center justify-center gap-2">
              🌐 Visit TheNetrider
            </span>
          </motion.a>

          <motion.button
            onClick={() => setShowLearnMore(true)}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 rounded-2xl border-2 border-cyan-400/50 text-white font-bold text-lg 
            hover:border-cyan-400 hover:bg-cyan-500/10 backdrop-blur-sm 
            transition-all duration-300 min-w-[220px] text-center shadow-lg hover:shadow-xl 
            hover:shadow-cyan-400/30"
          >
            📚 Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Learn More Modal */}
      <AnimatePresence>
        {showLearnMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLearnMore(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="bg-gradient-to-br from-netrider-navy via-netrider-darkblue to-netrider-blue rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-cyan-500/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border-b border-white/10 p-6 flex justify-between items-center z-10">
                <h2 className="text-3xl font-bold text-white">About TheNetrider 🚀</h2>
                <button
                  onClick={() => setShowLearnMore(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <MdClose size={28} className="text-white" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-8">
                {/* Introduction */}
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">🌟 Who We Are</h3>
                  <p className="text-gray-300 leading-relaxed">
                    TheNetrider is Pakistan's leading digital marketing and AI training company, dedicated to empowering individuals and businesses with cutting-edge skills and innovative solutions. We combine expert training with real-world applications to help you thrive in the digital age.
                  </p>
                </div>

                {/* Services Grid */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">📚 Our Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* AI Academy */}
                    <div className="glass p-6 rounded-2xl hover:scale-105 transition-transform">
                      <div className="text-4xl mb-3">🎓</div>
                      <h4 className="text-xl font-bold text-white mb-3">AI Academy</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ Machine Learning & Deep Learning</li>
                        <li>✓ Natural Language Processing (NLP)</li>
                        <li>✓ Computer Vision & Image Recognition</li>
                        <li>✓ AI-Powered Chatbots</li>
                        <li>✓ Generative AI & LLMs</li>
                        <li>✓ Hands-on Projects & Certifications</li>
                      </ul>
                    </div>

                    {/* Digital Marketing */}
                    <div className="glass p-6 rounded-2xl hover:scale-105 transition-transform">
                      <div className="text-4xl mb-3">📱</div>
                      <h4 className="text-xl font-bold text-white mb-3">Digital Marketing</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ Social Media Marketing (SMM)</li>
                        <li>✓ Search Engine Optimization (SEO)</li>
                        <li>✓ Google Ads & Facebook Ads</li>
                        <li>✓ Content Marketing Strategy</li>
                        <li>✓ Email Marketing Campaigns</li>
                        <li>✓ Analytics & Performance Tracking</li>
                      </ul>
                    </div>

                    {/* Web Development */}
                    <div className="glass p-6 rounded-2xl hover:scale-105 transition-transform">
                      <div className="text-4xl mb-3">💻</div>
                      <h4 className="text-xl font-bold text-white mb-3">Web Development</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ Custom Website Design & Development</li>
                        <li>✓ E-Commerce Solutions</li>
                        <li>✓ Responsive & Mobile-First Design</li>
                        <li>✓ WordPress & CMS Development</li>
                        <li>✓ React, Next.js & Modern Frameworks</li>
                        <li>✓ Website Maintenance & Support</li>
                      </ul>
                    </div>

                    {/* Freelancing Training */}
                    <div className="glass p-6 rounded-2xl hover:scale-105 transition-transform">
                      <div className="text-4xl mb-3">💼</div>
                      <h4 className="text-xl font-bold text-white mb-3">Freelancing & E-Commerce</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ Upwork & Fiverr Profile Optimization</li>
                        <li>✓ Client Communication & Negotiation</li>
                        <li>✓ Portfolio Building Strategies</li>
                        <li>✓ Amazon FBA & Dropshipping</li>
                        <li>✓ Shopify Store Setup</li>
                        <li>✓ Payment Gateway Integration</li>
                      </ul>
                    </div>

                    {/* Network Automation */}
                    <div className="glass p-6 rounded-2xl hover:scale-105 transition-transform">
                      <div className="text-4xl mb-3">🔧</div>
                      <h4 className="text-xl font-bold text-white mb-3">Network Automation</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ Python for Network Engineers</li>
                        <li>✓ Ansible & Network Automation</li>
                        <li>✓ SDN (Software-Defined Networking)</li>
                        <li>✓ Network Monitoring & Management</li>
                        <li>✓ DevOps for Network Operations</li>
                        <li>✓ Cisco & Juniper Automation</li>
                      </ul>
                    </div>

                    {/* Graphics Design */}
                    <div className="glass p-6 rounded-2xl hover:scale-105 transition-transform">
                      <div className="text-4xl mb-3">🎨</div>
                      <h4 className="text-xl font-bold text-white mb-3">Graphics & UI/UX Design</h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>✓ Adobe Photoshop & Illustrator</li>
                        <li>✓ Figma & UI Design Principles</li>
                        <li>✓ Logo & Brand Identity Design</li>
                        <li>✓ Social Media Graphics</li>
                        <li>✓ User Experience (UX) Research</li>
                        <li>✓ Prototyping & Wireframing</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Training Options */}
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">🏫 Training Formats</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/30">
                      <h4 className="text-white font-bold mb-2">🏢 On-Campus Classes</h4>
                      <p className="text-gray-300 text-sm">Face-to-face learning with hands-on guidance</p>
                    </div>
                    <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/30">
                      <h4 className="text-white font-bold mb-2">🌐 Online Classes</h4>
                      <p className="text-gray-300 text-sm">Learn from anywhere with live sessions</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/30">
                      <h4 className="text-white font-bold mb-2">📅 Weekend Batches</h4>
                      <p className="text-gray-300 text-sm">Perfect for working professionals</p>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">⭐ Why Choose TheNetrider?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">✅</div>
                      <div>
                        <h4 className="text-white font-semibold">Industry Experts</h4>
                        <p className="text-gray-300 text-sm">Learn from professionals with years of experience</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">✅</div>
                      <div>
                        <h4 className="text-white font-semibold">Practical Training</h4>
                        <p className="text-gray-300 text-sm">Hands-on projects and real-world scenarios</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">✅</div>
                      <div>
                        <h4 className="text-white font-semibold">Flexible Schedules</h4>
                        <p className="text-gray-300 text-sm">Choose times that fit your lifestyle</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">✅</div>
                      <div>
                        <h4 className="text-white font-semibold">Job Support</h4>
                        <p className="text-gray-300 text-sm">Career guidance and placement assistance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">✅</div>
                      <div>
                        <h4 className="text-white font-semibold">Certifications</h4>
                        <p className="text-gray-300 text-sm">Industry-recognized certificates upon completion</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">✅</div>
                      <div>
                        <h4 className="text-white font-semibold">Lifetime Support</h4>
                        <p className="text-gray-300 text-sm">Access to resources and community forever</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-white">Ready to Start Your Journey? 🚀</h3>
                  <p className="text-gray-300">Chat with our AI assistant or visit our website to learn more!</p>
                  <div className="flex gap-4 justify-center">
                    <a
                      href="https://thenetrider.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-glow-cyan transition-all"
                    >
                      Visit Website
                    </a>
                    <button
                      onClick={() => {
                        setShowLearnMore(false);
                        // Wait for modal to close, then trigger chat
                        setTimeout(() => {
                          const chatButton = document.querySelector('[data-chat-button]') as HTMLElement;
                          if (chatButton) {
                            chatButton.click();
                          }
                        }, 400);
                      }}
                      className="px-8 py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:border-cyan-500 hover:scale-105 transition-all"
                    >
                      Start Chatting 💬
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
