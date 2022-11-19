import React from "react";
import { HomeTemplate, ListingEventiTemplate } from "../components/templates";
import { getFeaturedEvents } from "../utils";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <HomeTemplate>
      <h1 className="homeTitle">The Home Page</h1>
      <ListingEventiTemplate events={featuredEvents} />
    </HomeTemplate>
  );
};

export default HomePage;
