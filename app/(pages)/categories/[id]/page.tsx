import ProductsSectionWithSidebar from "@/components/pages/home/productsSectionWithSidebar";
import React from "react";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <ProductsSectionWithSidebar isCarousel={false} title={`Products of ${id} category`} linkAll={`/products/today-deals`} />
    </div>
  );
}
