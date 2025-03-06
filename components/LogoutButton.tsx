import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="button">
        <span className="max-sm:hidden">Log Out</span>
        <LogOut className="size-6 sm:hidden" />
      </button>
    </form>
  );
}
