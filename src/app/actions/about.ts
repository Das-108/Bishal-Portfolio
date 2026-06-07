// src/app/actions/about.ts
"use server";

import { supabaseAdmin } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateAboutAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const client = supabaseAdmin();
  
  const id = formData.get("id") as string || undefined;
  const fullName = formData.get("full_name") as string;
  const headline = formData.get("headline") as string;
  const shortBio = formData.get("short_bio") as string;
  const longBio = formData.get("long_bio") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const location = formData.get("location") as string;
  const githubUrl = formData.get("github_url") as string;
  const linkedinUrl = formData.get("linkedin_url") as string;
  const twitterUrl = formData.get("twitter_url") as string;
  const websiteUrl = formData.get("website_url") as string;
  const avatarFile = formData.get("avatar") as File | null;

  let profileImageUrl = formData.get("current_profile_image_url") as string || null;

  try {
    if (avatarFile && avatarFile.size > 0 && avatarFile.name !== "undefined") {
      const ext = avatarFile.name.split(".").pop();
      
      // Store neatly inside your profileImg folder path
      const targetFilePath = `profileImg/avatar-${Date.now()}.${ext}`;
      const buffer = Buffer.from(await avatarFile.arrayBuffer());

      // Target your unified 'images' bucket
      const { error: uploadError } = await client.storage
        .from("images") 
        .upload(targetFilePath, buffer, { contentType: avatarFile.type });

      if (uploadError) throw uploadError;

      profileImageUrl = client.storage.from("images").getPublicUrl(targetFilePath).data.publicUrl;
    }

    const payload = {
      full_name: fullName,
      headline,
      short_bio: shortBio || null,
      long_bio: longBio || null,
      email: email || null,
      phone: phone || null,
      location: location || null,
      github_url: githubUrl || null,
      linkedin_url: linkedinUrl || null,
      twitter_url: twitterUrl || null,
      website_url: websiteUrl || null,
      profile_image_url: profileImageUrl,
      updated_at: new Date().toISOString()
    };

    if (id) {
      const { error } = await client.from("about").update(payload).eq("id", id);
      if (error) throw error;
    } else {
      const { error } = await client.from("about").insert([payload]);
      if (error) throw error;
    }

    revalidatePath("/");
    revalidatePath("/admin/about");
    return { success: true };
  } catch (err: any) {
    console.error("About Me Action Error:", err.message);
    return { success: false, error: err.message };
  }
}

export async function uploadResumeAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const client = supabaseAdmin();
  const title = formData.get("title") as string;
  const file = formData.get("resume_file") as File | null;

  if (!title || !file || file.size === 0) {
    return { success: false, error: "Missing required fields or file asset." };
  }

  try {
    const ext = file.name.split(".").pop();
    const filename = `resume-${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await client.storage
      .from("resumes")
      .upload(filename, buffer, { contentType: file.type });

    if (uploadError) throw uploadError;

    const fileUrl = client.storage.from("resumes").getPublicUrl(filename).data.publicUrl;

    await client.from("resume").update({ is_active: false }).eq("is_active", true);

    const { error: dbError } = await client.from("resume").insert([
      { title, file_url: fileUrl, is_active: true }
    ]);

    if (dbError) throw dbError;

    revalidatePath("/");
    revalidatePath("/admin/about");
    return { success: true };
  } catch (err: any) {
    console.error("Resume Action Error:", err.message);
    return { success: false, error: err.message };
  }
}