import React from "react";
import Link from "next/link";
import { NavItems } from "../../../utils/types";
import styles from "./Nav.module.sass";

interface Props {
  items: NavItems[];
}

const Nav = (props: Props) => {
  const { items = null } = props;

  return (
    <nav>
      {!!items && (
        <ul className={styles.navList}>
          {items.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Nav;
