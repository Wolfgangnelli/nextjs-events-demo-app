import { DUMMY_EVENTS } from "../dummy-data";
import { DateFilterType } from "./types";

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter: DateFilterType) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
}

export function getEventById(id: string) {
  return DUMMY_EVENTS.find((event) => event.id === id);
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
