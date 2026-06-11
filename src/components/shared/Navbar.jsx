"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, error } = authClient.useSession()

  const user = session?.user

  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/pricing" },
  ];

  const dashboardLink = {
    seeker: '/dashboard/seeker',
    recruiter: '/dashboard/recruiter',
    admin: '/dashboard/admin'
  }
  if(user?.email) {
    navLinks.push(
    { name: "Dashboard", href: dashboardLink[user?.role || 'seeker']  }
    )
  }
  return (
    <header className="w-full bg-[#0f0f0f] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LEFT - Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo.png"
            alt="HireLoop"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* RIGHT - Nav + Auth */}
        <div className="hidden md:flex items-center gap-6 text-sm text-white/80">

          {/* Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-white transition"
            >
              {link.name}
            </Link>
          ))}

          {/* Divider */}
          <div className="h-5 w-[1px] bg-white/20" />

          {/* Auth Buttons */}
          {
            user ? (
              <>
                <p>Hi, {user?.name}</p>
               

                <Button onClick={async () => await authClient.signOut()} className="bg-red-600 hover:bg-red-700 text-white">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/signIn">
                  <Button variant="light" className="text-white">
                    Sign In
                  </Button>
                </Link>

                <Link href="/signUp">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )
          }
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0f0f0f] border-t border-white/10 px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-white/80 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Divider */}
          <div className="h-[1px] bg-white/10 my-2" />

          <div className="flex flex-col gap-2">
            {
              user ? (
                <>
                  <p>Hi, {user?.name}</p>
                 
                  <Button onClick={async () => await authClient.signOut()} className="bg-red-600 hover:bg-red-700 text-white">
                    Logout
                  </Button>

                </>
              ) : (
                <>
                  <Link href="/signIn">
                    <Button variant="light" className="text-white">
                      Sign In
                    </Button>
                  </Link>

                  <Link href="/signUp">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                </>
              )
            }
          </div>
        </div>
      )}
    </header>
  );
}