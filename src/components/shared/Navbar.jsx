"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@heroui/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/pricing" },
  ];

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
          <Button variant="light" className="text-white">
            Sign In
          </Button>

          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Get Started
          </Button>
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
            <Button variant="light" className="text-white w-full">
              Sign In
            </Button>

            <Button className="bg-indigo-600 text-white w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}