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

// This getStaticProps function did run again on the server, not in the browser and not during the build process, 
// but on the server, after it was deployed so to say with npm start. And therefore we see this was revalidated.
// It was rebuild because of our 10 sec as setting
export async function getStaticProps() {
  console.log('(Re-)Generating...')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')

  const jsonData = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(jsonData)

  // if there is no data in general
  if(!data) {
    return { 
      redirect:  {
        destination: "/no-data" // for example /no-data or another route you want
      }
    }
  }

  // if the fetch data fails, i return notFound equals to true and render the 404 page
  if(data.events.length === 0) {
    return { notFound: true }
  }

  return { 
    props: {
      events: data.events
    },
    // for every incoming request to this page it should be re-generated unless, it's less than 10 second ago that it was last re-generated
    // so it's recreated at most once every 10 seconds
    revalidate: 10, //ISR
    // notFound: true, // boolean value. If set to true, this page will return 404 error and therefore render the 404 page instead of the normal page
    // redirect: // redirect the user to another page, to another route
}
}

export default EventsPage;
