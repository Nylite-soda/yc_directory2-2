"use client";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/lib/actions";
import { FormState } from "@/lib/types";
import { Author } from "@/sanity/types";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserEditForm = ({ user }: { user: Author }) => {
  const router = useRouter();

  const initialState: FormState = {
    status: "INITIAL",
    error: "",
    errors: null,
  };

  const [state, formAction, isPending] = useActionState(
    updateUser,
    initialState
  );

  useEffect(() => {
    if (state.status === "SUCCESS") {
      toast.success("Profile Updated", {
        description: "Your profile has been updated successfully.",
        duration: 5000,
      });
      router.push(`/user/${user._id}`);
    } else if (state.status === "ERROR" && state.error) {
      toast.error("Error", {
        description: state.error,
        duration: 5000,
      });
    }
  }, [state, router, user._id]);

  return (
    <form className="startup-form" action={formAction}>
      <input type="hidden" name="id" value={user._id} />
      <div>
        <label htmlFor="name" className="startup-form_label">
          Name *
        </label>
        <Input
          id="name"
          name="name"
          className="startup-form_input"
          required
          defaultValue={user.name}
          placeholder="Your Name"
        />
        {state.errors?.name && (
          <p className="startup-form_error">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="username" className="startup-form_label">
          Username *
        </label>
        <Input
          id="username"
          name="username"
          className="startup-form_input"
          required
          defaultValue={user.username}
          placeholder="Your Username"
        />
        {state.errors?.username && (
          <p className="startup-form_error">{state.errors.username[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="bio" className="startup-form_label">
          Bio
        </label>
        <Textarea
          id="bio"
          name="bio"
          className="startup-form_textarea"
          defaultValue={user.bio}
          placeholder="Tell us about yourself"
        />
        {state.errors?.bio && (
          <p className="startup-form_error">{state.errors.bio[0]}</p>
        )}
      </div>

      <Button type="submit" className="startup-form_btn" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
        <Save className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default UserEditForm;
