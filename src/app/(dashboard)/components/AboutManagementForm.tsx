// src/components/dashboard/AboutManagementForm.tsx
"use client";

import React, { useState, ChangeEvent } from "react";
import { updateAboutAction, uploadResumeAction } from "@/app/actions/about";
import { User, FileText, Save, UploadCloud, Eye, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface AboutProps {
  id?: string;
  full_name?: string;
  headline?: string;
  short_bio?: string;
  long_bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  profile_image_url?: string;
}

interface ResumeProps {
  title: string;
  file_url: string;
}

export default function AboutManagementForm({ about, activeResume }: { about: AboutProps | null; activeResume: ResumeProps | null }) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(about?.profile_image_url || null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setResumeFileName(file.name);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* LEFT ASPECT: About Profile Form */}
      <div className="lg:col-span-2">
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
          <h2 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-2 border-b border-zinc-800 pb-3">
            <User className="w-5 h-5 text-zinc-400" /> Biography & Core Identity
          </h2>

          <form action={updateAboutAction} className="space-y-5">
            <input type="hidden" name="id" value={about?.id || ""} />
            <input type="hidden" name="current_profile_image_url" value={about?.profile_image_url || ""} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Full Name</label>
                <input type="text" name="full_name" required defaultValue={about?.full_name || ""} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Professional Headline</label>
                <input type="text" name="headline" required defaultValue={about?.headline || ""} placeholder="e.g. Full Stack Developer" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Short Elevator Bio</label>
              <input type="text" name="short_bio" defaultValue={about?.short_bio || ""} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Detailed Background Biography</label>
              <textarea name="long_bio" defaultValue={about?.long_bio || ""} rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Public Email Address</label>
                <input type="email" name="email" defaultValue={about?.email || ""} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Contact Phone Number</label>
                <input type="text" name="phone" defaultValue={about?.phone || ""} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Location Base</label>
                <input type="text" name="location" defaultValue={about?.location || ""} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">GitHub Profile Link</label>
                <input type="url" name="github_url" defaultValue={about?.github_url || ""} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">LinkedIn Profile Link</label>
                <input type="url" name="linkedin_url" defaultValue={about?.linkedin_url || ""} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
              </div>
            </div>

            {/* Avatar Input and Live Preview Render */}
            <div className="flex flex-col sm:flex-row gap-5 items-center pt-2 border-t border-zinc-900">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-zinc-800 shrink-0 bg-zinc-950 flex items-center justify-center">
                {avatarPreview ? (
                  <Image src={avatarPreview} alt="Avatar Frame Preview" fill className="object-cover" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-zinc-700" />
                )}
              </div>
              <div className="space-y-2 w-full flex-1">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Upload Profile Avatar Image</label>
                <input type="file" name="avatar" accept="image/*" onChange={handleAvatarChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-3 text-xs text-zinc-400 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-mono file:bg-zinc-800 file:text-zinc-300 file:hover:bg-zinc-700 cursor-pointer" />
              </div>
            </div>

            <button type="submit" className="w-full bg-emerald-500 text-zinc-950 rounded-xl py-3 text-xs font-mono tracking-widest uppercase font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> COMMIT IDENTITY DETAILS
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT ASPECT: Resume Management Form */}
      <div className="lg:col-span-1">
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl">
          <h2 className="text-sm font-mono tracking-widest text-zinc-400 uppercase mb-4 border-b border-zinc-800 pb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Active Portfolio Resume
          </h2>

          {activeResume && (
            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl mb-4 text-xs font-mono text-zinc-400 flex justify-between items-center">
              <span className="truncate pr-2 font-bold text-white">{activeResume.title}</span>
              <a href={activeResume.file_url} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline shrink-0 text-[10px] flex items-center gap-1">
                <Eye className="w-3 h-3" /> View Active PDF
              </a>
            </div>
          )}

          <form action={uploadResumeAction} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase block pl-1">Document Storage Title</label>
              <input type="text" name="title" required placeholder="e.g. Bishal Gaihre - Engineering CV" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase block pl-1">Attach Document File (.PDF)</label>
              <div className="relative w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 flex items-center gap-3 border-dashed hover:border-zinc-700 transition-colors cursor-pointer group">
                <UploadCloud className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400" />
                <input type="file" name="resume_file" required accept=".pdf" onChange={handleResumeChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <span className="text-zinc-500 text-xs font-mono truncate">
                  {resumeFileName ? resumeFileName : "Choose target PDF version..."}
                </span>
              </div>
            </div>
            <button type="submit" className="w-full bg-white text-zinc-950 rounded-xl py-2.5 text-xs font-mono tracking-widest uppercase font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5">
              <UploadCloud className="w-4 h-4" /> DEPLOY RESUME STREAM
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}