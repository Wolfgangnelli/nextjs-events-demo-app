import React from "react";
import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../utils'

const FilteredEventsPage = () => {

  const { query } = useRouter()

  const slugData = query.slug;

  if(!slugData) {
    return <p className="center">Loading...</p>
  }

  const numYear = +slugData[0];
  const numMonth = +slugData[1];

  if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 1970 || numMonth < 1 || numMonth > 12) {
    return <p>Invalid filter. Please adjust your values!</p>
  }

  const filteredData = getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  if(!filteredData || filteredData.length === 0) {
    return <p>No events found for the chosen filter!</p>
  }

  return (
    <div>
      <h1>The Filtered Events Page</h1>
        <div>
          {filteredData.map(event => (
            <p key={event.id}>{event.title}</p>
          ))}
        </div>
    </div>
  );
};

export default FilteredEventsPage;
