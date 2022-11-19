import React from "react";
import styles from "./EventSummary.module.sass";

interface Props {
  title: string;
}

const EventSummary = (props: Props) => {
  const { title } = props;

  return (
    <section className={styles.summarySection}>
      <h1>{title}</h1>
    </section>
  );
};

export default EventSummary;
