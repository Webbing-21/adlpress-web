import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: string; 
  oldPrice?: string; 
  category: string;
  rating: number; 
  sale?: boolean;
  isCarousel?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price,
  oldPrice,
  category,
  rating,
  sale,
  isCarousel=true
}) => {
  return (
    <Link href={`/products/${id}/`}>
      <article className="relative border overflow-hidden shadow rounded-md">
        <div className={`${"aspect-square" } overflow-hidden items-center h-32
         md:h-52 w-full bg-gray-100`}>
          <Image
            height={500} width={500}
            className="group-hover:scale-125 w-full h-full object-contain transition-all duration-300"
            src={image}
            alt={title}
          />
        </div>
        {sale && (
          <div className="absolute top-0 end-0 bg-primary rounded-se-md rounded-es-md">
            <p className="text-[10px]  p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
              20% OFF
            </p>
          </div>
        )}
        <div className="mt-4 flex items-start justify-between p-2">
          <div>
            <h4 className="text-xs sm:text-sm text-gray-500">
              <Link href={`/categories/${category}`} title={title} className="cursor-pointer text-primary">
                {category}
              </Link>
            </h4>
            <h3 className="font-semibold text-xs sm:text-base md:text-lg text-gray-500">
              <span className="cursor-pointer">{title}</span>
            </h3>
          </div>
          <div className="text-end flex flex-col items-end">
            <div className="flex items-end">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`block h-3 w-3 align-middle ${
                    index < rating ? 'text-yellow-500' : 'text-gray-400'
                  } sm:h-4 sm:w-4`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className='flex gap-x-2 items-center'>
              <p className="text-xs sm:text-sm md:text-base text-secondary font-bold">
                {price}
              </p>
              {oldPrice && (
                <del className="mt-px text-xs sm:font-semibold text-gray-400 sm:text-sm">
                  {oldPrice}
                </del>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;