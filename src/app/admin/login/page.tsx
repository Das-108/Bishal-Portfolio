"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, User, Terminal, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Execute Auth.js Client API Validation pipeline
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false, // Prevent standard hard browser reloading loops
      });

      if (result?.error) {
        setError("Invalid administrative credentials credentials verification failed.");
        setLoading(false);
      } else {
        // Validation Successful! Route safely into the workspace dashboard shell
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected authentication pipeline exception occurred.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Decorative Cinematic Light Glow Flairs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-zinc-900/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Core Terminal Authentication Box */}
      <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl z-10 transition-all duration-300 hover:border-zinc-700/60">
        
        {/* Upper Brand Shell Title Layout */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto mb-4 text-zinc-400 group">
            <Terminal className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
            CMS Core Gateway
          </h1>
          <p className="text-xs font-mono tracking-wider text-zinc-500 mt-1 uppercase">
            [ Identity Perimeter Verification Required ]
          </p>
        </div>

        {/* Dynamic Error Status Notification Box */}
        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-900/50 rounded-xl flex items-start gap-3 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs font-mono text-red-400 leading-normal">{error}</p>
          </div>
        )}

        {/* Credentials Form Structure */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">
              Admin Identity Handle
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 w-4 h-4 text-zinc-600 pointer-events-none" />
              <input
                type="text"
                required
                disabled={loading}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. administrator"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-zinc-700 font-mono focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block pl-1">
              Secure Key Token
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-4 h-4 text-zinc-600 pointer-events-none" />
              <input
                type="password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-zinc-700 font-mono focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Action Trigger Verification Submission Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-white text-zinc-950 rounded-xl py-3 text-xs font-mono tracking-widest uppercase font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 active:scale-[0.99] transition-all disabled:opacity-40"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-3.5 w-3.5 text-zinc-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                VERIFYING...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                EXECUTE HANDSHAKE <ArrowRight className="w-3.5 h-3.5" />
              </span>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}