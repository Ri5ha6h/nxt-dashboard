'use client'

import { cn } from "@/lib/utils"
import Header from "@/src/customComponents/header"

export default function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className={cn("flex flex-col h-full w-full")}>
        <nav className={cn("flex h-[50px]")}>
            <Header/>
        </nav>
   
        <main className={cn("flex-1 bg-green-400-")}>
            {children}
        </main>
      </section>
    )
  }