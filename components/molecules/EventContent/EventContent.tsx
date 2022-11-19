import React from "react";
import styles from "./EventContent.module.sass";

interface Props {
  description: string;
  children?: React.ReactNode;
}

const EventContent = (props: Props) => {
  const { description = "", children = undefined } = props;

  return (
    <section className={styles.content}>
      <p className={styles.description}>{description}</p>
      {!!children && children}
    </section>
  );
};

export default EventContent;
