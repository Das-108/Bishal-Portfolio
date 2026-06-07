// src/app/(dashboard)/admin/certificate/page.tsx
import React from "react";
import { supabase } from "@/lib/db";
import Image from "next/image";
import CertificateForm from "../../components/CertificateForm";
import { Award, ShieldCheck, Calendar, ExternalLink } from "lucide-react";

export const revalidate = 0;

export default async function AdminCertificatesDashboardPage() {
  const { data: certificates } = await supabase
    .from("certificates")
    .select("*")
    .order("priority", { ascending: true });

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-white p-6 md:p-12 font-sans select-none">
      
      <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-1">
            <ShieldCheck className="w-4 h-4" /> AUTHENTICATED SYSTEM SESSION
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Certificates Registry</h1>
        </div>
        <div className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
          WORKSPACE: (DASHBOARD)/ADMIN/CERTIFICATE
        </div>
      </header>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Data Log Display */}
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
                  <div key={cert.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3 hover:border-zinc-700 transition-colors">
                    <div className="flex gap-3 items-start">
                      {cert.image_url ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0">
                          <Image src={cert.image_url} alt="Badge Preview" fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg border border-dashed border-zinc-800 bg-zinc-900/40 flex items-center justify-center shrink-0">
                          <Award className="w-5 h-5 text-zinc-600" />
                        </div>
                      )}
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-xs font-black text-white uppercase tracking-tight truncate">{cert.title}</h3>
                          {cert.credential_url && (
                            <a href={cert.credential_url} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors shrink-0">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 font-medium truncate">{cert.issuer}</p>
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1 pt-1 border-t border-zinc-900">
                      <Calendar className="w-3 h-3" /> {cert.issue_date}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Rendered Client Form Component */}
        <div className="lg:col-span-2">
          <CertificateForm />
        </div>

      </div>
    </main>
  );
}