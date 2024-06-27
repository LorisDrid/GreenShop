import React from "react";
import "./CategoriesGrid.scss";
import clothingImage from "src/assets/categories/clothing.jpg";
import bathroomImage from "src/assets/categories/bathroom.jpg";
import accessoriesImage from "src/assets/categories/accessories.jpg";
import booksImage from "src/assets/categories/books.jpg";
import homeGoodsImage from "src/assets/categories/home-goods.jpg";
import Logo from "../assets/Logo";
import { Skeleton } from "@radix-ui/themes";

interface Category {
  name: string;
  image: string;
  href: string;
}

function CategoriesGrid() {
  const categories: Category[] = [
    { name: "Clothing", image: clothingImage, href: "/clothing" },
    { name: "Bathroom", image: bathroomImage, href: "/bathroom" },
    { name: "Accessories", image: accessoriesImage, href: "/accessories" },
    { name: "Books", image: booksImage, href: "/books" },
    { name: "Home Goods", image: homeGoodsImage, href: "/home-goods" },
  ];

  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-7">
      {categories.map((category, index) => (
        <CategoryCard key={index} category={category} index={index} />
      ))}
    </div>
  );
}

interface CategoryCardProps {
  category: Category;
  index: number;
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const [loading, setLoading] = React.useState(true);

  return (
    <Skeleton className="border-r-4" loading={loading}>
      <a href={category.href} className={`category category-${index + 1}`}>
        <img
          src={category.image}
          alt={category.name}
          className="category-img"
          onLoad={() => setLoading(false)}
        />
        <button className="category-shop-btn">Shop</button>
        <button className="category-name">{category.name}</button>
        <div className="category-logo">
          <Logo size={35} color="white" iconOnly={true} />
        </div>
      </a>
    </Skeleton>
  );
}

export default CategoriesGrid;
