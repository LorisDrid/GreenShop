import React, { useState } from "react";
import "./Product.scss";
import { Item } from "../../interfaces/Item";
import Reviews from "../../assets/Stars";
import { ConvertPrice } from "../../utils/CurrencyUtils";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HoverCard,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import Logo from "../../assets/Logo";
import { useTranslation } from "react-i18next";

interface ProductProps {
  item: Item;
}

const Product: React.FC<ProductProps> = ({ item }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const { t } = useTranslation();

  return (
    <article className="product">
      <Skeleton className="border-r-4" loading={imageLoading}>
        <div className="relative">
          <a href="" className="product-image-container">
            <img
              src={require(`../../assets/products/${item.image}`)}
              alt={item.name}
              className="product-image"
              onLoad={() => setImageLoading(false)}
            />
          </a>
          <button className="product-btn-favorite">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="45">
              <path d="M42.25 3.8A12.09 12.09 0 0 0 34.38.93a12.33 12.33 0 0 0-10.36 5.65A12.33 12.33 0 0 0 13.78.89c-.75 0-1.5.08-2.26.22-3.87.73-6.9 2.94-9.04 6.56-3.04 5.2-3.28 9.99-.74 14.66A39 39 0 0 0 7.2 29.8c4.22 4.66 9.21 9.08 15.73 13.91.34.26.71.39 1.1.39.58 0 .98-.31 1.2-.5A109.26 109.26 0 0 0 39.76 31c2.24-2.37 4.78-5.28 6.63-8.9.78-1.53 1.67-3.58 1.62-5.89a16.17 16.17 0 0 0-5.75-12.4ZM44 20.8c-1.7 3.3-4.08 6.03-6.18 8.25A105.9 105.9 0 0 1 24 41.1C17.87 36.5 13.14 32.3 9.14 27.9a36.21 36.21 0 0 1-5.06-6.95c-2.05-3.76-1.83-7.52.7-11.83a10.4 10.4 0 0 1 9-5.44c3.67 0 6.92 2.1 8.68 5.6l.37.72c.23.45.69.74 1.18.74h.02c.5-.01.97-.31 1.19-.78.64-1.35 1.34-2.4 2.19-3.3a9.67 9.67 0 0 1 6.97-2.95c2.27 0 4.46.8 6.15 2.25a13.44 13.44 0 0 1 4.78 10.32c.04 1.65-.64 3.2-1.3 4.5Z" />
            </svg>
          </button>
          <button className="product-btn-add">{t("product.btn.add")}</button>
        </div>
      </Skeleton>
      <div className="product-content">
        <a href="" className="product-title">
          {item.name}
        </a>
        <span className="flex justify-between">
          <a href="">
            <Reviews rating={item.rate} numberOfReviews={item.rateCount} />
          </a>
          <div className="flex gap-2 items-end">
            {item.previousPrice > 0 ? (
              <>
                <p className="product-previous-price">
                  {ConvertPrice(item.previousPrice)}
                </p>
                <p className="product-price-discount">
                  {ConvertPrice(item.price)}
                </p>
              </>
            ) : (
              <>
                <p className="product-price">{ConvertPrice(item.price)}</p>
              </>
            )}
          </div>
        </span>
        <span className="flex justify-between">
          <div className="inline-flex items-center gap-2">
            <label
              className="relative flex items-center rounded-full cursor-pointer"
              htmlFor={`ripple-on-${item._id}`}
              data-ripple-dark="true"
            >
              <input
                id={`ripple-on-${item._id}`}
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
                  />
                </svg>
              </span>
            </label>
            <label
              className="product-label-compare cursor-pointer"
              htmlFor={`ripple-on-${item._id}`}
            >
              {t("product.btn.compareFootprint")}
            </label>
          </div>
          <div className="flex justify-end gap-2 w-fit">
            {item.labels.map((label, index) => (
              <HoverCard.Root key={index}>
                <HoverCard.Trigger>
                  <img
                    key={index}
                    src={require(`../../assets/labels/${label.image_url}`)}
                    alt={label.name}
                    className="product-label-image cursor-help"
                  />
                </HoverCard.Trigger>
                <HoverCard.Content maxWidth="300px">
                  <Flex gap="4">
                    <Avatar
                      radius="none"
                      size="3"
                      fallback={
                        <Logo size={30} color="green" iconOnly={true} />
                      }
                      src={require(`../../assets/labels/${label.image_url}`)}
                    />
                    <Box>
                      <Heading size="3" as="h3">
                        {label.name}
                      </Heading>
                      <Text as="div" size="2" color="gray" mb="2">
                        {label.category}
                      </Text>
                      <Text as="div" size="2">
                        {label.description}
                      </Text>
                    </Box>
                  </Flex>
                </HoverCard.Content>
              </HoverCard.Root>
            ))}
            <HoverCard.Root>
              <HoverCard.Trigger>
                <img
                  src={require(
                    `../../assets/labels/greenScore/${item.greenScore.toLowerCase()}.png`,
                  )}
                  alt={item.greenScore}
                  className="product-label-image cursor-help"
                />
              </HoverCard.Trigger>
              <HoverCard.Content maxWidth="300px">
                <Flex gap="1" direction="column">
                  <img
                    src={require(
                      `../../assets/labels/greenScore/greenScore.png`,
                    )}
                    alt="GreenScore Logo"
                  />
                  <Heading size="3" as="h3">
                    Score {item.greenScore}
                  </Heading>
                  <Text as="div" size="2" color="gray" mb="2">
                    Environmental Impact Score
                  </Text>
                  <Text as="div" size="2">
                    Measures the environmental impact of the product on a scale
                    of A to E. It is calculated based on the product's carbon
                    footprint, water usage, and waste production.
                  </Text>
                </Flex>
              </HoverCard.Content>
            </HoverCard.Root>
          </div>
        </span>
      </div>
    </article>
  );
};

export default Product;
