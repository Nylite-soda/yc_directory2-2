"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { formSchema } from "./validation";

import { FormState } from "./types";

export const createPitch = async (
  prevState: FormState,
  form: FormData
): Promise<FormState> => {
  const session = await auth();
  if (!session) {
    return { status: "ERROR", error: "Not Signed In", errors: null };
  }

  // 1. Get all data from the form
  const formData = Object.fromEntries(form.entries());

  // 2. Validate the data using the Zod schema
  const validatedFields = await formSchema.safeParseAsync(formData);

  // 3. If validation fails, return the errors
  if (!validatedFields.success) {
    return {
      status: "ERROR",
      error: "Invalid input.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 4. If validation succeeds, proceed to create the document
  const { title, description, category, link, pitch } = validatedFields.data;
  const slug = slugify(title, { lower: true, strict: true });

  try {
    const startup = {
      _type: "startup",
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create(startup);

    return {
      status: "SUCCESS",
      error: "",
      errors: null,
      _id: result._id,
    };
  } catch (error) {
    // Handle potential Sanity client errors
    return {
      status: "ERROR",
      error: "Failed to create startup.",
      errors: null,
    };
  }
};
