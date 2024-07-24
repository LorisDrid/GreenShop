import React, { useEffect, useState } from "react";
import "./NewArrivalProducts.scss";
import axios from "axios";
import { Item } from "../../interfaces/Item";
import Product from "./Product";
import { useTranslation } from "react-i18next";

function NewArrivalProducts() {
  const [items, setItems] = useState<Item[]>([]);
  const { t } = useTranslation();

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
      <h2 className="section-title text-green">{t("product.newArrivals")}</h2>
      <p className="section-subtitle">{t("product.newArrivalsSub")}</p>
      <div className="grid grid-cols-4 grid-rows-1 gap-6 w-full max-xl:grid-cols-2 max-xl:grid-rows-2 max-md:grid-rows-4 max-md:grid-cols-1">
        {items.map((item: any, index: number) => (
          <Product item={item} key={index} />
        ))}
      </div>
      <button className="btn-see-more">{t("product.seeMore")}</button>
    </section>
  );
}

export default NewArrivalProducts;
