"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, User, Search } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Scanner", href: "/scanner" },
  { name: "Voice Assistant", href: "/voice-assistant" },
  { name: "Myth Buster", href: "/myth-buster" },
  { name: "Recommendations", href: "/recommendations" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <span className="text-xl font-bold text-slate-900">Cosmovera</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="mt-8 flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-rose-600",
                      pathname === item.href ? "text-rose-600" : "text-slate-900",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/profile"
                  className="text-lg font-medium text-slate-900 transition-colors hover:text-rose-600"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/premium"
                  className="text-lg font-medium text-slate-900 transition-colors hover:text-rose-600"
                  onClick={() => setIsOpen(false)}
                >
                  Premium
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-slate-900">Cosmovera</span>
          </Link>
        </div>

        <nav className="hidden lg:flex lg:items-center lg:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-rose-600",
                pathname === item.href ? "text-rose-600" : "text-slate-900",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-slate-900">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-slate-900">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
          <Link href="/premium" className="hidden sm:block">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white">Go Premium</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

