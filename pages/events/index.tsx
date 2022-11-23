import React from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../utils";
import { DummyEventType } from "../../utils/types";
import { ListingEventiTemplate } from "../../components/templates";
import { YEARS, MONTHS } from "../../dummy-data";
import { FormSearchEvents } from "../../components/molecules";
import fs from 'fs/promises'
import path from 'path';

interface Props {
  events: DummyEventType[]
}

const EventsPage = (props: Props) => {
  const { events } = props

  //const allEvents: DummyEventType[] = getAllEvents();

  const router = useRouter();

  const onSearch = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  if (!events.length) {
    return <p>No events founds!</p>;
  }

  return (
    <div>
      <h1>The Events Page</h1>
      <FormSearchEvents months={MONTHS} years={YEARS} onSearch={onSearch} />
      <div className="events-container">
        <ListingEventiTemplate events={events} />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')

  const jsonData = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(jsonData)

  return { props: {
      events: data.events
  } }
}

export default EventsPage;
