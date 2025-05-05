"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  const routes = [
    { name: "Home", path: "/" },
    { name: "Journey", path: "/journey" },
    { name: "Blog", path: "/blog" },
    { name: "Photography", path: "/photography" },
    { name: "Vlogs", path: "/vlogs" },
    { name: "Poems", path: "/poems" },
    { name: "About", path: "/about" },
  ]

  // Admin-specific routes
  const adminRoutes = [
    { name: "Dashboard", path: "/admin" },
    { name: "Manage Content", path: "/admin/manage-content" },
  ]

  // Select which routes to display based on path
  const displayRoutes = isAdminPage ? adminRoutes : routes

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-dark-300/80 backdrop-blur supports-[backdrop-filter]:bg-dark-300/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold gradient-text">
            {isAdminPage ? (
              <>
                <Lock className="inline-block h-4 w-4 mr-1" />
                Admin Panel
              </>
            ) : (
              "Anesthetic Coder"
            )}
          </span>
        </Link>
        <nav className="hidden md:flex md:items-center md:space-x-6">
          {displayRoutes.map((route, index) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative",
                pathname === route.path ? "text-primary" : "text-gray-400",
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {route.name}
              {pathname === route.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full"></span>
              )}
            </Link>
          ))}

          {/* Admin link */}
          {!isAdminPage ? (
            <Link
              href="/admin"
              className="text-sm font-medium transition-colors hover:text-primary relative text-gray-400"
            >
              <Lock className="inline-block h-3 w-3 mr-1" />
              Admin
            </Link>
          ) : (
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary relative text-gray-400"
            >
              Exit Admin
            </Link>
          )}
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-4 py-4 stagger-children">
            {displayRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary px-4 py-2",
                  pathname === route.path ? "bg-dark-100 text-primary" : "text-gray-400",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.name}
              </Link>
            ))}
            
            {/* Admin link for mobile */}
            {!isAdminPage ? (
              <Link
                href="/admin"
                className="text-sm font-medium transition-colors hover:text-primary px-4 py-2 text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <Lock className="inline-block h-3 w-3 mr-1" />
                Admin
              </Link>
            ) : (
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary px-4 py-2 text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Exit Admin
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
