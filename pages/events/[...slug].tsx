import React from "react";
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import { getFilteredEvents } from '../../utils'
import { RedirectPropsType, EventType, DatePropsType } from '../../utils/types'
import { ListingEventiTemplate } from '../../components/templates'
import { ResultsTitle } from '../../components/molecules'
import { Button, AlertMessage } from '../../components/atoms'

interface Props {
  events: EventType[] | []
  redirect?: RedirectPropsType
  notFound?: boolean
  hasError?: boolean
  date?: DatePropsType
}

const FilteredEventsPage = (props: Props) => {
  const { events = [], hasError = false, date = undefined } = props

  if(hasError) {
    return (
    <>
      <AlertMessage message="Invalid filter. Please adjust your values!" variant="info" />
      <div className="center">
        <Button label="Show All events" href="/events" />
      </div>
    </>
    )
  }

  if(!events || events.length === 0) {
    return (
      <>
        <AlertMessage message="No events found for the chosen filter!" variant="info" />
        <div className="center">
          <Button label="Show All events" href="/events" />
        </div>
      </>
    )
  }

  const formatDate = date && new Date(date?.year, date?.month - 1)

  return (
    <>
    {formatDate && ( <ResultsTitle date={formatDate} />)}
      <ListingEventiTemplate events={events} />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context

  const filteredData = params?.slug;

  const filteredYear = filteredData?.[0]
  const filteredMonth = filteredData?.[1]

  const numYear = typeof filteredYear !== 'undefined' ? +filteredYear : 0
  const numMonth = typeof filteredMonth !== 'undefined' ? +filteredMonth : 0

  // check if the validation fail
  if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 1970 || numMonth < 1 || numMonth > 12) {
    return {
/*         notFound: true, // show 404 page
        redirect: {
          destination: '/error' // redirect to a specific error page
        }, */
        props: {
          hasError: true // pass a props that let me show a error message on this page
        } 
    }
  }
  
  const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth })
  
  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth
      }
    }
  }

}

export default FilteredEventsPage;
