import React from "react";
import { getAllEvents } from "../../utils";
import { DummyEventType } from "../../utils/types";
import { ListingEventiTemplate } from "../../components/templates";

const EventsPage = () => {
  const events: DummyEventType[] = getAllEvents();

  if (!events.length) {
    return <p>No events founds!</p>;
  }

  return (
    <div>
      <h1>The Events Page</h1>
      <div className="events-container">
        <ListingEventiTemplate events={events} />
      </div>
    </div>
  );
};

export default EventsPage;
