// src/app/(dashboard)/admin/about/page.tsx
import React from "react";
import { supabase } from "@/lib/db";
import AboutManagementForm from "../../components/AboutManagementForm";
import { ShieldCheck } from "lucide-react";

export const revalidate = 0;

export default async function AdminAboutDashboardPage() {
  // Query the profile metadata data stream
  const { data: aboutRecords } = await supabase.from("about").select("*").limit(1);
  // Fetch the current active resume file info
  const { data: resumeRecords } = await supabase.from("resume").select("*").eq("is_active", true).limit(1);

  const activeAbout = aboutRecords?.[0] || null;
  const activeResume = resumeRecords?.[0] || null;

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-white p-6 md:p-12 font-sans select-none">
      
      <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-1">
            <ShieldCheck className="w-4 h-4" /> SYSTEM AUTHENTICATION VERIFIED
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Profile Workspace</h1>
        </div>
        <div className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
          WORKSPACE: (DASHBOARD)/ADMIN/ABOUT
        </div>
      </header>

      {/* Render the interactive presentation layer */}
      <AboutManagementForm about={activeAbout} activeResume={activeResume} />

    </main>
  );
}