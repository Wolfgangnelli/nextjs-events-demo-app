import React from "react";
import { EventType } from "../../../utils/types";
import { humanReadableDate, formattedAddress } from "../../../utils";
import { SImage, Button, Calendar, Location, ArrowRight } from "../../atoms";
import styles from "./EventoTemplate.module.sass";

interface Props {
  key?: string;
  evento: EventType;
}

const EventoTemplate = (props: Props) => {
  const { evento } = props;

  return (
    <li className={styles.item}>
      <SImage src={`/${evento.image}`} style={styles.image} />
      <div className={styles.content}>
        <div className={styles.summary}>
          {!!evento.title && <h2 className={styles.title}>{evento.title}</h2>}
          {!!evento.date && (
            <div className={styles.date}>
              <span className="icon">
                <Calendar />
              </span>
              <time>{humanReadableDate(evento.date)}</time>
            </div>
          )}
          {!!evento.location && (
            <div className={styles.address}>
              <span className="icon">
                <Location />
              </span>
              <address>{formattedAddress(evento.location)}</address>
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <Button
            label="Explore Event"
            href={`/events/${evento.id}`}
            icon={<ArrowRight />}
          />
        </div>
      </div>
    </li>
  );
};

export default EventoTemplate;
