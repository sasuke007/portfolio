import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-dark-300 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} John Doe. All rights reserved.</p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/blog" className="text-sm text-gray-500 hover:text-primary">
            Blog
          </Link>
          <Link href="/photography" className="text-sm text-gray-500 hover:text-primary">
            Photography
          </Link>
          <Link href="/vlogs" className="text-sm text-gray-500 hover:text-primary">
            Vlogs
          </Link>
          <Link href="/poems" className="text-sm text-gray-500 hover:text-primary">
            Poems
          </Link>
        </nav>
      </div>
    </footer>
  )
}
