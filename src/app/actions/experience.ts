// src/app/actions/experience.ts
"use server";

import { supabaseAdmin } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createExperienceAction(formData: FormData) {
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const duration = formData.get("duration") as string;
  const location = formData.get("location") as string;
  const rawBullets = formData.get("bullet_points") as string;
  const priorityStr = formData.get("priority") as string;

  if (!company || !role || !duration) {
    return { success: false, message: "Company, Role, and Duration fields are strictly required." };
  }

  // Split lines by newline characters to elegantly structure bullet points arrays
  const bullet_points = rawBullets 
    ? rawBullets.split("\n").map(b => b.trim()).filter(Boolean) 
    : [];
  
  const priority = priorityStr ? parseInt(priorityStr, 10) : 0;

  try {
    const client = supabaseAdmin();
    const { error } = await client.from("experiences").insert([
      {
        company,
        role,
        duration,
        location: location || null,
        bullet_points,
        priority: isNaN(priority) ? 0 : priority,
      }
    ]);

    if (error) throw new Error(error.message);

    // Wipe layout cache contexts to enforce real-time structural synchronization
    revalidatePath("/");
    revalidatePath("/admin/experience");

    return { success: true, message: "Career timeline record saved successfully!" };
  } catch (err: any) {
    console.error("Experience Action Exception:", err.message);
    return { success: false, message: err.message || "Failed to submit career table insertion." };
  }
}