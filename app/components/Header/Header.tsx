import React from "react";
import headerStyles from "./Header.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <header className={headerStyles[`header-container`]}>
      <div className={headerStyles.header}>
        <Link href="/">
          <img
            className={headerStyles.header__logo}
            src="/site-logo.svg"
            alt="Logo"
          />
        </Link>
        <nav className={headerStyles.header__nav}>
          <ul>
            <li>Characters</li>
            <li>Episodes</li>
            <li>Location</li>
          </ul>
        </nav>
      </div>
      <h1 className={headerStyles.header__title}>Rick and Morty</h1>
    </header>
  );
};

export default Header;
