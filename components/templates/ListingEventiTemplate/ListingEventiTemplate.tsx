import React from "react";
import { DummyEventType } from "../../../utils/types";
import { EventoTemplate } from "../index";
import styles from "./ListingEventiTemplate.module.sass";

interface Props {
  events: DummyEventType[];
}

const ListingEventiTemplate = (props: Props) => {
  const { events } = props;

  return (
    <ul className={styles.list}>
      {events.map((event) => (
        <EventoTemplate key={event.id} evento={event} />
      ))}
    </ul>
  );
};

export default ListingEventiTemplate;
