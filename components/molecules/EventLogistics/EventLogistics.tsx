import React from "react";
import { Calendar, SImage } from "../../atoms";
import { humanReadableDate, formattedAddress } from "../../../utils";
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
    </section>
  );
};

export default EventLogistics;
