import { signIn } from "@/auth";
import { LogIn } from "lucide-react";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit" className="button">
        <span className="max-sm:hidden">Sign In</span>
        <LogIn className="size-7 sm:hidden" />
      </button>
    </form>
  );
}
