import React from "react";
import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../utils'
import { ListingEventiTemplate } from '../../components/templates'
import { ResultsTitle } from '../../components/molecules'
import { Button, AlertMessage } from '../../components/atoms'

const FilteredEventsPage = () => {

  const { query } = useRouter()

  const slugData = query.slug;

  if(!slugData) {
    return <p className="center">Loading...</p>
  }

  const numYear = +slugData[0];
  const numMonth = +slugData[1];

  if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 1970 || numMonth < 1 || numMonth > 12) {
    return (
    <>
      <AlertMessage message="Invalid filter. Please adjust your values!" variant="info" />
      <div className="center">
        <Button label="Show All events" href="/events" />
      </div>
    </>
    )
  }

  const filteredData = getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  if(!filteredData || filteredData.length === 0) {
    return (
      <>
      <AlertMessage message="No events found for the chosen filter!" variant="info" />
      <div className="center">
      <Button label="Show All events" href="/events" />
      </div>
      </>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <>
      <ResultsTitle date={date} />
      <ListingEventiTemplate events={filteredData} />
    </>
  );
};

export default FilteredEventsPage;
