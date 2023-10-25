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
            <li>
              <Link href="/characters"> Characters</Link>
            </li>
            <li>
              <Link href="/episodes"> Episodes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
