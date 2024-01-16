"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { CgSpinnerAlt } from "react-icons/cg";

const formSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." })
  .email("This is not a valid email."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).max(12, {
    message: "Password must not exceed 12 characters."
  }),
});

const SignInPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [btnLoad, setBtnLoad] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: any) => {
    try {
      setBtnLoad(true);
      const response = await axios.post("/api/users/signin", data);
      console.log("Sign in success", response.data);
      toast({
        description: "Sign in Successful.",
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Something wrong, Login Failed", error.message);
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } finally {
      setBtnLoad(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div>
          <h3 className="text-2xl font-bold">Sign In!!</h3>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-5 mt-5 border-gray-200 border w-[340px] rounded-md p-3")}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                    <FormLabel className={cn("text-lg")}>Email</FormLabel>
                    <FormControl>
                      <Input className={cn("")} required placeholder="Enter your email.." {...field} />
                    </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                    <FormLabel className={cn("text-lg")}>Password</FormLabel>
                    <FormControl>
                      <Input className={cn("")} type="password" required placeholder="Enter your password.." {...field} />
                    </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={btnLoad ? true : false}>
              {btnLoad ? (
                <>
                  <CgSpinnerAlt className="animate-spin text-lg mr-1" /> Sign In
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <p>
              Doesn&apos;t have an account ? <span className={cn("underline text-blue-600")}><Link href={"/signup"}>SignUp</Link></span>
            </p>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SignInPage;
