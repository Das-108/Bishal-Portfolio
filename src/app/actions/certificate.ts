// src/app/actions/certificate.ts
"use server";

import { supabaseAdmin } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createCertificateAction(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;
  const issuer = formData.get("issuer") as string;
  const issueDate = formData.get("issue_date") as string;
  const credentialUrl = formData.get("credential_url") as string;
  const priorityStr = formData.get("priority") as string;
  const imageFile = formData.get("image") as File | null;

  if (!title || !issuer || !issueDate) {
    console.error("Validation Error: Title, Issuer, and Issue Date are required.");
    return;
  }

  const priority = priorityStr ? parseInt(priorityStr, 10) : 0;
  let imageUrl: string | null = null;

  try {
    const client = supabaseAdmin();

    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      const fileExtension = imageFile.name.split(".").pop();
      
      // Prepend the target folder path directly to the file destination string
      const targetFilePath = `certificates/${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtension}`;

      const fileArrayBuffer = await imageFile.arrayBuffer();
      const fileBuffer = Buffer.from(fileArrayBuffer);

      // Target your unified 'images' bucket
      const { error: uploadError } = await client.storage
        .from("images")
        .upload(targetFilePath, fileBuffer, {
          contentType: imageFile.type,
          upsert: false
        });

      if (uploadError) throw new Error(`Storage Fault: ${uploadError.message}`);

      const { data: publicUrlData } = client.storage
        .from("images")
        .getPublicUrl(targetFilePath);

      imageUrl = publicUrlData.publicUrl;
    }

    const { error: dbError } = await client.from("certificates").insert([
      {
        title,
        issuer,
        issue_date: issueDate,
        credential_url: credentialUrl || null,
        image_url: imageUrl,
        priority: isNaN(priority) ? 0 : priority,
      }
    ]);

    if (dbError) throw new Error(dbError.message);

    revalidatePath("/");
    revalidatePath("/admin/certificate");
  } catch (err: any) {
    console.error("Certificate Insertion Exception:", err.message);
  }
}