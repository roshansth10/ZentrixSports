import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Kathmandu',
    subject: 'Jersey / Kit Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        city: 'Kathmandu',
        subject: 'Jersey / Kit Inquiry',
        message: '',
      });
    }, 4000);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Banner */}
      <div className="w-full bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 xl:px-12 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <span className="px-3.5 py-1 bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-widest rounded-full">
            KATHMANDU STORE & HELPDESK
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Get in Touch with Zentrix Nepal
          </h1>
          <p className="mt-3 text-slate-300 text-sm max-w-xl mx-auto">
            Have questions about kit sizing, futsal tournament bulk orders, or province delivery? Our sports experts in Nayabazar are here to assist.
          </p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-xl font-black text-slate-900">Nayabazar Store Information</h2>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 text-[#3B82F6] rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Store Location</h3>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                    Nayabazar, Ward No. 16, Kathmandu, Nepal <br />
                    (Near Sorhakhutte / Balaju Commercial Link)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Phone & WhatsApp Support</h3>
                  <a href="tel:+9779876543210" className="text-[#3B82F6] text-sm font-black hover:underline block mt-0.5">
                    +977 9876543210
                  </a>
                  <p className="text-slate-400 text-xs mt-0.5">Direct line for instant inquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Email Address</h3>
                  <a href="mailto:support@zentrixsports.com" className="text-slate-600 text-xs hover:text-[#3B82F6] block mt-0.5">
                    support@zentrixsports.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Opening Hours (Nepal Time)</h3>
                  <p className="text-slate-600 text-xs mt-1">
                    Sunday – Friday: 9:00 AM – 8:00 PM <br />
                    Saturday: 10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Delivery Summary */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-sm">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Fast Courier Coverage</h3>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                • Inside Ring Road (Kathmandu, Lalitpur, Bhaktapur): Same Day / 24 Hours. <br />
                • Outside Valley (Pokhara, Chitwan, Dharan, Butwal, Biratnagar, etc.): 2-3 business days.
              </p>
            </div>
          </div>

          {/* Right Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-2">Send Us an Inquiry</h2>
              <p className="text-slate-500 text-xs sm:text-sm mb-6">
                Fill out the form below and our team will get back to you within 2 hours.
              </p>

              {formSubmitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-emerald-900">Dhanyabad! Message Received</h3>
                  <p className="text-emerald-700 text-xs mt-2">
                    Our Kathmandu support team will call or message you on WhatsApp at +977 {formData.phone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Roshan Shrestha"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">
                        Nepal Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+977 98XXXXXXXX"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Kathmandu / Pokhara / Other"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-[#3B82F6]"
                      >
                        <option>Jersey / Kit Sizing</option>
                        <option>Futsal Team Bulk Order</option>
                        <option>Football Boots Sizing</option>
                        <option>Custom Name & Number Print</option>
                        <option>Delivery Tracking</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">
                      Your Message or Order Details
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please let us know how we can help you with your football gear..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#3B82F6] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-slate-900 hover:bg-[#3B82F6] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
