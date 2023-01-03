import React, { SyntheticEvent, useRef } from "react";
import { HomeTemplate, ListingEventiTemplate } from "../components/templates";
import { getFeaturedEvents } from "../utils";
import { EventType } from '../utils/types'

interface Props {
  featuredEvents: EventType[]
}

const HomePage = (props: Props) => {
  const { featuredEvents } = props

  const feedbackInputRef = useRef<HTMLTextAreaElement | null>(null)
  const emailInputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current?.value
    const enteredFeedback = feedbackInputRef.current?.value

    const reqBody = {
      email: enteredEmail,
      feedback: enteredFeedback,
    }

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => console.log(data))

  }

  return (
    <HomeTemplate>
      <h1 className="homeTitle">The Home Page</h1>
      <ListingEventiTemplate events={featuredEvents} />
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" name="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback"></label>
          <textarea name="feedback" id="feedback" cols={30} rows={10} ref={feedbackInputRef}></textarea>
        </div>
        <button type="submit">submit</button>
      </form>
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
    revalidate: 1800 // every half hour i regenerate this page for a new incoming request
  }
}

export default HomePage;
