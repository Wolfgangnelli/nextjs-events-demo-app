import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetcher } from '../../utils'
import { DummyEventType } from "../../utils/types";
import { FIREBASE_DEFAULT_API, EVENTS } from '../../utils/endpoints'
import { ListingEventiTemplate } from "../../components/templates";
import { YEARS, MONTHS } from "../../dummy-data";
import { FormSearchEvents } from "../../components/molecules";
import { useLocalStorageSpace } from '../../hooks'
import useSWR from 'swr'

interface Props {
  events: DummyEventType[]
}

const EventsPage = (props: Props) => {
  const { events: eventsInitialState } = props

  const [events, setEvents] = useState(eventsInitialState)

  const router = useRouter();
  const { data, error } = useSWR(`${FIREBASE_DEFAULT_API}/${EVENTS}`, fetcher)

  const onSearch = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  useEffect(() => {
    if(data) {
      const transformedEvents = []

      for (const key in data) {
        transformedEvents.push({
          id: data[key].id,
          date: data[key].date,
          description: data[key].description,
          image: data[key].image,
          isFeatured: data[key].isFeatured,
          location: data[key].location,
          title: data[key].title
        })
      } 
     
      localStorage.setItem('events', JSON.stringify(transformedEvents))
      setEvents(transformedEvents)
    }
  }, [data])

  if(error) return <p>Fail to load data</p>

  if(!data && !events) return <p>Loading...</p>

  if (!events.length) return <p>No events founds!</p>
  
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

// This getStaticProps function did run again on the server, not in the browser and not during the build process, 
// but on the server, after it was deployed so to say with npm start. And therefore we see this was revalidated.
// It was rebuild because of our 10 sec as setting
export async function getStaticProps() {
  const { totalSpaceUsed, approxSpaceRemaining } = useLocalStorageSpace()
/*   const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')

  const jsonData = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(jsonData) */
  const res = await fetch(`${FIREBASE_DEFAULT_API}/${EVENTS}`)

  const data = await res.json()

  // if there is no data in general
  if(!data) {
    return { 
      redirect:  {
        destination: "/no-data" // for example /no-data or another route you want
      }
    }
  }

  const transformedEvents = []

  for (const key in data) {
    transformedEvents.push({
      id: data[key].id,
      date: data[key].date,
      description: data[key].description,
      image: data[key].image,
      isFeatured: data[key].isFeatured,
      location: data[key].location,
      title: data[key].title
    })
  } 

  if(transformedEvents && approxSpaceRemaining > totalSpaceUsed) {
    localStorage.setItem('events', JSON.stringify(transformedEvents))
  }

  // if the fetch data fails, i return notFound equals to true and render the 404 page
  if(transformedEvents.length === 0) {
    return { notFound: true }
  }

  return { 
    props: {
      events: transformedEvents
    },
    // for every incoming request to this page it should be re-generated unless, it's less than 10 second ago that it was last re-generated
    // so it's recreated at most once every 10 seconds
    // revalidate: 10, //ISR
    // notFound: true, // boolean value. If set to true, this page will return 404 error and therefore render the 404 page instead of the normal page
    // redirect: // redirect the user to another page, to another route
}
}

export default EventsPage;
