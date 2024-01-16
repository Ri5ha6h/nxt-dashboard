'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const Header = () => {

  const { toast } = useToast();
  const router = useRouter();

  const signOut = async () => {
    try {
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
        variant: 'destructive'
      });
    }
  }

  return (
    <div className='h-[50px] bg-blue-300 w-full flex justify-around items-center'>
      <p>Header</p>
      <Button variant={'destructive'} onClick={signOut}>Logout</Button>
    </div>
  )
}

export default Header