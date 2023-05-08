import React from "react";

function Footer() {
  const year = new Date();
  return (
    <footer className="footer">
      <p className="footer__text">
        &copy;&nbsp;{year.getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
