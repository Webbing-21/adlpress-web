"use client"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react"
import LinkApp from "../global/LinkApp"
import { Button } from "../ui/button"
import IconLeftAndRight from "../global/IconLeftAndRight"
import img1 from '/public/icons/category/3.png'
import CategoryCardForHeader from "../categories/CategoryCardForHeader"
import { usePathname } from "next/navigation"

export function CategoryHeader() {
  const pathname = usePathname();
    const isHome = pathname.split("/").length === 1 || pathname === "/";
    const categories = [
      { id: 2, name: "New in", url: "new-in" },
      { id: 3, name: "Sale", url: "sale" },
      { id: 4, name: "Electronics", url: "electronics" },
      { id: 5, name: "Screens", url: "screens" },
      { id: 6, name: "Speakers", url: "speakers" },
      { id: 7, name: "Covers", url: "covers" },
      { id: 8, name: "Cables", url: "cables" },
      { id: 9, name: "Chargers", url: "chargers" },
      { id: 10, name: "Others", url: "others" }
    ]
    
    return (
      <NavigationMenu className={`z-50 relative hidden bg-primary text-secondary lg:block w-full min-w-full`} dir="ltr">
        <NavigationMenuList className="flex justify-start">
          <NavigationMenuItem className="text-secondary">
            <NavigationMenuTrigger className={` ${'!text-secondary'}`}>All Categories</NavigationMenuTrigger>
            <NavigationMenuContent className="flex gap-4 p-4 md:w-[95vw]">
              <div className="w-[300px]">
                {categories.map((item, index) => <Button key={index} variant={'ghost'} className="w-full flex justify-between h-14 rounded-none">
                  <span className="">{item.name}</span>
                  <IconLeftAndRight className="!size-7 text-gray-400"/>
                </Button>)}
              </div>
              <div className="w-[300px]">
                {[...Array(3)].map((e, index) => <Button key={index} variant={'ghost'} className="w-full flex justify-between h-14 rounded-none">
                  <span>Male</span>
                  {/* <IconLeftAndRight className="!size-7 text-gray-400"/> */}
                </Button>)}
              </div>
              <div className="flex flex-wrap gap-x-5">
                {categories.map((item, index) =>  
                    <CategoryCardForHeader key={index} id={index} image={img1} title={item.name} isHome={isHome}/>
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {categories && categories.length > 0 && categories.map(item => <NavigationMenuItem key={item.id}>
            <LinkApp href={`/categories/${item.url}`} >
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${'!text-secondary'}`}>
                {item.name}
              </NavigationMenuLink>
            </LinkApp>
          </NavigationMenuItem>)}
        </NavigationMenuList>
      </NavigationMenu>
    )
  }
  
  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  })
  ListItem.displayName = "ListItem"