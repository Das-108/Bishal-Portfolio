// // src/app/actions/project.ts
// "use server";

// import { supabaseAdmin } from "@/lib/db";
// import { revalidatePath } from "next/cache";

// export async function createProjectAction(formData: FormData): Promise<void> {
//   const title = formData.get("title") as string;
//   const description = formData.get("description") as string;
//   const rawTags = formData.get("tags") as string;
//   const liveUrl = formData.get("live_url") as string;
//   const githubUrl = formData.get("github_url") as string;
//   const priorityStr = formData.get("priority") as string;

//   if (!title || !description) {
//     console.error("Validation Error: Missing title or description.");
//     return;
//   }

//   const tags = rawTags ? rawTags.split(",").map(t => t.trim()).filter(Boolean) : [];
//   const priority = priorityStr ? parseInt(priorityStr, 10) : 0;

//   try {
//     const client = supabaseAdmin();
//     const { error } = await client.from("projects").insert([
//       {
//         title,
//         description,
//         tags,
//         live_url: liveUrl || null,
//         github_url: githubUrl || null,
//         priority: isNaN(priority) ? 0 : priority,
//       }
//     ]);

//     if (error) throw new Error(error.message);

//     revalidatePath("/");
//     revalidatePath("/admin/projects");
//   } catch (err: any) {
//     console.error("Project Insertion Exception:", err.message);
//   }
// }

// src/app/actions/project.ts
"use server";

import { supabaseAdmin } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProjectAction(formData: FormData): Promise<void> {
  // 1. CRITICAL DEBUG LINE: Let's see if the key is actually visible to this file
  console.log("--- DEBUGGING SERVER ACTION ENVIRONMENT ---");
  console.log("SUPABASE_SERVICE_ROLE_KEY EXISTS?:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  console.log("KEY LENGTH:", process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0);
  console.log("-------------------------------------------");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const rawTags = formData.get("tags") as string;
  const liveUrl = formData.get("live_url") as string;
  const githubUrl = formData.get("github_url") as string;
  const priorityStr = formData.get("priority") as string;

  if (!title || !description) {
    console.error("Validation Error: Missing title or description.");
    return;
  }

  const tags = rawTags ? rawTags.split(",").map(t => t.trim()).filter(Boolean) : [];
  const priority = priorityStr ? parseInt(priorityStr, 10) : 0;

  try {
    const client = supabaseAdmin();
    const { error } = await client.from("projects").insert([
      {
        title,
        description,
        tags,
        live_url: liveUrl || null,
        github_url: githubUrl || null,
        priority: isNaN(priority) ? 0 : priority,
      }
    ]);

    if (error) throw new Error(error.message);

    revalidatePath("/");
    revalidatePath("/admin/projects");
  } catch (err: any) {
    console.error("Project Insertion Exception:", err.message);
  }
}