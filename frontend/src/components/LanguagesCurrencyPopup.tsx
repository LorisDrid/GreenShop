import React, { useEffect, useState } from "react";
import "./Footer.scss";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import {
  currencies,
  languages,
  useCurrency,
  useLanguage,
} from "../contexts/LanguagesCurrencyContext";
import i18n from "i18next";

interface LanguagesCurrencyPopupProps {
  showLanguageText?: boolean;
}

const LanguagesCurrencyPopup: React.FC<LanguagesCurrencyPopupProps> = ({
  showLanguageText = false,
}) => {
  const { currency, setCurrency } = useCurrency();
  const { language, setLanguage } = useLanguage();

  const [selectedCurrency, setSelectedCurrency] = useState(currency);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    setSelectedCurrency(currency);
    setSelectedLanguage(language);
  }, [currency, language]);

  const handleConfirm = () => {
    setCurrency(selectedCurrency);
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage.code).then(() => {
      console.log("Language changed to", selectedLanguage.code);
    });
  };

  return (
    <div className={`w-fit self-center ${showLanguageText ? "nav-item" : ""}`}>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Flex
            align="center"
            justify="center"
            gap="1"
            className="header-button language-button w-fit"
          >
            {showLanguageText && (
              <p className="w-fit mr-2 font-medium">{language.label}</p>
            )}
            <img
              src={require("../assets/languages/" + language.code + ".png")}
              alt="Languages selection button"
              width="32"
              height="32"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="9">
              <path d="M1.03.4H12.2a1 1 0 0 1 .71 1.7L7.32 7.7a1 1 0 0 1-1.41 0L.32 2.1A1 1 0 0 1 1.03.4Z" />
            </svg>
          </Flex>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="500px">
          <AlertDialog.Title>Change Language and Currency</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Select your preferred language and currency for the best shopping
            experience.
          </AlertDialog.Description>
          <div>
            <label htmlFor="currency">Select Currency:</label>
            <select
              id="currency"
              value={selectedCurrency.code}
              onChange={(e) =>
                setSelectedCurrency(
                  currencies.find(
                    (currency) => currency.code === e.target.value,
                  ) || currencies[0],
                )
              }
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="language">Select Language:</label>
            <select
              id="language"
              value={selectedLanguage.code}
              onChange={(e) =>
                setSelectedLanguage(
                  languages.find(
                    (language) => language.code === e.target.value,
                  ) || languages[0],
                )
              }
            >
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="soft" onClick={handleConfirm}>
                Confirm
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default LanguagesCurrencyPopup;
