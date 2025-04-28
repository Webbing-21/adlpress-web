type ProductStatusType = "active" | "inactive";
export interface CategoriesType {
  id: number;
  name: string;
  image: string;
  products: [];
  subcategories: [];
  status: ProductStatusType;
  created_at: string;
  updated_at: string;  
}
