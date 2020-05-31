import React, { useEffect, useState } from "react";
import { EventCard } from "../../../../../components/event-card/event-card";
import { Pagination } from "../../../../../components/pagination/pagination";
import { EventInterface } from "../../../domain/event/Event";
import { paginationInterface } from "../../../../../infrastructure/events/paginationInterface";
import { getEvents } from "../../../../../infrastructure/events/events";

export const ListEvents: React.FunctionComponent<{}> = () => {
  const eventSetup: Array<EventInterface> = [];
  const pageSetup: paginationInterface = { number: 0, totalPages: 0 };
  const [page, setPage] = useState<paginationInterface>(pageSetup);
  const [events, setEvents] = useState(eventSetup);

  const fetchEvents = async (page: number) => {
    const { events, pagination } = await getEvents(page);
    const { number, totalPages } = pagination;
    setPage({ number, totalPages });
    setEvents(events);
  };

  const updatePage = (p: number) => {
    setPage({ ...page, number: p });
  };

  useEffect(() => {
    fetchEvents(page.number);
  }, [page.number]);

  return (
    <>
      <EventCard items={events}></EventCard>
      <Pagination
        number={page.number}
        total={page.totalPages}
        update={(i: number) => updatePage(i)}
      ></Pagination>
    </>
  );
};
