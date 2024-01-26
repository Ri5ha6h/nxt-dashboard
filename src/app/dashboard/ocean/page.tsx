'use client'

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DataTableDemo } from '@/src/customComponents/custTable';
import Link from 'next/link';
import React from 'react'

const Ocean = () => {
    
  return (
    <div className={cn("flex flex-col justify-center items-center bg-yellow-400- h-full")}>
        <div className={cn("flex justify-center items-center h-[70px]")}>
            <h3>OCEAN</h3>
        </div>
        <div className={cn("flex-1")}>
            <DataTableDemo/>
        </div>
    </div>
  )
}

export default Ocean;


