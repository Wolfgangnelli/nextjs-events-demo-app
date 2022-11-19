import React from "react";
import { Calendar, SImage, Location } from "../../atoms";
import { humanReadableDate, formattedAddress } from "../../../utils";
import LogisticsItem from "../LogisticsItem/LogisticsItem";
import styles from "./EventCard.module.sass";

interface Props {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
}

const EventCard = (props: Props) => {
  const { date = "", address = "", image = "", imageAlt = "" } = props;

  return (
    <section className={styles.card}>
      <div>
        <SImage src={`/${image}`} alt={imageAlt} className={styles.image} />
      </div>
      <ul className={styles.list}>
        {!!date.length && (
          <LogisticsItem icon={<Calendar />}>
            <time>{humanReadableDate(date)}</time>
          </LogisticsItem>
        )}
        {!!address.length && (
          <LogisticsItem icon={<Location />}>
            <address className={styles.address}>
              {formattedAddress(address)}
            </address>
          </LogisticsItem>
        )}
      </ul>
    </section>
  );
};

export default EventCard;
