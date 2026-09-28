import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'Football Jerseys (2026)', href: '/jerseys' },
    { name: 'Pro Football Boots', href: '/boots' },
    { name: 'Training & Match Gear', href: '/equipment' },
    { name: 'Special Combos & Offers', href: '/offers' },
  ],
  support: [
    { name: 'Contact & Inquiry', href: '/contact' },
    { name: 'About Zentrix Nepal', href: '/about' },
    { name: 'Nayabazar Store Hub', href: '/contact' },
    { name: 'Authenticity Guarantee', href: '/about' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Store Location (Kathmandu)', href: '/contact' },
    { name: 'Tournament Bulk Orders', href: '/offers' },
    { name: 'Custom Jersey Printing', href: '/contact' },
  ],
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-slate-900 text-white mt-auto">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link to="/">
                  <img
                    src="/images/logo/ZENTRIX_Logo.png"
                    alt="Zentrix Sports Nepal Logo"
                    className="h-20 w-auto object-contain"
                  />
                </Link>
                <p className="mt-4 text-slate-400 max-w-sm text-sm leading-relaxed">
                  Nepal&apos;s premier football and athletic store. Authentic 2026 national team jerseys, pro football boots, and match equipment delivered across all 7 provinces of Nepal.
                </p>

                {/* Contact Info */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span className="text-sm font-medium">Nayabazar, Kathmandu, Nepal</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a href="tel:+9779876543210" className="text-sm font-medium hover:text-white transition-colors">
                      +977 9876543210
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                    <a href="mailto:support@zentrixsports.com" className="text-sm font-medium hover:text-white transition-colors">
                      support@zentrixsports.com
                    </a>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Accepted Payment Methods in Nepal:
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-300">
                    <span className="px-2.5 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 rounded-md">eSewa</span>
                    <span className="px-2.5 py-1 bg-purple-950/80 text-purple-300 border border-purple-800/60 rounded-md">Khalti</span>
                    <span className="px-2.5 py-1 bg-blue-950/80 text-blue-400 border border-blue-800/60 rounded-md">Fonepay</span>
                    <span className="px-2.5 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded-md">Cash on Delivery (COD)</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-[#3B82F6] hover:text-white transition-colors"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Shop Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">Shop Pages</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-[#3B82F6] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-white font-semibold mb-4">Customer Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-[#3B82F6] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-4">Zentrix Nepal</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-[#3B82F6] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Zentrix Sports Nepal Pvt. Ltd. Nayabazar, Kathmandu. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/about" className="text-slate-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="text-slate-500 hover:text-white text-sm transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/contact" className="text-slate-500 hover:text-white text-sm transition-colors">
              Return Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}