import React from "react";
import Link from "next/link";
import { NAV_ITEMS } from "../../../dummy-data";
import { Nav } from "../../molecules";
import styles from "./Header.module.sass";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">NextEventsLogo</Link>
      </div>
      <Nav items={NAV_ITEMS} />
    </header>
  );
};

export default Header;
