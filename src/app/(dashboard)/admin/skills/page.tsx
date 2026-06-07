// src/app/(dashboard)/admin/skills/page.tsx
import React from "react";
import { supabase } from "@/lib/db";
import { createSkillAction, deleteSkillAction } from "@/app/actions/skill";
import Image from "next/image";
import { ShieldCheck, Cpu, PlusCircle, Trash2, Layers, Sliders } from "lucide-react";

export const revalidate = 0;

export default async function AdminSkillsDashboardPage() {
  // Pull all tracking skills organized cleanly by sorting priorities
  const { data: skillsList } = await supabase
    .from("skills")
    .select("*")
    .order("priority", { ascending: false })
    .order("name", { ascending: true });

  const skills = skillsList || [];

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-white p-6 md:p-12 font-sans select-none">
      
      {/* SECTION HUB HEADER PANEL */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-1">
            <ShieldCheck className="w-4 h-4" /> SYSTEM INSTANCE VERIFIED
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Skills Framework Engine</h1>
        </div>
        <div className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
          WORKSPACE: ADMIN/SKILLS
        </div>
      </header>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT CARD COMPONENT COLUMN: INTERACTIVE CREATION FORM */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl sticky top-6">
            <h2 className="text-sm font-mono tracking-widest text-zinc-400 uppercase mb-5 border-b border-zinc-800 pb-2 flex items-center gap-2">
              <PlusCircle className="w-4 h-4" /> Register Technology
            </h2>

            <form action={createSkillAction} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400 uppercase block pl-1">Skill Name</label>
                <input type="text" name="name" required placeholder="e.g. Next.js, PostgreSQL" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400 uppercase block pl-1">Category Classification</label>
                <select name="category" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-zinc-700 transition-colors font-mono text-zinc-300 appearance-none cursor-pointer">
                  <option value="Frontend">Frontend Development</option>
                  <option value="Backend">Backend Architecture</option>
                  <option value="DevOps">DevOps & Infrastructure</option>
                  <option value="Mobile">Mobile Applications</option>
                  <option value="Tools">Developer Utilities & Tools</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400 uppercase block pl-1">Display Sorting Priority</label>
                <input type="number" name="priority" defaultValue={0} placeholder="e.g. 10 (Higher values load first)" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400 uppercase block pl-1">Asset Icon Image / SVG</label>
                <input type="file" name="icon" accept="image/*" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-3 text-xs text-zinc-500 cursor-pointer font-mono file:mr-3 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[10px] file:bg-zinc-800 file:text-zinc-300" />
              </div>

              <button type="submit" className="w-full bg-emerald-500 text-zinc-950 rounded-xl py-2.5 text-xs font-mono tracking-widest uppercase font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5 active:scale-[0.99]">
                <Cpu className="w-4 h-4" /> APPEND MATRIX RECORD
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT CARD COMPONENT COLUMN: COMPREHENSIVE SKILLS DATABASE LIST VIEW */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <h2 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Layers className="w-5 h-5 text-zinc-400" /> Configured Technology Stack Matrix
            </h2>

            {skills.length === 0 ? (
              <div className="w-full text-center py-12 border border-dashed border-zinc-800 rounded-2xl font-mono text-xs text-zinc-500">
                No stack components saved inside public.skills rows yet.
              </div>
            ) : (
              <div className="w-full space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="w-full bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between gap-4 group hover:border-zinc-700 transition-colors">
                    
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Interactive Visual Graphic Icon Box Frame */}
                      <div className="relative w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                        {skill.icon_url ? (
                          <Image src={skill.icon_url} alt={`${skill.name} Branding Asset`} fill className="object-contain p-2" />
                        ) : (
                          <Cpu className="w-4 h-4 text-zinc-600" />
                        )}
                      </div>
                      
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-white font-mono truncate">{skill.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                            {skill.category}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-0.5">
                            <Sliders className="w-3 h-3" /> Priority: {skill.priority}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* DELETION CONTROLLER FORM ROUTE */}
                    <form action={deleteSkillAction} className="shrink-0">
                      <input type="hidden" name="id" value={skill.id} />
                      <button type="submit" className="text-zinc-600 hover:text-red-400 hover:bg-red-500/10 p-2.5 rounded-xl border border-transparent hover:border-red-500/20 transition-all active:scale-95" title={`Remove ${skill.name}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}