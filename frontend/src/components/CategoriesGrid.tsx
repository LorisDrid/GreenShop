import React from "react";
import "./CategoriesGrid.scss";
import clothingImage from "src/assets/categories/clothing.jpg";
import bathroomImage from "src/assets/categories/bathroom.jpg";
import accessoriesImage from "src/assets/categories/accessories.jpg";
import booksImage from "src/assets/categories/books.jpg";
import homeGoodsImage from "src/assets/categories/home-goods.jpg";
import Logo from "../assets/Logo";
import { Skeleton } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

interface Category {
  name: string;
  image: string;
  href: string;
}

function CategoriesGrid() {
  const categories: Category[] = [
    { name: "header.clothing", image: clothingImage, href: "/clothing" },
    { name: "header.bath", image: bathroomImage, href: "/bathroom" },
    {
      name: "header.accessories",
      image: accessoriesImage,
      href: "/accessories",
    },
    { name: "header.books", image: booksImage, href: "/books" },
    { name: "header.home", image: homeGoodsImage, href: "/home-goods" },
  ];

  return (
    <div className="category-grid grid grid-cols-5 grid-rows-2 gap-7">
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
  const { t } = useTranslation();

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
        <button className="category-name">{t(category.name)}</button>
        <div className="category-logo">
          <Logo size={35} color="white" iconOnly={true} />
        </div>
      </a>
    </Skeleton>
  );
}

export default CategoriesGrid;
