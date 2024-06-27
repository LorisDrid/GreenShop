import React from "react";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div>© 2024 MyApp. All rights reserved.</div>
      <div>
        <a href="/terms">Terms of Service</a> |{" "}
        <a href="/privacy">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
