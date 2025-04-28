"use client";
import { SessionProvider } from "next-auth/react";
import "./global.css";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
