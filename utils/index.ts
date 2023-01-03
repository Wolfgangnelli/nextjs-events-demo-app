import { DateFilterType, EventType } from "./types";
import { FIREBASE_DEFAULT_API, EVENTS } from "./endpoints";
import axios from "axios";
import path from 'path';
import fs from 'fs';

export const getAllEvents = async (): Promise<EventType[] | any[]> => {
  const events: EventType[] | any[] = [];

  try {
    const response = await axios.get(`${FIREBASE_DEFAULT_API}/${EVENTS}`);

    if (response.status === 200) {
      const { data } = response;

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      return events;
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Error ${error}`);
  }
  return events;
};

export const getFeaturedEvents = async (): Promise<EventType[] | any[]> => {
  const events = await getAllEvents();

  if (events) return events.filter((event: EventType) => event.isFeatured);

  return events;
};

export const getFilteredEvents = (
  dateFilter: DateFilterType,
  loadedEvents?: EventType[]
): EventType[] | undefined => {
  const { year, month } = dateFilter;

  let events;

  if (!loadedEvents) {
    (async () => (events = await getAllEvents()))();
  } else {
    events = loadedEvents;
  }

  let filteredEvents = events?.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

export const getEventById = async (
  id: string | string[] | undefined
): Promise<EventType | undefined> => {
  if (typeof id === "string") {
    const events = await getAllEvents();
    if (events) return events.find((event) => event.id === id);
  }
  return;
};

export const humanReadableDate = (
  date: string,
  withDay: boolean = true
): string => {
  if (withDay) {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } else {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }
};

export const formattedAddress = (address: string): string =>
  address.replace(", ", "\n");

export const fetcher = (...args: any): Promise<any> =>
  fetch(args).then((res) => res.json());


export const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json')
}

export const extractFeedback = (filePath: string) => {
  const fileData = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileData)
  return data;
}