import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents, fetcher } from "../../utils";
import { FIREBASE_DEFAULT_API, EVENTS } from "../../utils/endpoints";
import { RedirectPropsType, EventType, DatePropsType } from "../../utils/types";
import { ListingEventiTemplate } from "../../components/templates";
import { ResultsTitle } from "../../components/molecules";
import { Button, AlertMessage } from "../../components/atoms";
import useSWR from "swr";
import Head from "next/head";

interface Props {
  events: EventType[] | [];
  redirect?: RedirectPropsType;
  notFound?: boolean;
  hasError?: boolean;
  date?: DatePropsType;
}

const FilteredEventsPage = (props: Props) => {
  const {
    events: filteredEvents = [],
    hasError = false,
    date = undefined,
  } = props;

  const [loadedEvents, setloadedEvents] = useState(filteredEvents);

  const { query } = useRouter();
  const { data, error } = useSWR(`${FIREBASE_DEFAULT_API}/${EVENTS}`, fetcher);

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setloadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="A list of filtered events." />
    </Head>
  )

  if (!loadedEvents) {
    return (
        <> 
        {pageHeadData} 
        <p className="center">Loading...</p>  
        </>
      );
  }

  const filteredYear = query.slug?.[0];
  const filteredMonth = query.slug?.[1];

  const numYear = typeof filteredYear !== "undefined" ? +filteredYear : 0;
  const numMonth = typeof filteredMonth !== "undefined" ? +filteredMonth : 0;

  pageHeadData = (
    <Head>
    <title>Filtered Events</title>
    <meta name="description" content={`All events for ${numMonth}/${numYear}`} />
  </Head>
  )

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 1970 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
      {pageHeadData}
        <AlertMessage
          message="Invalid filter. Please adjust your values!"
          variant="info"
        />
        <div className="center">
          <Button label="Show All events" href="/events" />
        </div>
      </>
    );
  }

  const eventsFiltered = getFilteredEvents(
    { year: numYear, month: numMonth },
    loadedEvents
  );

  if (!eventsFiltered || eventsFiltered.length === 0) {
    return (
      <>
      {pageHeadData}
        <AlertMessage
          message="No events found for the chosen filter!"
          variant="info"
        />
        <div className="center">
          <Button label="Show All events" href="/events" />
        </div>
      </>
    );
  }

  const formatDate = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      {formatDate && <ResultsTitle date={formatDate} />}
      <ListingEventiTemplate events={eventsFiltered} />
    </>
  );
};

/* export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const filteredData = params?.slug;

  const filteredYear = filteredData?.[0];
  const filteredMonth = filteredData?.[1];

  const numYear = typeof filteredYear !== "undefined" ? +filteredYear : 0;
  const numMonth = typeof filteredMonth !== "undefined" ? +filteredMonth : 0;

  // check if the validation fail
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 1970 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
        notFound: true, // show 404 page
        redirect: {
          destination: '/error' // redirect to a specific error page
        },
      props: {
        hasError: true, // pass a props that let me show a error message on this page
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
 */
export default FilteredEventsPage;
