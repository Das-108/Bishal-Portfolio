// src/app/actions/certificate.ts
"use server";

import { supabaseAdmin } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createCertificateAction(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;
  const issuer = formData.get("issuer") as string;
  const date_earned = formData.get("date_earned") as string;
  const credentialUrl = formData.get("credential_url") as string;
  const priorityStr = formData.get("priority") as string;

  if (!title || !issuer || !date_earned) {
    console.error("Validation Error: Title, Issuer, and Date Earned fields are required.");
    return;
  }

  const priority = priorityStr ? parseInt(priorityStr, 10) : 0;

  try {
    const client = supabaseAdmin();
    const { error } = await client.from("certificates").insert([
      {
        title,
        issuer,
        date_earned,
        credential_url: credentialUrl || null,
        priority: isNaN(priority) ? 0 : priority,
      }
    ]);

    if (error) throw new Error(error.message);

    // Evict path layouts from application cache context to enforce UI synchronization
    revalidatePath("/");
    revalidatePath("/admin/certificates");
  } catch (err: any) {
    console.error("Certificate Insertion Exception:", err.message);
  }
}