import React from "react";
import "./Footer.scss";
import { AlertDialog, Flex, Select } from "@radix-ui/themes";
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

  const changeLanguage = (language: LabelCode) => {
    setLanguage(language);
    i18n.changeLanguage(language.code).then(() => {
      // Nothing to do here
    });
  };

  const changeCurrency = (currency: LabelCode) => {
    setCurrency(currency);
  };

  return (
    <div className={`${showLanguageText ? "nav-item" : ""}`}>
      <AlertDialog.Root>
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
        <AlertDialog.Content className="dialog-content-container flex justify-center items-center flex-col">
          <div className="dialog-content">
            <div className="flex flex-col justify-between gap-4">
              <span className="text-center">
                <p className="font-bold flex gap-1">
                  Please choose your<p className="language-text">Language</p>
                </p>
                <Select.Root
                  size="3"
                  value={language.code}
                  onValueChange={(e) =>
                    changeLanguage(
                      languages.find((language) => language.code === e) ||
                        languages[0],
                    )
                  }
                >
                  <Select.Trigger />
                  <Select.Content>
                    {languages.map((language) => (
                      <Select.Item key={language.code} value={language.code}>
                        <span className="flex gap-4 flex-row">
                          <img
                            src={require(
                              "../assets/languages/" + language.code + ".svg",
                            )}
                            alt="Languages selection button"
                            width="20"
                            height="20"
                          />
                          {language.label}
                        </span>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </span>
              <span className="text-center">
                <p className="font-bold flex gap-1">
                  Please choose your<p className="currency-text">Currency</p>
                </p>
                <Select.Root
                  size="3"
                  value={currency.code}
                  onValueChange={(e) =>
                    changeCurrency(
                      currencies.find((currency) => currency.code === e) ||
                        currencies[0],
                    )
                  }
                >
                  <Select.Trigger />
                  <Select.Content>
                    {currencies.map((currency) => (
                      <Select.Item key={currency.code} value={currency.code}>
                        <span className="flex gap-4 flex-row">
                          <img
                            src={require(
                              "../assets/currencies/" + currency.code + ".svg",
                            )}
                            alt="Currencies selection button"
                            height="20"
                            width="10"
                          />
                          {currency.label}
                        </span>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
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
