// src/app/layout.tsx
import type { Metadata } from "next";
import { supabase } from "@/lib/db";
import "./globals.css";

// CRITICAL FIX: This stops Next.js from caching old database values
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Generates dynamic SEO metadata by querying your site_settings table.
 * If the table is empty or drops a connection, it falls back safely.
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("site_title, site_description")
      .limit(1);

    if (error || !data || data.length === 0) {
      // Fallback if no configuration row exists yet
      return {
        title: "Bishal Gaihre | Portfolio",
        description: "Full-stack developer portfolio",
      };
    }

    return {
      title: data[0].site_title || "Bishal Gaihre | Portfolio",
      description: data[0].site_description || "Full-stack developer portfolio",
    };
  } catch (err) {
    console.error("Metadata generation error:", err);
    return {
      title: "Bishal Gaihre | Portfolio",
      description: "Full-stack developer portfolio",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white selection:bg-zinc-800">
        {children}
      </body>
    </html>
  );
}