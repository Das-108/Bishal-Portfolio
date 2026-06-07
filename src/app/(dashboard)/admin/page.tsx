// src/app/(dashboard)/admin/page.tsx
import React from "react";
import { supabase } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, Cpu, Award, Settings, User, FolderGit2, Briefcase, 
  ArrowUpRight, LayoutDashboard, Activity, Star, Eye, Calendar
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardOverviewHome() {
  // Concurrent lookups to calculate total numbers across your database tables
  const [
    { count: totalSkills },
    { count: totalCertificates },
    { count: totalProjects },
    { count: totalExperiences },
    { data: featuredProjectsList }
  ] = await Promise.all([
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("certificates").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("experiences").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*").eq("featured", true).order("priority", { ascending: false })
  ]);

  const featuredProjects = featuredProjectsList || [];

  const workspaceShortcuts = [
    { name: "Skills Engine", href: "/admin/skills", icon: Cpu, count: totalSkills || 0, label: "Tech Stack" },
    { name: "Certificates Hub", href: "/admin/certificate", icon: Award, count: totalCertificates || 0, label: "Badges" },
    { name: "Identity & Bio", href: "/admin/about", icon: User, count: 1, label: "Profiles" },
    { name: "Projects Workspace", href: "/admin/projects", icon: FolderGit2, count: totalProjects || 0, label: "Showcases" },
    { name: "Work History", href: "/admin/experience", icon: Briefcase, count: totalExperiences || 0, label: "Tenures" },
    { name: "Meta Settings", href: "/admin/settings", icon: Settings, count: 1, label: "SEO Config" }
  ];

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-white p-6 md:p-12 font-sans select-none">
      
      {/* HEADER STATUS BAR */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-1">
            <ShieldCheck className="w-4 h-4" /> PROXIED ACCESS VERIFIED
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-zinc-500" /> Administrative Deck
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>PORTAL: ROOT_OVERVIEW</span>
        </div>
      </header>

      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: FEATURED PROJECTS SPOTLIGHT VIEW */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <h2 className="text-base font-black uppercase tracking-tight flex items-center gap-2 text-zinc-200">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400/20" /> Spotlight: Featured Showcases
              </h2>
              <span className="text-xs font-mono text-zinc-500 bg-zinc-950 border border-zinc-900 px-3 py-1 rounded-full">
                {featuredProjects.length} Active Highlights
              </span>
            </div>

            {featuredProjects.length === 0 ? (
              <div className="w-full text-center py-16 border border-dashed border-zinc-800 rounded-2xl font-mono text-xs text-zinc-500">
                No showcase records flagged as [Featured] inside projects table yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredProjects.map((project) => (
                  <div key={project.id} className="bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300">
                    <div>
                      <div className="relative w-full h-36 bg-zinc-900 overflow-hidden flex items-center justify-center">
                        {project.thumbnail_url ? (
                          <Image src={project.thumbnail_url} alt={project.title} fill className="object-cover" />
                        ) : (
                          <FolderGit2 className="w-8 h-8 text-zinc-800" />
                        )}
                        <div className="absolute top-3 right-3 bg-zinc-950/80 border border-zinc-800 text-[9px] font-mono uppercase text-zinc-400 px-2.5 py-1 rounded-md backdrop-blur-md flex items-center gap-1">
                          Priority: {project.priority}
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <h3 className="font-bold text-sm text-white truncate font-sans group-hover:text-emerald-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-zinc-900/60 mt-auto flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(project.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                      </div>
                      <Link href="/admin/projects" className="text-zinc-400 hover:text-white flex items-center gap-1 font-semibold group/link transition-colors">
                        Modify Content <ArrowUpRight className="w-3 h-3 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: GATEWAY NAVIGATION SHORTCUTS */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl">
            <h2 className="text-sm font-mono tracking-widest text-zinc-400 uppercase mb-5 border-b border-zinc-800 pb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-zinc-500" /> System Gateways
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
              {workspaceShortcuts.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={idx} 
                    href={item.href} 
                    className="w-full bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 p-4 rounded-2xl flex items-center justify-between group transition-all duration-300 active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/5 transition-all shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white uppercase tracking-tight block group-hover:text-emerald-400 transition-colors">{item.name}</span>
                        <span className="text-[10px] font-mono text-zinc-500 block mt-0.5">{item.label}</span>
                      </div>
                    </div>
                    
                    <div className="text-right shrink-0 flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-900 px-2 py-0.5 border border-zinc-800 rounded-md group-hover:border-zinc-700 transition-colors">
                        {item.count}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}