import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { CurrencyProvider } from "./contexts/LanguagesCurrencyContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <Theme appearance={"light"} accentColor={"green"}>
        <App />
      </Theme>
    </CurrencyProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
