import { Flex, Grid } from "@radix-ui/themes";
import React from "react";
import "src/styles/TopNavBar.scss";
import Logo from "../assets/Logo";

export enum NavOption {
  Shop = "Shop",
  Simulator = "Simulator",
  Blog = "Blog",
  OurStory = "Our Story",
}

interface SelectedProps {
  selected: NavOption;
}

const TopNavHeader: React.FC<SelectedProps> = ({ selected }) => {
  return (
    <Grid columns="3" width="auto" className="topNavBar">
      <span>
        {Object.values(NavOption).map((option) => (
          <a
            key={option}
            href={`/${option.toLowerCase().replace(/\s+/g, "-")}`}
            className={selected === option ? "selected" : ""}
          >
            {option}
          </a>
        ))}
      </span>
      <Flex gap="3" align={"center"} justify={"center"}>
        <Logo size={20} color="#fff" iconOnly={true} />
        <span>Free Shipping On Orders Over 65$</span>
      </Flex>
    </Grid>
  );
};

export default TopNavHeader;
