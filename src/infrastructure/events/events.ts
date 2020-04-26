import { httpClient } from "../http-client";
import { EventInterface } from "../../features/app/domain/event/Event";

export const getEvents = async (page: number) => {
  const URL: string = `/events/all/${page}`;
  let events: Array<EventInterface>;

  const response = await httpClient.get(URL);
  events = response.data.events as Array<EventInterface>;

  return events;
};
