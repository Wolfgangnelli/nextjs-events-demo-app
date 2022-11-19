import React from "react";
import { Calendar, SImage, Location } from "../../atoms";
import { humanReadableDate, formattedAddress } from "../../../utils";
import LogisticsItem from '../LogisticsItem/LogisticsItem'
import styles from "./EventLogistics.module.sass";

interface Props {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
}

const EventLogistics = (props: Props) => {
  const { date = "", address = "", image = "", imageAlt = "" } = props;

  return (
    <section>
      <div>
        <SImage src={image} alt={imageAlt} />
      </div>
      <ul>
        {!!date.length && (
        <LogisticsItem icon={<Calendar />}>
          <time>{humanReadableDate(date)}</time>
        </LogisticsItem>
        )}
        {!!address.length && (
          <LogisticsItem icon={<Location />}>
          <address>{formattedAddress(address)}</address>
        </LogisticsItem>
        )}
      </ul>
    </section>
  );
};

export default EventLogistics;
