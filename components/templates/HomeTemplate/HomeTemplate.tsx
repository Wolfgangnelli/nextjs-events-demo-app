import React from "react";
import Head from 'next/head'

const HomeTemplate = (props: any) => {
  const { children } = props;

  return (
  <div>
    <Head>
      <title>NextJS Events</title>
      <meta name="description" content="Find a lot of great events that allow you to evolve" />
    </Head>
    {children}
  </div>
  );
};

export default HomeTemplate;
