// src/app/(dashboard)/admin/skills/page.tsx
import React from "react";
import { supabase } from "@/lib/db";
import { createSkillAction } from "@/app/actions/skill";
import { Cpu, ShieldCheck, PlusCircle, Award, Terminal } from "lucide-react";

export const revalidate = 0; // Force compilation queries to run dynamic on every fetch call

export default async function AdminSkillsDashboardPage() {
  // 1. Pull down current existing skills items registry logs
  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true });

  // 2. Helper loop to group individual skills dynamically by their respective categories
  const groupedSkills = skills?.reduce((acc: Record<string, typeof skills>, skill) => {
    const cat = skill.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {}) || {};

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-white p-6 md:p-12 font-sans select-none">
      
      {/* Upper Status Header Layout Block */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-1">
            <ShieldCheck className="w-4 h-4" /> AUTHENTICATED SYSTEM SESSION
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Skills Matrix Manager</h1>
        </div>
        <div className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
          WORKSPACE: (DASHBOARD)/ADMIN/SKILLS
        </div>
      </header>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Read and Group Existing Items Layout */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-sm font-mono tracking-widest text-zinc-400 uppercase mb-4 border-b border-zinc-800 pb-2">
              // Live Stack Inventory
            </h2>
            
            {Object.keys(groupedSkills).length === 0 ? (
              <p className="text-xs font-mono text-zinc-600">No developer skill entries found.</p>
            ) : (
              <div className="space-y-6 max-h-[550px] overflow-y-auto pr-2">
                {Object.entries(groupedSkills).map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold pl-1">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {items.map((skill) => (
                        <div key={skill.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between group hover:border-zinc-700 transition-colors">
                          <span className="text-xs font-bold text-zinc-200">{skill.name}</span>
                          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                            {skill.proficiency}%
                          </span>
                        </div>
                      ))}
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
              <PlusCircle className="w-5 h-5 text-zinc-400" /> Append New Skill Matrix Row
            </h2>

            {/* Type-safe form execution using React 19 / Promise<void> Server Action mapping */}
            <form action={createSkillAction} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Skill / Tool Name</label>
                  <input type="text" name="name" required placeholder="e.g. TypeScript, Docker, GSAP" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Proficiency Level (%)</label>
                  <input type="number" name="proficiency" min="0" max="100" defaultValue="90" placeholder="e.g. 90" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Structural Classification Category</label>
                <select name="category" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono text-zinc-400 appearance-none">
                  <option value="Frontend Engineering">Frontend Engineering</option>
                  <option value="Backend / Systems">Backend / Systems</option>
                  <option value="DevOps & Cloud Infrastructure">DevOps & Cloud Infrastructure</option>
                  <option value="Databases & Caching">Databases & Caching</option>
                  <option value="AI / ML Frameworks">AI / ML Frameworks</option>
                </select>
              </div>

              <button type="submit" className="w-full mt-4 bg-white text-zinc-950 rounded-xl py-3 text-xs font-mono tracking-widest uppercase font-bold hover:bg-zinc-200 transition-colors active:scale-[0.99]">
                COMMIT SKILL MATRIX TO DATABASE
              </button>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
}