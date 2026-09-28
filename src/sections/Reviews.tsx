import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

interface Review {
  name: string;
  age?: number;
  role: string;
  location: string;
  rating: number;
  text: string;
  product: string;
  image: string;
  avatar: string;
  tag: string;
}

const reviews: Review[] = [
  {
    name: 'Rohan Shrestha',
    age: 22,
    role: 'Futsal Captain',
    location: 'Nayabazar, Kathmandu',
    rating: 5,
    text: 'Ordered the Nepal Home Jersey 2026 for our inter-college futsal tournament in Balaju. The crimson red fabric breathes so well during intense evening matches and the ANFA crest detail is authentic. Delivered to my doorstep within 24 hours via Pathao parcel!',
    product: 'Nepal Home Jersey 2026',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&h=300&q=80',
    avatar: 'RS',
    tag: 'Youth Player',
  },
  {
    name: 'Bikram Thapa Magar',
    age: 52,
    role: 'Veteran Footballer & Coach',
    location: 'Lakeside, Pokhara',
    rating: 5,
    text: 'Being an old-school football follower since the 1986 World Cup, finding 100% genuine player-spec kits in Nepal used to be almost impossible. Zentrix delivered the Argentina 3-Star kit right to Pokhara in 2 days. Seamless eSewa payment and top-notch stitch quality.',
    product: 'Argentina Home Kit (3-Star)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80',
    avatar: 'BT',
    tag: 'Veteran Coach',
  },
  {
    name: 'Anjali Gurung',
    age: 24,
    role: 'University League Player',
    location: 'Dharan-12, Sunsari',
    rating: 5,
    text: 'Ordered the Brazil Away and Nepal Home kits for our college sports week. Sizing according to their chart was 100% accurate. Eastern Nepal shipping took only 48 hours and packaging was spotless. Highly recommend Zentrix to all sports lovers in Nepal!',
    product: 'Brazil Away Kit 2026',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80',
    avatar: 'AG',
    tag: 'University Athlete',
  },
  {
    name: 'Suman Adhikari',
    age: 34,
    role: 'Club Goalkeeper',
    location: 'Bharatpur, Chitwan',
    rating: 5,
    text: 'Bought the Nike Vapor Grip3 GK gloves along with the Japan 2026 kit. The latex palm gives supreme grip on muddy turf pitches during monsoon tournaments in Narayangarh. Customer service on WhatsApp gave prompt sizing guidance.',
    product: 'Nike Vapor Grip3 Gloves',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80',
    avatar: 'SA',
    tag: 'District Goalkeeper',
  },
  {
    name: 'Pemba Sherpa',
    age: 28,
    role: 'Weekend League Striker',
    location: 'Bouddha, Kathmandu',
    rating: 5,
    text: 'Visited their store hub near Nayabazar to check out the boots and Portugal jersey. No fake replicas here—pure authentic retail quality with original tags and breathability. Easy Cash on Delivery and prompt staff.',
    product: 'Portugal Home Jersey 2026',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&h=300&q=80',
    avatar: 'PS',
    tag: 'Weekend Striker',
  },
  {
    name: 'Dawa Tamang',
    age: 63,
    role: 'Life-long Football Fan',
    location: 'Patan, Lalitpur',
    rating: 5,
    text: 'I bought two Germany 2026 jerseys for my grandson and myself for our weekend visits to Dasharath Rangasala. The fabric feels exceptionally soft and comfortable even for seniors. Very respectful and polite service.',
    product: 'Germany Home Jersey 2026',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&h=300&q=80',
    avatar: 'DT',
    tag: 'Senior Fan',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Reviews() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-gradient-to-br from-[#F8FAFC] to-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Verified Nepali Customer Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Footballers Across Nepal
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
            From futsal courts in Kathmandu to district gold cups in Pokhara, Dharan & Chitwan—hear what our players, coaches and lifelong supporters say.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars + Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-semibold rounded-full">
                    {review.tag}
                  </span>
                </div>

                {/* Quote Icon */}
                <Quote className="w-7 h-7 text-[#3B82F6]/20 mb-3" />

                {/* Review Text */}
                <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div>
                {/* Purchased product pill */}
                <div className="mb-4 pb-4 border-b border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Verified Kit:</span>
                  <span className="font-semibold text-[#3B82F6] truncate max-w-[200px]">
                    {review.product}
                  </span>
                </div>

                {/* Author Info with Nepali Portrait */}
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 shrink-0">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover rounded-full ring-2 ring-[#3B82F6]/20 shadow-sm"
                      onError={(e) => {
                        // Fallback to initials avatar if network image is unavailable
                        (e.currentTarget as HTMLElement).style.display = 'none';
                        const parent = (e.currentTarget as HTMLElement).parentElement;
                        if (parent) {
                          const fallback = parent.querySelector('.avatar-fallback');
                          if (fallback) (fallback as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                    <div
                      className="avatar-fallback hidden absolute inset-0 bg-gradient-to-br from-[#3B82F6] to-emerald-500 rounded-full items-center justify-center text-white font-bold text-sm"
                    >
                      {review.avatar}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-slate-800 text-sm truncate">{review.name}</p>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500">{review.location}</p>
                    <p className="text-[11px] text-slate-400">{review.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Nepal Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div>
            <p className="text-3xl sm:text-4xl font-black text-[#3B82F6]">10K+</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Happy Nepali Athletes</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-emerald-500">4.9 ★</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Average Review Score</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-purple-600">24h</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Kathmandu Valley Express</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-slate-900">77</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Districts Coverage</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}