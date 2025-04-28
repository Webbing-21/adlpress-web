import CategoriesSection from '@/components/pages/home/categoriesSection'
import React from 'react'

export default function page() {
  return (
    <div>
        <CategoriesSection
        title="Categories"
        linkAll={`/categories`}
      />
    </div>
  )
}
