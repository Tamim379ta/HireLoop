import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

// React Icons (simple + stable)
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Job discovery", href: "#" },
        { label: "Worker AI", href: "#" },
        { label: "Companies", href: "#" },
        { label: "Salary data", href: "#" },
      ],
    },
    {
      title: "Navigation",
      links: [
        { label: "Help center", href: "#" },
        { label: "Career library", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Brand guideline", href: "#" },
        { label: "Newsroom", href: "#" },
      ],
    },
  ];

  const IconBtn = ({ children, label, className = "" }) => (
    <Button
      isIconOnly
      size="sm"
      variant="flat"
      aria-label={label}
      className={`rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 ${className}`}
    >
      {children}
    </Button>
  );

  return (
    <footer className="w-full bg-black text-zinc-400 py-16 px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="md:col-span-5 space-y-5">
            <Image
              src="/assets/logo.png"
              alt="HireLoop logo"
              width={140}
              height={40}
              className="object-contain"
              priority
            />

            <p className="text-sm text-zinc-600 max-w-xs leading-relaxed">
              The AI-native career platform built for people who take their work seriously.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((group, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-sm font-medium text-indigo-500">
                  {group.title}
                </h4>

                <ul className="space-y-3">
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 border-t border-zinc-900/60 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Social Icons */}
          <div className="flex items-center gap-3">

            <IconBtn label="Facebook">
              <FaFacebookF size={14} />
            </IconBtn>

            <IconBtn label="Twitter">
              <FaTwitter size={14} />
            </IconBtn>

            <IconBtn label="LinkedIn">
              <FaLinkedinIn size={14} />
            </IconBtn>

            <IconBtn label="GitHub">
              <FaGithub size={14} />
            </IconBtn>

          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs text-zinc-600">
            <span>© {currentYear} HireLoop. All rights reserved.</span>

            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-zinc-400">
                Terms
              </Link>
              <span>-</span>
              <Link href="#" className="hover:text-zinc-400">
                Privacy
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}