import React from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../utils";
import { DummyEventType } from "../../utils/types";
import { AlertMessage } from "../../components/atoms";
import {
  EventContent,
  EventSummary,
  EventCard,
} from "../../components/molecules";

const EventDetailPage = () => {

  const {
    query: { eventId },
  } = useRouter();

  const event = typeof eventId === "string" && getEventById(eventId);

  if (!event) {
    return <AlertMessage message="No event found!" variant="info" />
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
