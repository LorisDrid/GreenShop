import React from "react";
import "./Footer.scss";
import { AlertDialog, Button } from "@radix-ui/themes";
import { useCurrency } from "../contexts/LanguagesCurrencyContext";

const Footer: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  return (
    <>
      <AlertDialog.Title>Change Language and Currency</AlertDialog.Title>
      <AlertDialog.Description size="2">
        Select your preferred language and currency for the best shopping
        experience.
      </AlertDialog.Description>
      <div>
        <label htmlFor="currency">Select Currency:</label>
        <select id="currency" onChange={handleCurrencyChange}>
          <option value="USD" defaultChecked>
            USD
          </option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button color="red">Confirm</Button>
        </AlertDialog.Action>
      </div>
    </>
  );
};

export default Footer;
