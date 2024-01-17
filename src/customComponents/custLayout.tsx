"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Header from "@/src/customComponents/header";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CgSpinnerAlt } from "react-icons/cg";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type CustType = {
  children: React.ReactNode;
};

const useUser = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    let ignore = false;

    const getUserName = async () => {
      try {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        //setUser(res.data.data.username); in project vid
        if(res.status === 200){
            setUser(res.data.data.username);
        }else{
            setUser("");
        }
      } catch (error: any) {
        //console.error(error.message);
      }
    };

    if (!ignore && user === "") {
      getUserName();
    }
    return () => {
      ignore = true;
    };
  }, [user]);

  return {user};
};

const CustomLayout = ({ children }: CustType) => {
  const [btnLoad, setBtnLoad] = useState(false);
  //const [user, setUser] = useState("");
  const {user} = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const signOut = async () => {
    try {
      setBtnLoad(true);
      await axios.get("/api/users/signout");
      toast({
        description: "Sign out Successful.",
      });
      router.push("/signin");
      window.location.reload();
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
    <>
      {user !== "" ? (
        <div className="h-[50px] bg-blue-300 w-full flex justify-around items-center">
          <p>Hi, {user}</p>
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
      ) : (
        <></>
      )}
      <main
        className={cn(
          "flex flex-col items-center justify-between p-24 ",
          user !== "" ? "flex-1 " : ""
        )}
      >
        {children}
      </main>
    </>
  );
};

export default CustomLayout;
