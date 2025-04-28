"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribed with:", email)
    setEmail("")
  }

  return (
    <footer className="bg-[#FFCF33] w-full py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Newsletter Section */}
          <div className="bg-[#2A3990] p-6 rounded-lg lg:col-span-1">
            <h2 className="text-2xl font-bold text-[#FFCF33] mb-4">Subscribe to our newsletter</h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@gmail.com"
                  className="w-full bg-transparent border-b border-[#FFCF33]/50 py-2 pr-10 text-[#FFCF33] placeholder-[#FFCF33]/70 focus:outline-none"
                  required
                />
                <button type="submit" className="absolute right-0 bottom-2 text-[#FFCF33]" aria-label="Subscribe">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Support Columns - Repeated 4 times */}
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-[#2A3990] mb-4">Get support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-[#2A3990] hover:underline">
                    Help center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#2A3990] hover:underline">
                    Check order status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#2A3990] hover:underline">
                    Refunds
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#2A3990]/20 my-8"></div>

        {/* App Downloads and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-4">
            <Link href="#" aria-label="Get it on Google Play">
              <Image
                src="/icons/social/google.png"
                alt="Google Play"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <Link href="#" aria-label="Download on the App Store">
              <Image
                src="/icons/social/apple.png"
                alt="App Store"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="flex gap-4">
            <Link
              href="#"
              className="bg-[#FFCF33] border border-[#2A3990] rounded-full p-2 hover:bg-[#2A3990] hover:text-[#FFCF33] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 text-[#2A3990] hover:text-[#FFCF33]" />
            </Link>
            <Link
              href="#"
              className="bg-[#FFCF33] border border-[#2A3990] rounded-full p-2 hover:bg-[#2A3990] hover:text-[#FFCF33] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-[#2A3990] hover:text-[#FFCF33]" />
            </Link>
            <Link
              href="#"
              className="bg-[#FFCF33] border border-[#2A3990] rounded-full p-2 hover:bg-[#2A3990] hover:text-[#FFCF33] transition-colors"
              aria-label="TikTok"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-[#2A3990] hover:text-[#FFCF33]"
              >
                <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                <path d="M15 8a4 4 0 0 0 0 8V8Z" />
                <path d="M9 12V4h6" />
              </svg>
            </Link>
            <Link
              href="#"
              className="bg-[#FFCF33] border border-[#2A3990] rounded-full p-2 hover:bg-[#2A3990] hover:text-[#FFCF33] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5 text-[#2A3990] hover:text-[#FFCF33]" />
            </Link>
            <Link
              href="#"
              className="bg-[#FFCF33] border border-[#2A3990] rounded-full p-2 hover:bg-[#2A3990] hover:text-[#FFCF33] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5 text-[#2A3990] hover:text-[#FFCF33]" />
            </Link>
          </div>
        </div>

        {/* Copyright and Privacy */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 text-sm text-[#2A3990]">
          <p>© 2023 — Copyright</p>
          <Link href="#" className="hover:underline">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
