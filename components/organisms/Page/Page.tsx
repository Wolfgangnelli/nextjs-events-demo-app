import React from "react";
import styles from "./Page.module.sass";

const Page = (props: any) => {
  const { children } = props;

  return <div>{children}</div>;
};

export default Page;
