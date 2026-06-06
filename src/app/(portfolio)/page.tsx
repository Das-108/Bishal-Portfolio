// src/app/(portfolio)/page.tsx
import React from "react";
import { supabase } from "@/lib/db";
import HeroSection from "@/components/portfolio/HeroSection";
import Navbar from "@/components/portfolio/Navbar";
import SmoothScroll from "@/components/portfolio/SmoothScroll";
import { FolderGit2, Calendar, MapPin, Layers, ExternalLink, } from "lucide-react";

// Enforce Next.js to fetch data dynamically on every browser request
export const revalidate = 0;

export default async function PortfolioPage() {
  // Execute database queries in parallel on the server
  const [projectsResponse, skillsResponse, experienceResponse] = await Promise.all([
    supabase.from("projects").select("*").order("priority", { ascending: true }),
    supabase.from("skills").select("*").order("category", { ascending: true }),
    supabase.from("experiences").select("*").order("priority", { ascending: true })
  ]);

  const projects = projectsResponse.data || [];
  const skills = skillsResponse.data || [];
  const experiences = experienceResponse.data || [];

  // Group skills dynamically by their designated category labels
  const groupedSkills = skills.reduce((acc: Record<string, typeof skills>, skill) => {
    const category = skill.category || "General Core";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased overflow-x-hidden selection:bg-white selection:text-zinc-950">
        <Navbar />
        
        {/* SECTION 1: Cinematic Front Window Hero */}
        <HeroSection />

        {/* SECTION 2: Interactive Database Driven Projects Showcase */}
        <section id="works" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
          <div className="mb-16">
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs tracking-widest uppercase mb-2">
              <FolderGit2 className="w-4 h-4" /> // PRODUCTION REGISTRY
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Selected Work</h2>
          </div>

          {projects.length === 0 ? (
            <div className="border border-dashed border-zinc-800 rounded-3xl p-12 text-center text-zinc-500 font-mono text-xs uppercase tracking-wider">
              [ No project listings pulled from database instance ]
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between group hover:border-zinc-700/60 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 text-zinc-500">
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-8">
                      {project.tags.map((tag: string) => (
                        <span 
                          key={tag} 
                          className="text-[10px] font-mono uppercase tracking-wider bg-zinc-950 border border-zinc-800/80 text-zinc-500 px-2.5 py-1 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 3: Split History Timeline & Grouped Skills Inventory */}
        <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* SUB-SECTION A: Experience History Feed */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs tracking-widest uppercase mb-2">
                <Calendar className="w-4 h-4" /> // CAREER TIMELINE
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Professional Journey</h2>
            </div>

            {experiences.length === 0 ? (
              <div className="text-zinc-600 font-mono text-xs uppercase tracking-wider pl-1">[ Timeline empty ]</div>
            ) : (
              <div className="space-y-10 relative pl-4 border-l border-zinc-900">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative group space-y-3">
                    {/* Floating timeline nodes */}
                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-zinc-400 transition-colors duration-300" />
                    
                    <div>
                      <h3 className="text-lg font-black uppercase text-zinc-100">{exp.role}</h3>
                      <div className="text-sm text-zinc-400 font-medium">{exp.company}</div>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-zinc-500 mt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {exp.duration}</span>
                        {exp.location && <span className="flex items-center gap-0.5"><MapPin className="w-3.5 h-3.5" /> {exp.location}</span>}
                      </div>
                    </div>

                    {exp.bullet_points && exp.bullet_points.length > 0 && (
                      <ul className="space-y-2 text-xs text-zinc-400 font-normal leading-relaxed list-disc list-inside pl-1">
                        {exp.bullet_points.map((bullet: string, idx: number) => (
                          <li key={idx} className="marker:text-zinc-700">{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SUB-SECTION B: Grouped Tech Stack Matrix */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs tracking-widest uppercase mb-2">
                <Layers className="w-4 h-4" /> // CAPABILITIES INDEX
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Technical Stack</h2>
            </div>

            {Object.keys(groupedSkills).length === 0 ? (
              <div className="text-zinc-600 font-mono text-xs uppercase tracking-wider pl-1">[ Stack unmapped ]</div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedSkills).map(([category, items]) => (
                  <div key={category} className="space-y-3">
                    <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-500 pl-1">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {items.map((skill) => (
                        <div 
                          key={skill.id} 
                          className="bg-zinc-900/40 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Global Cinematic Footer Signature */}
        <footer className="py-12 border-t border-zinc-900 text-center text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
          &copy; {new Date().getFullYear()} Bishal Gaihre &bull; Designed For Scale
        </footer>
      </div>
    </SmoothScroll>
  );
}