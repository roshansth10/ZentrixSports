import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Phone, Mail, Award, Truck, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Banner */}
      <div className="w-full bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 xl:px-12 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <span className="px-3.5 py-1 bg-[#3B82F6] text-white text-xs font-black uppercase tracking-widest rounded-full">
            ABOUT ZENTRIX SPORTS NEPAL
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
            Powering Nepal&apos;s Football Community
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Headquartered in Nayabazar, Kathmandu, Zentrix Sports was founded to eliminate counterfeit jerseys and sub-standard boots from the Nepali sports market.
          </p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-12 max-w-6xl mx-auto space-y-12">
        {/* Story Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[#3B82F6] text-xs font-bold uppercase tracking-wider">Our Story</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              From Kathmandu Futsal Courts to Every Corner of Nepal
            </h2>
            <p className="text-slate-600 text-sm mt-4 leading-relaxed">
              As avid football players and supporters in Nepal, we experienced first-hand how difficult it was to find authentic national team kits, true player-spec boots, and genuine match gear without paying exorbitant import fees or receiving cheap copies.
            </p>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Zentrix Sports bridges that gap by stocking authentic 2026 World Cup jerseys for 22 countries alongside Nepal&apos;s official ANFA jersey, verified pro boots from Nike, Adidas, and Puma, and providing express delivery with payment options like eSewa, Khalti, and COD.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-slate-900 relative">
            <img
              src="/images/hero/hero-nepal.jpg"
              alt="Nepali Footballer in action"
              className="w-full h-full object-cover filter brightness-90"
            />
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-[#3B82F6] rounded-2xl flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">100% Authentic Guarantee</h3>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              Every jersey, boot, and ball in our warehouse is sourced from authorized global manufacturing hubs with genuine tags and authentic materials.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-5">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">All 7 Provinces Delivery</h3>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              24-hour delivery inside Kathmandu Valley via local dispatch and reliable express courier across all 77 districts of Nepal.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Grassroots Football Support</h3>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              We proudly partner with school academies, amateur futsal teams, and district gold cup tournaments to nurture Nepali football talent.
            </p>
          </div>
        </div>

        {/* Location & Contact Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="px-3 py-1 bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider rounded-md">
              VISIT OUR KATHMANDU HUB
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-3">
              Nayabazar, Kathmandu, Nepal
            </h3>
            <p className="text-slate-400 text-sm mt-2 max-w-md">
              Near Sorhakhutte / Balaju Road. Drop in to try out boot sizes or pick up your customized team jerseys in person.
            </p>

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <a href="tel:+9779876543210" className="hover:text-white font-semibold">
                  +977 9876543210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>support@zentrixsports.com</span>
              </div>
            </div>
          </div>

          <Link
            to="/contact"
            className="px-8 py-4 bg-[#3B82F6] hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors shrink-0"
          >
            Contact & Directions
          </Link>
        </div>
      </div>
    </div>
  );
}
