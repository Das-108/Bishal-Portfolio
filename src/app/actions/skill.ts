// src/app/actions/skill.ts
"use server";

import { supabaseAdmin } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Creates a brand new skill row matched exactly to the public database schema.
 * Handles continuous binary uploads straight to your 'images' bucket.
 */
export async function createSkillAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const client = supabaseAdmin();
  
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const priorityStr = formData.get("priority") as string;
  const iconFile = formData.get("icon") as File | null;

  if (!name || !category) {
    return { success: false, error: "Skill name and category assignments are mandatory inputs." };
  }

  const priority = priorityStr ? parseInt(priorityStr, 10) : 0;
  let iconUrl: string | null = null;

  try {
    // Process image binary stream if an icon is selected
    if (iconFile && iconFile.size > 0 && iconFile.name !== "undefined") {
      const ext = iconFile.name.split(".").pop();
      // Prepend folders neatly into your unified image asset store
      const targetFilePath = `icons/skill-${Date.now()}.${ext}`;
      const buffer = Buffer.from(await iconFile.arrayBuffer());

      const { error: uploadError } = await client.storage
        .from("images")
        .upload(targetFilePath, buffer, { contentType: iconFile.type });

      if (uploadError) throw uploadError;

      // Capture the live public layout address
      iconUrl = client.storage.from("images").getPublicUrl(targetFilePath).data.publicUrl;
    }

    const { error: dbError } = await client.from("skills").insert([
      {
        name,
        category,
        icon_url: iconUrl,
        priority: isNaN(priority) ? 0 : priority,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]);

    if (dbError) throw dbError;

    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (err: any) {
    console.error("Skills Creation Exception:", err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Safely removes a skill entry row from your database schema matrix.
 */
export async function deleteSkillAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const client = supabaseAdmin();
  const id = formData.get("id") as string;

  if (!id) return { success: false, error: "Target row unique tracking identifier is missing." };

  try {
    const { error } = await client.from("skills").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (err: any) {
    console.error("Skills Deletion Exception:", err.message);
    return { success: false, error: err.message };
  }
}