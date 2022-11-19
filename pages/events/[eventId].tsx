import React, { useState } from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../utils";
import { DummyEventType } from "../../utils/types";
import { Page } from "../../components/templates";
import {
  EventContent,
  EventSummary,
  EventCard,
} from "../../components/molecules";

const EventDetailPage = () => {
  const [eventDetail, setEventDetail] = useState<DummyEventType>();

  const {
    query: { eventId },
  } = useRouter();

  const event = typeof eventId === "string" && getEventById(eventId);

  if (!event) {
    return <h1>No event found!</h1>;
  }

  return (
    <>
      {!!event.title && <EventSummary title={event.title} />}
      <EventCard
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={`imgFor-${event.title}`}
      />
      {!!event.description && <EventContent description={event.description} />}
    </>
  );
};

export default EventDetailPage;
