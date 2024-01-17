"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";

const Header = ({ username, btnLoad, setBtnLoad }: any) => {
  const { toast } = useToast();
  const router = useRouter();

  const signOut = async () => {
    try {
      setBtnLoad(true);
      await axios.get("/api/users/signout");
      toast({
        description: "Sign out Successful.",
      });
      router.push("/signin");
    } catch (error: any) {
      console.error("Something went wrong, Sign out failed", error.message);
      toast({
        title: "Uh oh! Something went wrong, Sign out failed.",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setBtnLoad(false);
    }
  };

  return (
    <div className="h-[50px] bg-blue-300 w-full flex justify-around items-center">
      <p>Hi{username !== "" ? `, ${username}` : ""}</p>
      {/* <Button variant={'destructive'} onClick={signOut}>Logout</Button> */}
      <Button
        variant={"destructive"}
        onClick={signOut}
        disabled={btnLoad ? true : false}
      >
        {btnLoad ? (
          <>
            <CgSpinnerAlt className="animate-spin text-lg mr-1" /> Sign Out
          </>
        ) : (
          "Sign Out"
        )}
      </Button>
    </div>
  );
};

export default Header;
