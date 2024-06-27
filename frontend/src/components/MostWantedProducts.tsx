import React, { useEffect, useState } from "react";
import "./MostWantedProducts.scss";
import axios from "axios";
import { Skeleton } from "@radix-ui/themes";
import { Item } from "../interfaces/Item";
import Reviews from "../assets/Stars";
import { convertPrice } from "../utils/CurrencyUtils";
import { useCurrency } from "../contexts/LanguagesCurrencyContext";

function MostWantedProducts() {
  const [items, setItems] = useState<Item[]>([]);
  const [imageLoading, setImageLoading] = useState(true);
  const { currency } = useCurrency();

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
              require(`../assets/products/${item.image}`);
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
    fetchItems();
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="section-container flex flex-col justify-evenly items-center gap-6">
      <h2 className="section-title text-green">Our Most Wanted Products</h2>
      <p className="section-subtitle">Good for Environment, Good for You</p>
      <div className="article-list flex justify-between gap-4">
        {items.map((item: any, index: number) => (
          <article className="article" key={index}>
            <Skeleton className="border-r-4" loading={imageLoading}>
              <img
                src={require(`../assets/products/${item.image}`)}
                alt={item.name}
                className="article-image"
                onLoad={() => setImageLoading(false)}
              />
            </Skeleton>
            <div className="article-content">
              <p className="article-title">{item.name}</p>
              <span className="flex justify-between">
                <Reviews rating={item.rate} numberOfReviews={item.rateCount} />
                <div className="flex gap-2 items-end">
                  {item.previousPrice > 0 ? (
                    <>
                      <p className="article-previous-price">
                        {convertPrice(item.previousPrice, currency)}
                      </p>
                      <p className="article-price-discount">
                        {convertPrice(item.price, currency)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="article-price">
                        {convertPrice(item.price, currency)}
                      </p>
                    </>
                  )}
                </div>
              </span>
              <span className="flex justify-between">
                <div className="inline-flex items-center gap-3">
                  <label
                    className="relative flex items-center rounded-full cursor-pointer"
                    htmlFor="ripple-on"
                    data-ripple-dark="true"
                  >
                    <input
                      id="ripple-on"
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-zinc-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-slate-700 checked:bg-slate-700 checked:before:bg-slate-700 hover:before:opacity-10"
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label className="article-label-compare" htmlFor="ripple-on">
                    Compare footprint
                  </label>
                </div>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MostWantedProducts;
