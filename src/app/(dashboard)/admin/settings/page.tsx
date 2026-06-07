// src/app/(dashboard)/admin/settings/page.tsx
import React from "react";
import { supabase } from "@/lib/db";
import { updateSiteSettingsAction } from "@/app/actions/siteSettings";
import { ShieldCheck, Globe, Save, HelpCircle } from "lucide-react";

export const revalidate = 0;

export default async function AdminSiteSettingsPage() {
  // Query the structural configuration schema table limit to 1 singular master row
  const { data: settingsRecords } = await supabase.from("site_settings").select("*").limit(1);
  const currentSettings = settingsRecords?.[0] || null;

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-white p-6 md:p-12 font-sans select-none">
      
      {/* HEADER BAR STATUS OVERVIEW */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-1">
            <ShieldCheck className="w-4 h-4" /> SECURE SESSION ENVIRONMENT
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Global Meta Settings</h1>
        </div>
        <div className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
          WORKSPACE: (DASHBOARD)/ADMIN/SETTINGS
        </div>
      </header>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* MAIN SETTINGS INTERACTIVE FORM ROW */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <h2 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Globe className="w-5 h-5 text-zinc-400" /> SEO Optimization Engine
            </h2>

            <form action={updateSiteSettingsAction} className="space-y-6">
              {/* Pass the row key securely behind the scenes to allow modifications without duplicated inputs */}
              <input type="hidden" name="id" value={currentSettings?.id || ""} />

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">
                  Global Browser Site Title
                </label>
                <input 
                  type="text" 
                  name="site_title" 
                  required 
                  defaultValue={currentSettings?.site_title || ""} 
                  placeholder="e.g. Bishal Gaihre | Senior Full Stack Engineer" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono text-white" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">
                  Global Meta Search Engine Description
                </label>
                <textarea 
                  name="site_description" 
                  required 
                  defaultValue={currentSettings?.site_description || ""} 
                  rows={5} 
                  placeholder="e.g. Portfolio showcasing specialized full-stack products, cloud architecture engineering solutions, and advanced developer tool designs built with Next.js and Supabase." 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono text-zinc-300 resize-none layout-leading-relaxed" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-white text-zinc-950 rounded-xl py-3.5 text-xs font-mono tracking-widest uppercase font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Save className="w-4 h-4" /> OVERWRITE SYSTEM METADATA
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDEBAR EXPLANATORY UTILITIES CARD */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-3xl p-6 font-mono text-xs text-zinc-400 space-y-4">
            <h3 className="text-white font-bold flex items-center gap-1.5 uppercase tracking-wide text-xs pb-2 border-b border-zinc-900">
              <HelpCircle className="w-4 h-4 text-zinc-500" /> Operational Guide
            </h3>
            <p className="leading-relaxed">
              The variables declared inside this dashboard configure what search index spiders (like Google or Bing) read when mapping out your domain portfolio.
            </p>
            <div className="space-y-2 pt-2 text-[11px]">
              <div className="flex gap-2 text-zinc-500">
                <span className="text-emerald-400 font-bold">✓</span> 
                <span>保持 Title strings concise to maximize visibility inside desktop tab viewframes.</span>
              </div>
              <div className="flex gap-2 text-zinc-500">
                <span className="text-emerald-400 font-bold">✓</span> 
                <span>Keep text summaries within 150-160 index characters to avoid tail cutoff on search layout pages.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}