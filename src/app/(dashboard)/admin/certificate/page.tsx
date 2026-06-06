// src/app/(dashboard)/admin/certificates/page.tsx
import React from "react";
import { supabase } from "@/lib/db";
import { createCertificateAction } from "@/app/actions/certificate";
import { Award, ShieldCheck, PlusCircle, Calendar, ExternalLink } from "lucide-react";

export const revalidate = 0;

export default async function AdminCertificatesDashboardPage() {
  // Fetch currently loaded structural credential records from your database
  const { data: certificates } = await supabase
    .from("certificates")
    .select("*")
    .order("priority", { ascending: true });

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-white p-6 md:p-12 font-sans select-none">
      
      {/* Header View Block */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-1">
            <ShieldCheck className="w-4 h-4" /> AUTHENTICATED SYSTEM SESSION
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Certificates Registry</h1>
        </div>
        <div className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
          WORKSPACE: (DASHBOARD)/ADMIN/CERTIFICATES
        </div>
      </header>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Read Current Existing Credentials Output Log */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-sm font-mono tracking-widest text-zinc-400 uppercase mb-4 border-b border-zinc-800 pb-2">
              // Live Credentials
            </h2>
            
            {(!certificates || certificates.length === 0) ? (
              <p className="text-xs font-mono text-zinc-600">No verification data located.</p>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2 hover:border-zinc-700 transition-colors">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xs font-black text-white uppercase tracking-tight">{cert.title}</h3>
                      {cert.credential_url && (
                        <a href={cert.credential_url} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 font-medium">{cert.issuer}</p>
                    <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {cert.date_earned}
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
              <PlusCircle className="w-5 h-5 text-zinc-400" /> Catalog Certificate Entry
            </h2>

            <form action={createCertificateAction} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Certificate Title</label>
                  <input type="text" name="title" required placeholder="e.g. AWS Certified Solutions Architect" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Issuing Authority / Organization</label>
                  <input type="text" name="issuer" required placeholder="e.g. Amazon Web Services (AWS)" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Date Earned / Verification Window</label>
                  <input type="text" name="date_earned" required placeholder="e.g. Nov 2024" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Display Priority Order Weight</label>
                  <input type="number" name="priority" defaultValue="0" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Verification Credential URL (Optional)</label>
                <input type="url" name="credential_url" placeholder="https://www.credly.com/badges/your-id" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
              </div>

              <button type="submit" className="w-full mt-4 bg-white text-zinc-950 rounded-xl py-3 text-xs font-mono tracking-widest uppercase font-bold hover:bg-zinc-200 transition-colors active:scale-[0.99]">
                COMMIT CERTIFICATE TO ARCHIVE
              </button>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
}