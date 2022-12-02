import React from "react";
import { HomeTemplate, ListingEventiTemplate } from "../components/templates";
import { getFeaturedEvents } from "../utils";
import { DummyEventType } from '../utils/types'

interface Props {
  featuredEvents: DummyEventType[]
}

const HomePage = (props: Props) => {
  const { featuredEvents } = props

  return (
    <HomeTemplate>
      <h1 className="homeTitle">The Home Page</h1>
      <ListingEventiTemplate events={featuredEvents} />
    </HomeTemplate>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()

  if(!featuredEvents) {
    return {
      props: {
        notFound: true
      }
    }
  }

  return {
    props: {
      featuredEvents: featuredEvents
    },
    revalidate: 60
  }
}

export default HomePage;
