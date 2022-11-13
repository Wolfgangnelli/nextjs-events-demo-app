import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../utils";
import { DummyEventType } from "../../utils/types";

const EventDetailPage = () => {
  const [eventDetail, setEventDetail] = useState<DummyEventType>();

  const {
    query: { eventId },
  } = useRouter();
  const event = typeof eventId === "string" && getEventById(eventId);

  if (!event) {
    return <h1>No event found!</h1>;
  }

  return <div>{!!event.title && <h1>{event.title}</h1>}</div>;
};

export default EventDetailPage;
