import React from "react";
import Link from "next/link";
import { DummyEventType } from "../../../utils/types";
import { humanReadableDate, formattedAddress } from "../../../utils";
import { SImage } from "../../atoms";
import styles from "./EventoTemplate.module.sass";

interface Props {
  key: string;
  evento: DummyEventType;
}

const EventoTemplate = (props: Props) => {
  const { evento } = props;

  return (
    <li className={styles.listItem}>
      <SImage
        src={`/${evento.image}`}
        maxWidth={767}
        maxHeight={638}
        layout="intrinsic"
        objectFit="cover"
        quality={100}
      />
      <div>
        <div>
          {!!evento.title && <h2>{evento.title}</h2>}
          {!!evento.description && (
            <div dangerouslySetInnerHTML={{ __html: evento.description }} />
          )}
          {!!evento.date && (
            <div>
              <time>{humanReadableDate(evento.date)}</time>
            </div>
          )}
          {!!evento.location && (
            <div>
              <address>{formattedAddress(evento.location)}</address>
            </div>
          )}
        </div>
        <div>
          <Link href={`/events/${evento.id}`}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventoTemplate;
