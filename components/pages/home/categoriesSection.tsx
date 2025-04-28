import { CategoriesType } from "@/@types/api/categories";
import CategoryCard from "@/components/categories/category";
import { categoryCardProps } from "@/components/categories/CategoryCardForHeader";
import IconLeftAndRight from "@/components/global/IconLeftAndRight";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AxiosServer from "@/lib/axiosServer";
import { splitArrayInHalf, splitTitleInHalf } from "@/utils/splitArrayInHalf";
import Link from "next/link";
import React from "react";

const categoriesData: categoryCardProps[] = [
  { id: 1, title: "Mobile", image: "/icons/category/1.png" },
  { id: 2, title: "Electronics", image: "/icons/category/2.png" },
  { id: 3, title: "Watches", image: "/icons/category/3.png" },
  { id: 4, title: "Hardware", image: "/icons/category/4.png" },
  { id: 5, title: "Lights", image: "/icons/category/5.png" },
  { id: 6, title: "Tools", image: "/icons/category/6.png" },
  { id: 7, title: "Appliances", image: "/icons/category/7.png" },
  { id: 8, title: "Sports", image: "/icons/category/8.png" },
  { id: 9, title: "Furniture", image: "/icons/category/9.png" },
  { id: 10, title: "Fashion", image: "/icons/category/10.png" },
  { id: 11, title: "Cosmetics", image: "/icons/category/11.png" },
  { id: 12, title: "Accessories", image: "/icons/category/12.png" },
  { id: 13, title: "Gifts", image: "/icons/category/13.png" },
  { id: 14, title: "Decor", image: "/icons/category/14.png" },
];

interface CategoriesSectionProps {
  title: string;
  linkAll: string;
  isHome?: boolean
}

export default async function CategoriesSection({
  title,
  linkAll,
  isHome = false
}: CategoriesSectionProps) {

  const [firstHalf, secondHalf] = splitArrayInHalf(categoriesData as any);
  const [firstTitle, secondTitle] = splitTitleInHalf(title);
  
  return (
    <section className="py-12 bg-white dark:bg-gray-800 dark:text-white">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between text-start border-b border-b-gray-200">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-primary border-b-2 border-primary flex gap-x-2 pb-2">
            <span>{firstTitle}</span>
            <span className="text-secondary">
              {secondTitle}
            </span>
          </h2>
          <div className="flex items-center text-xs md:text-base">
            <Link
              href={linkAll}
              className="flex items-center hover:text-primary text-gray-500"
            >
              <span>View All</span>
             <IconLeftAndRight className="size-6 text-primary"/>
            </Link>
          </div>
        </div>
        {isHome ? <>
          <Carousel className="mt-8">
            <CarouselContent>
              {firstHalf.map((category: CategoriesType) => (
                <CarouselItem key={category.id} className="basis-1/7">
                  <CategoryCard category={category} isHome={isHome} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Carousel>
              <CarouselContent>
                {secondHalf.map((category: CategoriesType) => (
                  <CarouselItem key={category.id} className="basis-1/7">
                    <CategoryCard category={category} isHome={isHome}/>
                  </CarouselItem>
                ))}
              </CarouselContent>
          </Carousel>
        </> : <>
        <div className="mt-10 flex flex-wrap justify-center">
          {categoriesData.map((category: any) => (
            <div key={category.id} className="basis-1/6">
              <CategoryCard category={category}/>
            </div>
            ))}
        </div>
        </>}
      </div>
    </section>
  );
}
