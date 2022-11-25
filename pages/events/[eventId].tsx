import React from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../utils";
import { AlertMessage } from "../../components/atoms";
import {
  EventContent,
  EventSummary,
  EventCard,
} from "../../components/molecules";
import { DummyEventType } from '../../utils/types'
import { GetStaticPropsContext } from 'next'
import path from 'path'
import fs from 'fs/promises'

interface Props {
  event: DummyEventType
}

const EventDetailPage = (props: Props) => {
  const { event } = props

/*   const {
    query: { eventId },
  } = useRouter();

  const event = typeof eventId === "string" && getEventById(eventId); */

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

// Pre-render a page. We use to prepare the data for pre-rendering the page, then this happens on the server
// Prepare a page on the server or during the build process with getStaticProps
// This function is run before the component function runs. I prepare the data for the component
export async function getStaticProps(context: GetStaticPropsContext) {
  // access to the dynamic params
  const { params } = context
  const eventid = params?.eventId;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath, 'utf8')
  const data = JSON.parse(jsonData)

  const event = data.events.map((event: DummyEventType) => event.id === eventid)

  return {
    props: {
      event
    }
  }
}

export default EventDetailPage;
