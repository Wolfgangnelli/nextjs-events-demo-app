import React from "react";
import { Header } from "../../organisms";
import styles from "./Layout.module.sass";

const Page = (props: any) => {
  const { children } = props;

  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Page;
