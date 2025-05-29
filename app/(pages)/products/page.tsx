"use client";
import { Product } from "@/app/(pages)/products/[id]/page";
import ProductCard from "@/components/products/product";

import useFetch from "@/hooks/use-fetch";
import React from "react";

export default function Page() {
  // const [firstTitle, secondTitle] = splitTitleInHalf(title);
  const { data } = useFetch(`/products?populate=*`);
  const products = data?.data as Product[];
  return (
    <section className="py-12 bg-white dark:bg-gray-800 dark:text-white">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between text-start border-b border-b-gray-200">
          <h2 className="text-lg sm:text-2xl md:text-3xl text-primary font-bold border-b-2 border-primary flex pb-2 gap-x-2">
            <span>Products</span>
            {/* <span className="text-secondary">{secondTitle}</span> */}
          </h2>
          {/* <div className="inline-block pb-2 items-center text-xs md:text-base">
          <Link
              href={linkAll}
              className="flex items-center hover:text-primary text-gray-500"
            >
              <span>View All</span>
              <IconLeftAndRight className="size-6 text-primary"/>
            </Link>
          </div> */}
        </div>

        {products && (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products?.map((item: Product) => (
              <div key={item.id}>
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
