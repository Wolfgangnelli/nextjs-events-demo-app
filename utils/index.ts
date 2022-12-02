import { DateFilterType, DummyEventType } from "./types";
import { FIREBASE_DEFAULT_API, EVENTS } from './endpoints'
import axios from 'axios'

export const getAllEvents = async (): Promise<DummyEventType[] | any[]> => {
  const events: DummyEventType[] | any[] = []

  try {
    const response = await axios.get(`${FIREBASE_DEFAULT_API}/${EVENTS}`)
    
    if(response.status === 200) {
      const { data } = response
      
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
    throw new Error(`Error ${error}`);
  }
  return events
}

export const getFeaturedEvents = async (): Promise<DummyEventType[] | any[]> => {
    const events = await getAllEvents()
    
    if (events) return events.filter((event: DummyEventType) => event.isFeatured);

    return events
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

export const getEventById = async (id: string | string[] | undefined): Promise<DummyEventType | undefined> => {
  if(typeof id === 'string') {
    const events = await getAllEvents()
    if(events) return events.find((event) => event.id === id);
  }
  return;
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