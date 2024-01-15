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
import { CgSpinnerAlt } from "react-icons/cg";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(12, {
      message: "Password must not exceed 12 characters.",
    }),
});

const SignUpPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [btnLoad, setBtnLoad] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      setBtnLoad(true);
      const response = await axios.post("/api/users/signup", data);
      console.log("Sign up success", response.data);
      router.push("/signin");
    } catch (error: any) {
      console.error("Sign up failed", error.message);
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
          <h3 className="text-2xl font-bold">Sign Up!!</h3>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              "space-y-5 mt-5 border-gray-200 border w-[340px] rounded-md p-3"
            )}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn("text-lg")}>Username</FormLabel>
                  <FormControl>
                    <Input
                      className={cn("")}
                      required
                      placeholder="Enter your username.."
                      {...field}
                    />
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn("text-lg")}>Email</FormLabel>
                  <FormControl>
                    <Input
                      className={cn("")}
                      required
                      placeholder="Enter your email.."
                      {...field}
                    />
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
                    <Input
                      className={cn("")}
                      type="password"
                      required
                      placeholder="Enter your password.."
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {btnLoad ? (
                <>
                  <CgSpinnerAlt className="animate-spin text-lg mr-1" /> Sign Up
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <p>
              Already have an account ?{" "}
              <span className={cn("underline text-blue-600")}>
                <Link href={"/signin"}>SignIn</Link>
              </span>
            </p>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SignUpPage;
