import { useEffect, useRef, useState } from 'react';
import { 
  Code2, 
  Server, 
  Database, 
  GitBranch, 
  Layout,
  FileCode,
  Braces,
  Coffee,
  Layers,
  Terminal
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon?: React.ElementType;
}

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: Skill[];
  color: string;
}

function ProgressBar({ level, color, isVisible }: { level: number; color: string; isVisible: boolean }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setWidth(level), 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, level]);

  return (
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0');
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      icon: Layout,
      color: 'bg-gradient-to-r from-blue-500 to-blue-400',
      skills: [
        { name: 'HTML/CSS', level: 90, icon: FileCode },
        { name: 'JavaScript', level: 85, icon: Braces },
        { name: 'React', level: 80, icon: Code2 },
      ],
    },
    {
      title: 'Backend Development',
      icon: Server,
      color: 'bg-gradient-to-r from-violet-500 to-violet-400',
      skills: [
        { name: 'Node.js', level: 75, icon: Terminal },
        { name: 'Python', level: 70, icon: Code2 },
        { name: 'Java', level: 65, icon: Coffee },
      ],
    },
    {
      title: 'Database & Tools',
      icon: Database,
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
      skills: [
        { name: 'Git', level: 80, icon: GitBranch },
        { name: 'MySQL', level: 75, icon: Database },
        { name: 'MongoDB', level: 70, icon: Layers },
      ],
    },
  ];

  const techStack = [
    'HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 
    'Python', 'Java', 'Git', 'MySQL', 'MongoDB',
    'Tailwind CSS', 'Express.js'
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 relative bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="animate-on-scroll opacity-0 text-center mb-16">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">
            What I Know
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            My Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life. Constantly learning and improving my skill set.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="animate-on-scroll opacity-0 p-6 rounded-2xl bg-card border border-border card-hover"
              style={{ animationDelay: `${0.2 + categoryIndex * 0.1}s` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {skill.icon && <skill.icon className="w-4 h-4 text-muted-foreground" />}
                        <span className="text-sm text-white font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <ProgressBar 
                      level={skill.level} 
                      color={category.color}
                      isVisible={isVisible}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">Tech Stack</h3>
            <p className="text-sm text-muted-foreground">Technologies I've worked with</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground hover:text-white hover:border-primary hover:bg-primary/10 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${0.7 + index * 0.05}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
