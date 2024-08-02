import React from "react";
import SiteLogo from "./SiteLogo";

export default function Header(): JSX.Element {
  return (
    <header className="sticky top-0 z-10 mx-auto bg-white/75 backdrop-blur-lg">
      <SiteLogo />
    </header>
  );
}
