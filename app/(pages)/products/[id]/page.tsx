"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProductRating from "@/components/products/ProductRating";
import ProductsSectionClient from "@/components/pages/home/productsSectionClient";
import useFetch from "@/hooks/use-fetch";
import { notFound, useParams } from "next/navigation";
import { Image as ImageType } from "@/components/layouts/category-header";
import LoadingPage from "./loading";

type ChildLast = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string; // يمكن تغييره إلى Date إذا كنت ستحوله عند الاستخدام
  updatedAt: string;
  publishedAt: string;
};

export type Product = {
  id: number;
  documentId: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  count: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  reviews: any[]; // يمكنك تعديل النوع حسب شكل الـ review إذا كان معروف
  child_lasts: ChildLast[];
  image: ImageType;
  images: ImageType[];
};

export default function Page() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `/products/${id}?populate=*`,
    id as any
  );
  let productDetails: Product = data?.data;
  let products: Product[] = data?.products;
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    setSelectedImage(productDetails?.image?.url);
  }, [productDetails]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return notFound();
  }

  return (
    <div className="max-w-[95rem] px-4 mx-auto dark:text-white mt-20 space-y-10 mb-10">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-24 order-2 lg:order-1"></div>
        <div className="w-full order-1 lg:order-2 flex flex-col items-start h-full">
          <Image
            width={1000}
            height={1000}
            className="h-96 w-full  object-contain"
            src={selectedImage || ""}
            alt="Selected Product Image"
          />      
          <div className="flex flex-row items-start mt-4 select-none flex-wrap gap-4    ">
            <label>
              <input
                type="radio"
                name="image-selector"
                className="peer sr-only"
                onChange={() => setSelectedImage(productDetails?.image.url)}
              />
              <p className="cursor-pointer peer-checked:ring-2 peer-checked:ring-primary size-16">
                <Image
                  width={70}
                  height={70}
                  className="h-full w-full object-cover"
                  src={productDetails?.image.url}
                  alt={productDetails?.image.alternativeText}
                />
              </p>
            </label>
            {productDetails?.images?.length > 0 &&
              productDetails?.images.map((image, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="image-selector"
                    className="peer sr-only"
                    onChange={() => setSelectedImage(image.url)}
                  />
                  <p className="cursor-pointer peer-checked:ring-2 peer-checked:ring-primary size-16">
                    <Image
                      width={70}
                      height={70}
                      className="h-full w-full object-cover"
                      src={image.url}
                      alt={image.alternativeText}
                    />
                  </p>
                </label>
              ))}
          </div>
        </div>
        <div className="w-full order-3">
          <section className="space-y-4 md:space-y-6">
            <div>
              <h5 className="text-gray-500">
                {productDetails?.child_lasts?.length > 0 &&
                  productDetails?.child_lasts[0].name}
              </h5>
              <h1 className="text-xl sm:text-2xl font-bold md:text-3xl">
                {productDetails.name}
              </h1>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`block size-3 align-middle ${
                      index < productDetails.reviews?.length
                        ? "text-yellow-500"
                        : "text-gray-400"
                    } sm:size-4`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="flex gap-x-2 items-start">
              <span className="text-primary text-lg md:text-2xl font-bold">
                {productDetails.discount > 0
                  ? productDetails.price -
                    (productDetails.price * productDetails.discount) / 100
                  : productDetails.price}
                $
              </span>
              {productDetails.discount && (
                <span className="text-gray-400 line-through font-bold">
                  {productDetails.price}$
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-bold">
                Available Quantity
              </h2>
              <p className="text-gray-400">{productDetails.count} products</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-bold">Description</h2>
              <p className="text-gray-400 w-2/5">
                {productDetails.description}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-bold">Color</h2>
              <div className="flex select-none flex-wrap items-center gap-1">
                <label>
                  <input
                    type="radio"
                    name="color"
                    className="peer sr-only"
                    defaultChecked
                  />
                  <p className="bg-black peer-checked:ring-2 peer-checked:ring-primary size-6"></p>
                </label>
                <label>
                  <input type="radio" name="color" className="peer sr-only" />
                  <p className="bg-gray-300 peer-checked:ring-2 peer-checked:ring-primary size-6"></p>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-bold">Quantity To Buy</h2>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, index) => (
                    <SelectItem key={index} value={(index + 1).toString()}>
                      {index + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600">
                Deliver to <span className="underline">EG</span>
              </p>
            </div>

            <div className="flex items-center justify-between gap-x-4">
              <Button
                type="button"
                className="w-full px-4 py-2 bg-primary text-white rounded-md"
              >
                Add to cart
              </Button>
              <Button variant="outline" className="border-primary">
                <HeartIcon />
              </Button>
            </div>
          </section>
        </div>
      </div>

      <div className="w-full grid md:grid-cols-2 gap-4 xl:ps-20">
        <div className="space-y-4 w-full">
          <div>
            <h2 className="text-lg font-bold">Customers Reviews</h2>
            <p className="text-primary text-xs">4.7 Product rating</p>
          </div>

          <ProductRating />
        </div>
        <div className="space-y-4 w-full">
          <h2 className="text-lg font-bold">Supplier Information</h2>
          <div>
            <h3 className="text-sm flex items-center gap-3 font-bold">
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22.4967C12 22.4967 20.9986 19.4971 20.9986 11.9983"
                  stroke="#121212"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.9986 11.9983V2.99971C20.9986 2.99971 17.9991 1.49994 12 1.49994"
                  stroke="#121212"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9996 22.4967C11.9996 22.4967 3.00098 19.4971 3.00098 11.9983"
                  stroke="#121212"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.00098 11.9983V2.99971C3.00098 2.99971 6.00051 1.49994 11.9996 1.49994"
                  stroke="#121212"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.9984 5.99927C11.9993 10.4986 10.4995 16.4976 10.4995 16.4976C10.4995 16.4976 8.99977 14.7075 7.5 13.4981"
                  stroke="#121212"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Secure Payments</span>
            </h3>
            <p className="text-gray-500">
              We use advanced encryption to protect your payment information
              throughout checkout.
            </p>
          </div>
          <div>
            <h3 className="text-sm flex items-center gap-3 font-bold">
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 19H6C5.20435 19 4.44129 18.6839 3.87868 18.1213C3.31607 17.5587 3 16.7956 3 16V8C3 7.20435 3.31607 6.44129 3.87868 5.87868C4.44129 5.31607 5.20435 5 6 5H18C18.7956 5 19.5587 5.31607 20.1213 5.87868C20.6839 6.44129 21 7.20435 21 8V12.5M3 10H21M7 15H7.01M11 15H13M16 19H22M16 19L19 16M16 19L19 22"
                  stroke="#121212"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Refund Policy</span>
            </h3>
            <p className="text-gray-500">
              We believe in customer satisfaction. If you need to return an
              item, our clear return policy outlines the process for a full
              refund.
            </p>
          </div>
        </div>
      </div>
      <ProductsSectionClient
        products={products}
        title="Related Products"
        linkAll="/categories/Hardware"
      />
    </div>
  );
}
