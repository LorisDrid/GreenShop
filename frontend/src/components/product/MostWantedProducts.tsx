import React, { useEffect, useState } from "react";
import "./MostWantedProducts.scss";
import axios from "axios";
import { Item } from "../../interfaces/Item";
import Product from "./Product";

function MostWantedProducts() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/items`,
        );
        const items: Item[] = response.data;
        if (items.length > 0) {
          items.sort((a, b) => b.rate - a.rate);
          const filteredItems = items.filter((item) => {
            try {
              require(`../../assets/products/${item.image}`);
              return true;
            } catch (e) {
              return false;
            }
          });
          setItems(filteredItems.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems().then((items) => console.log("Items fetched", items));
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="section-container flex flex-col justify-evenly items-center gap-6">
      <h2 className="section-title text-green">Our Most Wanted Products</h2>
      <p className="section-subtitle">Good for Environment, Good for You</p>
      <div className="w-full flex justify-between gap-4">
        {items.map((item: any, index: number) => (
          <Product item={item} key={index} />
        ))}
      </div>
    </section>
  );
}

export default MostWantedProducts;
