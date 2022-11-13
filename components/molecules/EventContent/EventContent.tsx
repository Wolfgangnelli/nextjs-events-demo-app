import React from "react";
import styles from "./EventContent.module.sass";

interface Props {
  text: string;
  children?: React.ReactNode;
}

const EventContent = (props: Props) => {
  const { text = "", children = undefined } = props;

  return <section className={styles.content}>{children}</section>;
};

export default EventContent;
