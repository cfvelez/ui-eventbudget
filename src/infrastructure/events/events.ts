import { httpClient } from "../http-client";
import { EventInterface } from "../../features/app/domain/event/Event";
import { paginationDto } from "./paginationDto";
import { FavoriteInterface } from "../../features/app/domain/favorite/Favorite";
import { serverResponse } from "../../features/app/domain/serverResponse";
import { FullCalendarEventInterface } from "../../features/app/domain/fullCalendarEvent/FullCalendarEvent";

export const getEvents = async (page: number) => {
  const URL: string = `/events/all/${page}`;

  let events: Array<EventInterface> = [];
  let pagination: paginationDto = {
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  };

  const response = (await httpClient.get(URL)) as serverResponse;
  let server = {
    status: response.data.status,
    message: response.data.message,
  };
  if (response.data.status === "ok") {
    events = response.data.data.events as Array<EventInterface>;
    pagination = response.data.data.page as paginationDto;
  }
  return { server, events, pagination };
};

export const addEvent = async (eventId: string) => {
  const URL: string = `/events/add/${eventId}`;
  const response = await httpClient.post(URL);
  const data = response.data;
  return data;
};

export const deleteEvent = async (eventId: string) => {
  const URL: string = `/events/del/${eventId}`;
  const response = await httpClient.delete(URL);
  const data = response.data;
  return data;
};

export const getFavorites = async () => {
  const URL: string = `/events/favorites/`;
  let favorites: Array<FavoriteInterface> = [];

  const response = await httpClient.get(URL);
  if (response.data.status === "ok") {
    favorites = response.data.data as Array<FavoriteInterface>;
  }
  return favorites;
};

const getTime = (time: string) => {
  if (time !== "" && time !== undefined) {
    console.log(time);
    const hour = parseInt(time.substring(0, 2));

    if (hour > 0 && hour <= 12) {
      return parseInt(time.substring(0, 5)) + "am";
    } else {
      return parseInt(time.substring(0, 5)) + "pm";
    }
  }

  return "";
};

export const getCalendarEvents = async () => {
  const URL: string = `/events/favorites/`;
  let events: Array<FavoriteInterface> = [];

  const response = await httpClient.get(URL);
  if (response.data.status === "ok") {
    events = response.data.data as Array<FavoriteInterface>;
  }
  return events.map((event) => {
    let customTitle = getTime(event.time) + "<br>" + event.name;
    let calendarEvent: FullCalendarEventInterface = {
      title: customTitle,
      start: event.date.substring(0, 10),
      url: event.url,
    };
    return calendarEvent;
  });
};
