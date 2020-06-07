import React, { useEffect, useState, useContext } from "react";
import { EventCard } from "../../../../../components/event-card/event-card";
import { Pagination } from "../../../../../components/pagination/pagination";
import { EventInterface } from "../../../domain/event/Event";
import { paginationInterface } from "../../../../../infrastructure/events/paginationInterface";
import { getEvents } from "../../../../../infrastructure/events/events";
import { AppContext } from "../../../../../app-context";

export const ListEvents: React.FunctionComponent<{}> = () => {
  const eventSetup: Array<EventInterface> = [];
  const pageSetup: paginationInterface = { number: 0, totalPages: 0 };
  const [page, setPage] = useState<paginationInterface>(pageSetup);
  const [events, setEvents] = useState(eventSetup);
  const { status, updateApp } = useContext(AppContext);

  const fetchEvents = async (page: number) => {
    updateApp({ ...status, app: "1", msg: "" });
    setEvents([]);
    const { server, events, pagination } = await getEvents(page);
    const { number, totalPages } = pagination;

    if (server.status === "ok") {
      setPage({ number, totalPages });
      setEvents(events);

      if (events.length > 0) {
        updateApp({ ...status, app: "0" });
      } else {
        updateApp({
          ...status,
          app: "0",
          msg: "w| No hay eventos disponibles para las opciones definidas.",
        });
      }
    } else {
      updateApp({ ...status, app: "0", msg: "e|" + server.message });
    }
  };

  const updatePage = (p: number) => {
    setPage({ ...page, number: p });
  };

  useEffect(() => {
    fetchEvents(page.number);
  }, [page.number]);

  return (
    <>
      <Pagination
        number={page.number}
        total={page.totalPages}
        update={(i: number) => updatePage(i)}
      ></Pagination>
      <div>
        <br></br>
      </div>
      <EventCard items={events}></EventCard>
    </>
  );
};
