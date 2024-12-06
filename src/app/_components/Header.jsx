"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { CreditCard } from "lucide-react";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <div className="flex flex-row items-center">
        <CreditCard
          className="text-blue-800"
          alt="logo"
          width={40}
          height={30}
        />
        <Link href={"/"}>
          <span className="text-blue-800 font-bold text-xl">Finansmart</span>
        </Link>
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div className="flex gap-3 items-center">
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button className="rounded-full">Get Started</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
