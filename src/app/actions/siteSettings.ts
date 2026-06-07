// src/app/actions/siteSettings.ts
"use server";

import { supabaseAdmin } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Persists changes made to your global application head configurations.
 * Upserts a single global record tracking meta tags.
 */
export async function updateSiteSettingsAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const client = supabaseAdmin();
  
  const id = formData.get("id") as string || undefined;
  const siteTitle = formData.get("site_title") as string;
  const siteDescription = formData.get("site_description") as string;

  if (!siteTitle || !siteDescription) {
    return { success: false, error: "Title and description entries cannot be submitted blank." };
  }

  try {
    const payload = {
      site_title: siteTitle,
      site_description: siteDescription,
      updated_at: new Date().toISOString()
    };

    if (id) {
      // Overwrite current properties if document primary ID exists
      const { error } = await client.from("site_settings").update(payload).eq("id", id);
      if (error) throw error;
    } else {
      // Generate a brand new record row if starting fresh
      const { error } = await client.from("site_settings").insert([payload]);
      if (error) throw error;
    }

    // Force Next.js to pull the latest configuration data immediately across layouts
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (err: any) {
    console.error("Site Settings Action Exception Error:", err.message);
    return { success: false, error: err.message };
  }
}