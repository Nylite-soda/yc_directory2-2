import { auth } from "@/auth";
import { BadgePlus, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import LoadingLink from "./LoadingLink";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sams">
      <nav className="flex justify-between items-center">
        <LoadingLink href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </LoadingLink>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <LoadingLink href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </LoadingLink>

              <LogoutButton />

              <LoadingLink href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>
                    <User className="size-6" />
                  </AvatarFallback>
                </Avatar>
              </LoadingLink>
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
