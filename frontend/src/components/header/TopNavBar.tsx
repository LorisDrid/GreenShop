import React, { useEffect, useRef, useState } from "react";
import "./TopNavBar.scss";
import Logo from "../../assets/Logo";
import { ConvertPrice } from "../../utils/CurrencyUtils";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguagesCurrencyContext";

export enum NavOption {
  Shop = "topNav.shop",
  Simulator = "topNav.simulator",
  Blog = "topNav.blog",
  OurStory = "topNav.ourStory",
}

interface SelectedProps {
  selected: NavOption;
}

const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

const TopNavHeader: React.FC<SelectedProps> = ({ selected }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState(-1);
  const underlineRef = useRef<HTMLDivElement>(null);
  const tabs = Object.values(NavOption);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isMounted = useIsMounted();

  const updateUnderline = (index: number) => {
    console.log("Update underline", index);
    const element = tabRefs.current[index];
    if (element && underlineRef.current) {
      underlineRef.current.style.width = `${element.offsetWidth}px`;
      underlineRef.current.style.left = `${element.offsetLeft}px`;
    }
  };

  useEffect(() => {
    if (hoveredTab !== -1) {
      updateUnderline(hoveredTab);
    } else {
      updateUnderline(activeTab);
    }
  }, [hoveredTab, activeTab]);

  useEffect(() => {
    setTimeout(() => {
      if (isMounted) {
        updateUnderline(activeTab);
      }
    }, 100);
  }, [isMounted, language, activeTab]);

  return (
    <div className="topNavBar grid grid-cols-3">
      <span className="tabs-container">
        {tabs.map((option, index) => (
          <a
            key={option}
            ref={(el) => (tabRefs.current[index] = el)}
            href={`/${option.toLowerCase().replace(/\s+/g, "-")}`}
            className={selected === option ? "tab selected" : "tab"}
            onClick={() => setActiveTab(index)}
            onMouseEnter={() => setHoveredTab(index)}
            onMouseLeave={() => setHoveredTab(-1)}
          >
            {t(option)}
          </a>
        ))}
        <div className="underline" ref={underlineRef}></div>
      </span>
      <a
        href="/shipping"
        className="flex flex-row justify-center gap-2 items-center"
      >
        <Logo size={20} color="#fff" iconOnly={true} />
        <span>
          {t("topNav.freeShipping")}
          {ConvertPrice(65)}
        </span>
      </a>
      <a
        href="/newsletter"
        className="topNavBar-newsletter flex flex-row justify-end gap-2 items-center"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 193 192"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M192.2 75.3994V172.8C192.2 183.404 183.604 192 173 192H19.4002C8.79604 192 0.200195 183.404 0.200195 172.8V75.3994C0.200195 68.2637 7.71028 63.6211 14.0933 66.8131L87.614 103.573C93.0188 106.276 99.3816 106.276 104.786 103.573L178.307 66.8131C184.69 63.6211 192.2 68.2637 192.2 75.3994ZM29.0002 52.8038V19.2C29.0002 8.59584 37.596 0 48.2002 0H144.2C154.804 0 163.4 8.59584 163.4 19.2V52.8L96.2002 86.4L29.0002 52.8038ZM53.0002 28.8C53.0002 31.4534 55.1468 33.6 57.8002 33.6H134.6C137.254 33.6 139.4 31.4534 139.4 28.8C139.4 26.1466 137.254 24 134.6 24H57.8002C55.1468 24 53.0002 26.1466 53.0002 28.8ZM53.0002 57.6C53.0002 60.2534 55.1468 62.4 57.8002 62.4H134.6C137.254 62.4 139.4 60.2534 139.4 57.6C139.4 54.9466 137.254 52.8 134.6 52.8H57.8002C55.1468 52.8 53.0002 54.9466 53.0002 57.6Z" />
        </svg>
        {t("topNav.newsletter")}
      </a>
    </div>
  );
};

export default TopNavHeader;
