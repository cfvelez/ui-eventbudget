import React, { useEffect, useState } from "react";
import { Card } from "../../../../../components/card/card";
import { EventInterface } from "../../../domain/event/Event";
import { getEvents } from "../../../../../infrastructure/events/events";
import { categoryDto } from "../../../domain/event/CategoryDto";
import { dateDto } from "../../../domain/event/DateDto";
import { locationDto } from "../../../domain/event/LocationDto";

export const List: React.FunctionComponent<{}> = () => {
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
      <Card items={events}></Card>
    </>
  );
};
