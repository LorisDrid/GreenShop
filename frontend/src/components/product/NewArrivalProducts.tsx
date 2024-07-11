import React, { useEffect, useState } from "react";
import "./NewArrivalProducts.scss";
import axios from "axios";
import { Item } from "../../interfaces/Item";
import Product from "./Product";

function NewArrivalProducts() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/items`,
        );
        const items: Item[] = response.data;
        if (items.length > 0) {
          // Sort by the most recent
          items.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
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
    <section className="new-section-container flex flex-col justify-evenly gap-6">
      <h2 className="section-title text-green">News Arrival</h2>
      <p className="section-subtitle">
        Be the first to have the first-call product
      </p>
      <div className="w-full flex justify-between gap-4">
        {items.map((item: any, index: number) => (
          <Product item={item} key={index} />
        ))}
      </div>
      <button className="btn-see-more">See More</button>
    </section>
  );
}

export default NewArrivalProducts;
