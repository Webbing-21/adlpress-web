"use client";
import { Button } from "@/components/ui/button";
import { productsInCartData } from "@/static/data";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  const shipping = 50; // شحن
  const taxes = 50; // ضرائب

  const subtotal = productsInCartData?.reduce(
    (total:any, product:any) => total + product.price * product.quantity,
    0
  );
  // الحساب الكلي
  const total = subtotal + shipping + taxes;

  return (
    <div className="my-20 grid lg:grid-cols-5 container mx-auto gap-x-10 px-4">
      <div className="space-y-4 lg:col-span-3">{children}</div>

      <div className="lg:col-span-2 relative">
        <div className="[&>*]:flex [&>*]:justify-between [&>*]:p-4 sticky top-24 end-0">
          <h1 className="text-lg md:text-xl font-bold">Order Summary</h1>
          <p>
            <span>Subtotal</span>
            <span>{subtotal}$</span>
          </p>
          <p>
            <span>Shipping</span>
            <span>{shipping}$</span>
          </p>
          <p>
            <span>Taxes</span>
            <span>{taxes}$</span>
          </p>
          <p className="border-t border-gray-200">
            <span>Total</span>
            <span>{total}$</span>
          </p>
          {subtotal > 0 && (
            <Button color="primary" className="w-full">
              <span className="w-full text-center py-10">Check Out</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
