"use client"

import React, { ReactNode } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  LogOut,
  ChevronDown,
  User
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Toaster } from "sonner"
import { ContentTypeSelector } from "@/components/ui/content-type-selector"
// Admin UI wrapper with authentication state from context
function AdminUI({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-300">
      {/* Admin Header */}
      <header className="border-b border-border/50 sticky top-0 z-50 w-full bg-dark-200/80 backdrop-blur-md">
        <div className="container flex h-14 items-center px-4">
              <Link href="/admin" className="mr-4 flex items-center space-x-2">
            <LayoutDashboard className="h-5 w-5 text-glow-purple" />
            <span className="font-bold">Admin Dashboard</span>
          </Link>

          {/* Content Type Selector */}
          <ContentTypeSelector className="ml-auto" />

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-4">
                <User className="h-4 w-4 mr-2" />
                {"Admin"}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={()=>{}}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  )
}

// Main layout component that wraps with AuthProvider
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminUI>{children}</AdminUI>
      <Toaster richColors position="top-right" />
    </>
  )
} 