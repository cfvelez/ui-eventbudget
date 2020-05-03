import React, { useEffect, useState } from "react";
import { EventCard } from "../../../../../components/event-card/event-card";
import { EventInterface } from "../../../domain/event/Event";
import { getEvents } from "../../../../../infrastructure/events/events";

export const ListEvents: React.FunctionComponent<{}> = () => {
  const eventsSetup: Array<EventInterface> = [];
  const [page, setPage] = useState(0);
  const [events, setEvents] = useState(eventsSetup);

  const fetchEvents = async (page: number) => {
    const list = await getEvents(page);
    setEvents(list);
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  return (
    <>
      <EventCard items={events}></EventCard>
    </>
  );
};
