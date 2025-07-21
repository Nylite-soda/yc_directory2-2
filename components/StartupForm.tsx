"use client";
import { Input } from "./ui/input";
import React, { useState, useActionState, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

import { FormState } from "@/lib/types";

// ... other imports

const StartupForm = () => {
  const router = useRouter();

  const initialState: FormState = {
    status: "INITIAL",
    error: "",
    errors: null,
  };
  const [state, formAction, isPending] = useActionState(
    createPitch,
    initialState
  );

  // Use a hidden input for the pitch to include it in formData
  const [pitch, setPitch] = useState("");

  useEffect(() => {
    if (state.status === "SUCCESS") {
      toast.success("SUCCESS", {
        description: "Your startup pitch has been created successfully",
        duration: 5000,
      });
      router.push(`/startup/${state._id}`);
    } else if (state.status === "ERROR" && state.error && !state.errors) {
      // This handles general errors (not field-specific)
      toast.error("Error", {
        description: state.error,
        duration: 5000,
      });
    }
  }, [state, router]);
// ... rest of the component

  return (
    <>
      <form className="startup-form" action={formAction}>
        {/* Hidden input for pitch */}
        <input type="hidden" name="pitch" value={pitch} />

        <div>
          <label htmlFor="title" className="startup-form_label">
            Title *
          </label>
          <Input
            id="title"
            name="title"
            className="startup-form_input"
            required
            placeholder="Startup Title"
          />
          {state.errors?.title && (
            <p className="startup-form_error">{state.errors.title[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="startup-form_label">
            Description *
          </label>
          <Textarea
            id="description"
            name="description"
            className="startup-form_textarea"
            required
            placeholder="Startup Description"
          />
          {state.errors?.description && (
            <p className="startup-form_error">{state.errors.description[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="startup-form_label">
            Category *
          </label>
          <Input
            id="category"
            name="category"
            className="startup-form_input"
            required
            placeholder="Startup Category (Tech, Health, Education...)"
          />
          {state.errors?.category && (
            <p className="startup-form_error">{state.errors.category[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="link" className="startup-form_label">
            Image URL *
          </label>
          <Input
            id="link"
            name="link"
            className="startup-form_input"
            required
            placeholder="Startup Image URL"
          />
          {state.errors?.link && (
            <p className="startup-form_error">{state.errors.link[0]}</p>
          )}
        </div>

        <div data-color-mode="light">
          <label htmlFor="pitch-editor" className="startup-form_label">
            Pitch *
          </label>
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value || "")}
            id="pitch-editor"
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{
              placeholder:
                "Briefly describe your idea and what problem it solves",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
          {state.errors?.pitch && (
            <p className="startup-form_error">{state.errors.pitch[0]}</p>
          )}
        </div>

        <Button
          type="submit"
          className="startup-form_btn text-white"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit your pitch"}
          <Send className="size-6 ml-2" />
        </Button>
      </form>
    </>
  );
};

export default StartupForm;
