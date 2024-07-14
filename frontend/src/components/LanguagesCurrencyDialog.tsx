import React, { useEffect, useRef, useState } from "react";
import "./Footer.scss";
import { AlertDialog, Flex } from "@radix-ui/themes";
import {
  currencies,
  LabelCode,
  languages,
  useCurrency,
  useLanguage,
} from "../contexts/LanguagesCurrencyContext";
import i18n from "i18next";
import { closeNavigationExpanded } from "./NavigationExpanded";
import "./LanguagesCurrencyDialog.scss";
import Logo from "../assets/Logo";

interface LanguagesCurrencyDialogProps {
  showLanguageText?: boolean;
}

const LanguagesCurrencyDialog: React.FC<LanguagesCurrencyDialogProps> = ({
  showLanguageText = false,
}) => {
  const { currency, setCurrency } = useCurrency();
  const { language, setLanguage } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (language: LabelCode) => {
    setLanguage(language);
    i18n.changeLanguage(language.code).then(() => {
      // Nothing to do here
    });
  };

  const changeCurrency = (currency: LabelCode) => {
    setCurrency(currency);
  };

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dialogRef.current &&
          !dialogRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div className={`${showLanguageText ? "nav-item" : ""}`}>
      <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialog.Trigger>
          <Flex
            align="center"
            justify="center"
            gap="1"
            className="header-button language-button w-fit"
            onClick={closeNavigationExpanded}
          >
            {showLanguageText && (
              <p className="w-fit mr-2 font-medium">{language.label}</p>
            )}
            <img
              src={require("../assets/languages/" + language.code + ".svg")}
              alt="Languages selection button"
              width="32"
              height="32"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="9">
              <path d="M1.03.4H12.2a1 1 0 0 1 .71 1.7L7.32 7.7a1 1 0 0 1-1.41 0L.32 2.1A1 1 0 0 1 1.03.4Z" />
            </svg>
          </Flex>
        </AlertDialog.Trigger>
        <AlertDialog.Content
          ref={dialogRef}
          className="dialog-content-container flex justify-center items-center flex-col"
        >
          <div className="dialog-content">
            <div className="flex">
              <span className="text-center border-r border-gray-200">
                <p className="font-bold  my-5 mx-8">
                  Please choose your<p className="language-text">Language</p>
                </p>
                {languages.map((lang) => (
                  <span
                    className={
                      "option flex gap-4 flex-row " +
                      (lang == language && "language-selected")
                    }
                    key={lang.code}
                    onClick={() => changeLanguage(lang)}
                  >
                    <img
                      src={require("../assets/languages/" + lang.code + ".svg")}
                      alt="Languages selection button"
                      width="30"
                      height="30"
                    />
                    {lang.label}
                  </span>
                ))}
              </span>
              <span className="text-center">
                <p className="font-bold my-5 mx-8">
                  Please choose your<p className="currency-text">Currency</p>
                </p>
                {currencies.map((curr) => (
                  <span
                    className={
                      "option flex gap-4 flex-row " +
                      (curr == currency && "currency-selected")
                    }
                    key={curr.code}
                    onClick={() => changeCurrency(curr)}
                  >
                    <img
                      src={require(
                        "../assets/currencies/" + curr.code + ".svg",
                      )}
                      alt="Currencies selection button"
                      height="20"
                      width="auto"
                      className="currency-icon"
                    />
                    {curr.label}
                  </span>
                ))}
              </span>
            </div>
            <div className="flex justify-end gap-2">
              <AlertDialog.Cancel>
                <div className="close-menu-button">
                  <span className="meat"></span>
                  <span className="meat"></span>
                </div>
              </AlertDialog.Cancel>
            </div>
          </div>
          <span className="dialog-logo">
            <Logo color="white" textOnly={false} iconOnly={false} size={35} />
          </span>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default LanguagesCurrencyDialog;
