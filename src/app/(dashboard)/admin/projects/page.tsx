// src/app/(dashboard)/admin/projects/page.tsx
import React from "react";
import { supabase } from "@/lib/db";
import { createProjectAction } from "@/app/actions/project";
import { FolderGit2, ShieldCheck, Cpu, Briefcase, PlusCircle, ExternalLink } from "lucide-react";

export const revalidate = 0; // Ensure data recalculates on every page visit

export default async function AdminProjectsDashboardPage() {
  // 1. Fetch real-time row count metrics out of your schema tables
  const { count: projectCount } = await supabase.from("projects").select("*", { count: "exact", head: true });
  const { count: skillCount } = await supabase.from("skills").select("*", { count: "exact", head: true });
  const { count: experienceCount } = await supabase.from("experiences").select("*", { count: "exact", head: true });

  // 2. Pull down the active list of existing records to show a mini-log view
  const { data: projects } = await supabase.from("projects").select("*").order("priority", { ascending: true });

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-white p-6 md:p-12 font-sans select-none">
      
      {/* Upper Status Header Workspace Panel */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-1">
            <ShieldCheck className="w-4 h-4" /> AUTHENTICATED SYSTEM SESSION
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Projects Manager Panel</h1>
        </div>
        <div className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
          WORKSPACE: (DASHBOARD)/ADMIN/PROJECTS
        </div>
      </header>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: System Metrics & Project Overview Logs */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Statistical Metrics Cards Container Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
              <FolderGit2 className="w-5 h-5 text-zinc-500 mx-auto mb-2" />
              <div className="text-xl font-bold">{projectCount || 0}</div>
              <div className="text-[10px] font-mono tracking-wider uppercase text-zinc-500 mt-0.5">Works</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
              <Cpu className="w-5 h-5 text-zinc-500 mx-auto mb-2" />
              <div className="text-xl font-bold">{skillCount || 0}</div>
              <div className="text-[10px] font-mono tracking-wider uppercase text-zinc-500 mt-0.5">Skills</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
              <Briefcase className="w-5 h-5 text-zinc-500 mx-auto mb-2" />
              <div className="text-xl font-bold">{experienceCount || 0}</div>
              <div className="text-[10px] font-mono tracking-wider uppercase text-zinc-500 mt-0.5">History</div>
            </div>
          </div>

          {/* Active Existing Works Mini Log Display Panel */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-sm font-mono tracking-widest text-zinc-400 uppercase mb-4 border-b border-zinc-800 pb-2">// Live Portfolio Records</h2>
            {(!projects || projects.length === 0) ? (
              <p className="text-xs font-mono text-zinc-600">No database project entries detected.</p>
            ) : (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {projects.map((project) => (
                  <div key={project.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between group hover:border-zinc-700 transition-colors">
                    <div className="truncate pr-4">
                      <h3 className="text-xs font-bold text-zinc-200 truncate">{project.title}</h3>
                      <p className="text-[10px] font-mono text-zinc-500 mt-0.5">Priority: {project.priority}</p>
                    </div>
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-white transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Fast Insertion Creation Form */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <h2 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-zinc-400" /> Append New Project
            </h2>

            {/* Submits form parameters onto our global server actions engine */}
            <form action={createProjectAction} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Project Title</label>
                  <input type="text" name="title" required placeholder="e.g. AI Content Dashboard" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Display Priority Weighting</label>
                  <input type="number" name="priority" defaultValue="0" placeholder="e.g. 1" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Description Meta Details</label>
                <textarea name="description" rows={4} required placeholder="Describe the project technical specs, design constraints, and engineering deliverables..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono resize-none leading-relaxed" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Technologies / Tags (Comma Separated)</label>
                <input type="text" name="tags" placeholder="Next.js, TypeScript, GSAP, PostgreSQL" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Source Code URL (GitHub)</label>
                  <input type="url" name="github_url" placeholder="https://github.com/..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Live Production URL</label>
                  <input type="url" name="live_url" placeholder="https://..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
              </div>

              <button type="submit" className="w-full mt-4 bg-white text-zinc-950 rounded-xl py-3 text-xs font-mono tracking-widest uppercase font-bold hover:bg-zinc-200 transition-colors active:scale-[0.99]">
                COMMIT PROJECT DATA TO DATABASE
              </button>
            </form>

          </div>
        </div>
      </div>
    </main>
  );
}