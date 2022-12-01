import { DateFilterType, DummyEventType } from "./types";
import { FIREBASE_DEFAULT_API, EVENTS } from './endpoints'
import axios from 'axios'

export async function getAllEvents(): Promise<DummyEventType[] | undefined> {
  try {
    const response = await axios.get(`${FIREBASE_DEFAULT_API}/${EVENTS}`)

    if(response.status === 200) {
      const { data } = response

      const events = []

        for (const key in data) {
            events.push({
              id: key,
              ...data[key]
            })
      }

      return events;
    }

  } catch (error) {
    console.error(error)
  }
}

export async function getFeaturedEvents(): Promise<DummyEventType[] | undefined> {
    const events = await getAllEvents()
    if (!events) return undefined
    if (events) return events.filter((event: DummyEventType) => event.isFeatured);
}



export function getFilteredEvents(dateFilter: DateFilterType, data: DummyEventType[]) {
  const { year, month } = dateFilter;

  let filteredEvents = data.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
}

export function getEventById(id: string, data: DummyEventType[]) {
  return data.find((event) => event.id === id);
}

export const humanReadableDate = (date: string, withDay: boolean = true) => {
  if(withDay) {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } else {
    return  new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }
}

export const formattedAddress = (address: string) =>
  address.replace(", ", "\n");

export const fetcher = (...args: any) => fetch(args).then(res => res.json())