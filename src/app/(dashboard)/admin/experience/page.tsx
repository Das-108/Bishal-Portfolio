// src/app/(dashboard)/admin/experience/page.tsx
import React from "react";
import { supabase } from "@/lib/db";
import { createExperienceAction } from "@/app/actions/experience";
import { Briefcase, Calendar, ShieldCheck, FileText, PlusCircle, MapPin } from "lucide-react";

export const revalidate = 0; // Force compilation queries to run dynamic on every fetch call

export default async function AdminExperienceDashboardPage() {
  // 1. Pull down current existing history arrays sorted by your priority ordering weights
  const { data: experiences } = await supabase
    .from("experiences")
    .select("*")
    .order("priority", { ascending: true });

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-white p-6 md:p-12 font-sans select-none">
      
      {/* Upper Status Header Layout Block */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-1">
            <ShieldCheck className="w-4 h-4" /> AUTHENTICATED SYSTEM SESSION
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Career Timeline Manager</h1>
        </div>
        <div className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
          WORKSPACE: (DASHBOARD)/ADMIN/EXPERIENCE
        </div>
      </header>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Read Current Existing Items Log Output */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-sm font-mono tracking-widest text-zinc-400 uppercase mb-4 border-b border-zinc-800 pb-2">
              // Live Career Records
            </h2>
            
            {(!experiences || experiences.length === 0) ? (
              <p className="text-xs font-mono text-zinc-600">No career milestone entries found.</p>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2 hover:border-zinc-700 transition-colors">
                    <div>
                      <h3 className="text-xs font-black text-white uppercase tracking-tight">{exp.role}</h3>
                      <p className="text-xs text-zinc-400 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono text-zinc-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {exp.duration}</span>
                      {exp.location && <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {exp.location}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Append Live Record Form Block */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <h2 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-zinc-400" /> Append Professional Entry
            </h2>

            {/* Form pipeline triggering our backend Server Action execution workflow */}
            <form action={createExperienceAction} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Company Name</label>
                  <input type="text" name="company" required placeholder="e.g. Acme Tech Solutions" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Engineering Role / Title</label>
                  <input type="text" name="role" required placeholder="e.g. Senior Full Stack Engineer" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-1 space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Duration Window</label>
                  <input type="text" name="duration" required placeholder="e.g. Jan 2024 - Present" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
                <div className="md:col-span-1 space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Office Location</label>
                  <input type="text" name="location" placeholder="e.g. Remote / San Francisco" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
                <div className="md:col-span-1 space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Timeline Priority Weight</label>
                  <input type="number" name="priority" defaultValue="0" placeholder="e.g. 1" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-zinc-500" /> Core Achievements & Deliverables (One Per Line)
                </label>
                <textarea name="bullet_points" rows={6} required placeholder="Architected core database caching strategies boosting read intervals by 45%&#10;Led a team of three frontend engineers deploying Next.js server side clusters&#10;Integrated safe encrypted cookie routing layers using advanced token authentication frameworks" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono resize-none leading-relaxed" />
                <span className="text-[10px] font-mono text-zinc-600 block pl-1 mt-1">💡 Tip: Press Enter / Return to append a fresh bullet point item card into the array layout.</span>
              </div>

              <button type="submit" className="w-full mt-4 bg-white text-zinc-950 rounded-xl py-3 text-xs font-mono tracking-widest uppercase font-bold hover:bg-zinc-200 transition-colors active:scale-[0.99]">
                COMMIT CAREER RECORD TO DATABASE
              </button>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
}