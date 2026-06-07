// src/components/dashboard/CertificateForm.tsx
"use client";

import React, { useState, changeEvent } from "react";
import { createCertificateAction } from "@/app/actions/certificate";
import { PlusCircle, Image as ImageIcon, Eye } from "lucide-react";
import Image from "next/image";

export default function CertificateForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: changeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  return (
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
            <input type="text" name="issue_date" required placeholder="e.g. Nov 2024" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-zinc-700 transition-colors font-mono" />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">Upload Certificate Badge Image</label>
            <div className="relative w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 flex items-center gap-3 border-dashed hover:border-zinc-700 transition-colors cursor-pointer group">
              <ImageIcon className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400" />
              <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <span className="text-zinc-500 text-xs font-mono truncate">
                {imagePreview ? "Image attached successfully" : "Select image file (PNG, JPG, WebP)..."}
              </span>
            </div>
          </div>

          <div className="md:col-span-1 space-y-2">
            <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1 flex items-center gap-1">
              <Eye className="w-3 h-3" /> Live Upload Preview
            </label>
            <div className="w-full h-[46px] bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center overflow-hidden relative">
              {imagePreview ? (
                <Image src={imagePreview} alt="Attached Form preview" fill className="object-contain p-1" />
              ) : (
                <span className="text-[10px] font-mono text-zinc-600">No file chosen</span>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="w-full mt-4 bg-white text-zinc-950 rounded-xl py-3 text-xs font-mono tracking-widest uppercase font-bold hover:bg-zinc-200 transition-colors active:scale-[0.99]">
          COMMIT CERTIFICATE TO ARCHIVE
        </button>
      </form>
    </div>
  );
}