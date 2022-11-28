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


// Dynamic pages like this are not pre-generated by default (as intead static pages), 
// because it doesn't know which value for eventId will eventually be supported.
// They are always generated just in time on the server. You tell Next.js that you want to pre-render this page in advance.
// We can also tell Next.js which paths, so which instance off a dynamic page should be pre-generated.
// Which dynamic segment values will be available and for which values a page should be pre-generated.
// We do inform Next.js about this with another function (getStaticPaths) we can add on the page.

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
    return <p>Loading...</p>
   // return <AlertMessage message="No event found!" variant="info" />
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

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath, 'utf8')
  const data = JSON.parse(jsonData)

  return data;
}

// Pre-render a page. We use to prepare the data for pre-rendering the page, then this happens on the server
// Prepare a page on the server or during the build process with getStaticProps
// This function is run before the component function runs. I prepare the data for the component
export async function getStaticProps(context: GetStaticPropsContext) {
  // access to the dynamic params
  const { params } = context
  const eventid = params?.eventId;

  const data = await getData()

  const event = data.events.find((event: DummyEventType) => event.id === eventid)

  if(!event) {
    return { notFound: true }
  }

  return {
    props: {
      event: event
    }
  }
}

// Tell Next.js which concrete instances of this dynamic page should be generated
export async function getStaticPaths() {
  
  const data = await getData()
  const ids = data.events.map((event: DummyEventType) => event.id)
  const pathsWithParams = ids.map((id: string) => ({  params: { eventId: id }}))

  return {
    paths: pathsWithParams,
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    fallback: true,
    // { fallback: true } useful if your app has a very large number of static pages that depending on data (e-commerce).
    // You can generate a small subset of pages and use fallback: true for the rest. When someone requests a page that is not generated yet, the user will 
    // see the page with a loading indicator
    
  }
}

export default EventDetailPage;
