"use client";
import { Input } from "./ui/input";
import React, { useState, useActionState, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Save, Send } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch, updatePitch } from "@/lib/actions";
import { FormState } from "@/lib/types";
import { Startup } from "@/sanity/types";

type StartupFormProps =
  | { type: "create" }
  | { type: "edit"; startup: Startup };

const StartupForm = (props: StartupFormProps) => {
  const router = useRouter();
  const { type } = props;
  const startup = props.type === "edit" ? props.startup : undefined;

  const initialState: FormState = {
    status: "INITIAL",
    error: "",
    errors: null,
  };

  const action = type === "create" ? createPitch : updatePitch;
  const [state, formAction, isPending] = useActionState(action, initialState);

  const [pitch, setPitch] = useState(startup?.pitch || "");

  useEffect(() => {
    if (state.status === "SUCCESS") {
      const successMessage =
        type === "create"
          ? "Your startup pitch has been created successfully"
          : "Your startup pitch has been updated successfully";
      toast.success("SUCCESS", {
        description: successMessage,
        duration: 5000,
      });
      router.push(`/startup/${startup?._id || state._id}`);
    } else if (state.status === "ERROR" && state.error && !state.errors) {
      toast.error("Error", {
        description: state.error,
        duration: 5000,
      });
    }
  }, [state, router, type, startup?._id]);

  return (
    <>
      <form className="startup-form" action={formAction}>
        <input type="hidden" name="pitch" value={pitch} />
        {type === "edit" && startup && (
          <input type="hidden" name="id" value={startup._id} />
        )}

        <div>
          <label htmlFor="title" className="startup-form_label">
            Title *
          </label>
          <Input
            id="title"
            name="title"
            className="startup-form_input"
            required
            defaultValue={startup?.title}
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
            defaultValue={startup?.description}
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
            defaultValue={startup?.category}
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
            defaultValue={startup?.image}
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

        <Button type="submit" className="startup-form_btn" disabled={isPending}>
          {isPending
            ? type === "create"
              ? "Submitting..."
              : "Saving..."
            : type === "create"
            ? "Submit your pitch"
            : "Save Changes"}
          {type === "create" ? (
            <Send className="size-6 ml-2" />
          ) : (
            <Save className="size-6 ml-2" />
          )}
        </Button>
      </form>
    </>
  );
};

export default StartupForm;
