"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, UserCircle, Menu } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { AuthDialogs } from "../auth/auth-dialogs";
import LinkApp from "../global/LinkApp";
import { CategoryHeader } from "./category-header";
import UserDrop from "../auth/user-drop";
import SubHeaderInput from "./SubHeaderInput";

export default function HeaderApp() {
  const session = useSession();
  console.log(session);

  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname.split("/").length === 1 || pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative h-16">
      <header
        className={`px-4 md:px-6 fixed top-0 left-0 right-0 z-[4447] ${
          isScrolled
            ? "bg-primary text-secondary shadow"
            : isHome
            ? "bg-primary text-secondary"
            : "bg-primary text-secondary"
        }`}
      >
        <div className="flex justify-between w-full shrink-0 items-center ">
          <LinkApp
            href="/"
            className="mr-6 hidden lg:flex items-center gap-x-2"
          >
            <Image
              src={"/icons/logo.png"}
              width={35}
              height={70}
              className="py-4"
              alt={"logo"}
            />
            <h1 className="text-2xl font-bold">Adlpress</h1>
          </LinkApp>
          <SubHeaderInput />
          <nav className="ms-auto hidden lg:flex gap-4 w-auto">
            {<LinksNavbar />}
          </nav>
          <div className="md:hidden">
            <LinkApp href="/" className="flex items-center gap-x-2">
              <Image
                src={"/icons/logo.png"}
                width={35}
                height={70}
                className="py-4"
                alt={"logo"}
              />
              <h1 className="text-lg font-bold">Adlpress</h1>
            </LinkApp>
          </div>
          {<SideBarForApp />}
        </div>
        <div className={""}>
          <CategoryHeader />
        </div>
      </header>
    </div>
  );
}

export function LinksNavbar({ isMobile = false }: { isMobile?: boolean }) {
  const classForMobile =
    "flex gap-x-2 w-full whitespace-nowrap items-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50";
  const classForDesktop =
    "flex gap-x-2 h-12 w-full whitespace-nowrap items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50";

  const { data: session, status } = useSession();
  const user: any = session?.user;
  return (
    <>
      {status === "authenticated" ? (
        <>
          <LinkApp
            href={"/cart"}
            className={`${isMobile ? classForMobile : classForDesktop}`}
          >
            <ShoppingCart className="size-8 md:size-5" />
          </LinkApp>
          <UserDrop user={{name: user?.username}} isMobile={isMobile} />
        </>
      ) : (
        <AuthDialogs
          trigger={
            <Button
              className={`bg-secondary text-black hover:bg-primary hover:text-secondary ${
                isMobile ? classForMobile : classForDesktop
              }`}
            >
              <UserCircle className="size-8 md:size-5" />
              <span className="w-auto">Sign in / Sign up</span>
            </Button>
          }
        />
      )}
    </>
  );
}

function SideBarForApp() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="z-[81781454718]">
        <LinkApp href="/" className="mr-6 flex items-center gap-x-2">
          <Image
            src={"/icons/logo.png"}
            width={35}
            height={70}
            className="py-4"
            alt={"logo"}
          />
          <h1 className="text-xl font-bold">Adlpress</h1>
        </LinkApp>
        <div className="grid gap-2 py-6">
          <LinksNavbar isMobile />
        </div>
      </SheetContent>
    </Sheet>
  );
}
