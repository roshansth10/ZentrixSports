import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Calendar, MapPin, Code2, Lightbulb, Target } from 'lucide-react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function Counter({ end, duration = 1500, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const education = [
    {
      degree: 'Bachelor in CSIT',
      institution: 'Tribhuvan University',
      period: '2021 - Present',
      description: 'Pursuing Computer Science and Information Technology degree with focus on web development and algorithms.',
    },
    {
      degree: '+2 Science',
      institution: 'NIST',
      period: '2019 - 2021',
      description: 'Completed higher secondary education with Science major, building foundation in mathematics and computer science.',
    },
  ];

  const highlights = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Building modern web applications with React, Node.js, and more.',
    },
    {
      icon: Lightbulb,
      title: 'Problem Solving',
      description: 'Passionate about algorithms and data structures.',
    },
    {
      icon: Target,
      title: 'Continuous Learning',
      description: 'Always exploring new technologies and frameworks.',
    },
  ];

  const stats = [
    { value: 3, suffix: '+', label: 'Projects Completed' },
    { value: 8, suffix: '+', label: 'Technologies' },
    { value: 2, suffix: '+', label: 'Years Learning' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="animate-on-scroll opacity-0 text-center mb-16">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">
            Get To Know Me
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - About Text */}
          <div className="space-y-8">
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                I'm a passionate <span className="text-white font-medium">CSIT student</span> with expertise in web development, 
                data structures, and algorithms. I love solving complex problems and building innovative solutions 
                that make a difference.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Currently pursuing my Bachelor's degree in Computer Science and Information Technology, 
                I'm constantly exploring new technologies and frameworks to expand my skill set and stay 
                up-to-date with the latest industry trends.
              </p>
            </div>

            {/* Highlights */}
            <div className="animate-on-scroll opacity-0 grid sm:grid-cols-3 gap-4" style={{ animationDelay: '0.4s' }}>
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-white font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="animate-on-scroll opacity-0 grid grid-cols-3 gap-4" style={{ animationDelay: '0.6s' }}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-border"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Education Timeline */}
          <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-white">Education</h3>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-violet-500" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {education.map((item, index) => (
                  <div
                    key={index}
                    className="relative pl-16 group"
                    style={{ animationDelay: `${0.6 + index * 0.15}s` }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center group-hover:shadow-glow-sm transition-shadow">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>

                    {/* Content Card */}
                    <div className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {item.degree}
                      </h4>
                      <p className="text-primary font-medium mb-2">{item.institution}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Nepal
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
