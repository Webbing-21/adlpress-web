import HeroSection from '@/components/pages/home/HeroSection'
import ProductSection from '@/components/pages/home/productsSection';
import CategoriesSection from '@/components/pages/home/categoriesSection';
import SubHeader from '@/components/layouts/SubHeader';
import Image from 'next/image';

export default async function Page() {
  
  return (
    <>
      <main>
        {/* <SubHeader/> */}
        <HeroSection />
        <div>
          <CategoriesSection title="Shop From Top Categories" linkAll={`/categories`} isHome />
        </div>
        <div>
          <ProductSection title="Today’s Deals" linkAll={`/products/today-deals`} />
          <ProductSection title="Sale on Electronics" linkAll={`/products/new-products`} />
          <div className='grid grid-cols-3 gap-4 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
            <Image className='rounded-none cursor-pointer' src={"/icons/home/1.png"} alt='' width={1000} height={1000} />
            <Image className='rounded-none cursor-pointer' src={"/icons/home/2.png"} alt='' width={1000} height={1000} />
            <Image className='rounded-none cursor-pointer' src={"/icons/home/3.png"} alt='' width={1000} height={1000} />
          </div>
          <ProductSection title="New Products" linkAll={`/products/best-sellers`} />
          <ProductSection title="Top Ranking" linkAll={`/products/big-sale`} />
        </div>
      </main>
      {/* <Footer/> */}
    </>
  )
}
