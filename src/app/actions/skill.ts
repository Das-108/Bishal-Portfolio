// src/app/actions/skill.ts
"use server";

import { supabaseAdmin } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createSkillAction(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const proficiencyStr = formData.get("proficiency") as string;

  if (!name || !category) {
    console.error("Validation Error: Skill Name and Category are mandatory fields.");
    return;
  }

  const proficiency = proficiencyStr ? parseInt(proficiencyStr, 10) : 80;

  try {
    const client = supabaseAdmin();
    const { error } = await client.from("skills").insert([
      {
        name,
        category,
        proficiency: isNaN(proficiency) ? 80 : proficiency,
      }
    ]);

    if (error) throw new Error(error.message);

    // Revalidate data cache layers instantly
    revalidatePath("/");
    revalidatePath("/admin/skills");
  } catch (err: any) {
    console.error("Skills Insertion Exception:", err.message);
  }
}