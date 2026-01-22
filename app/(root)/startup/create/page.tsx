import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const experimental_ppr = true;

const Page = async () => {
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>

      <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
        <StartupFormWrapper />
      </Suspense>
    </>
  );
};

const StartupFormWrapper = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return <StartupForm type="create" />;
};

export default Page;
