import React, { useEffect, useState, useContext } from "react";
import { MyFullCalendar } from "../../../../components/fullcalendar/fullcalendar";
import { FullCalendarEventInterface } from "../../domain/fullCalendarEvent/FullCalendarEvent";
import { getCalendarEvents } from "../../../../infrastructure/events/events";
import { AppContext } from "../../../../app-context";

export const Calendar: React.FunctionComponent<{}> = () => {
  const eventsSetup: Array<FullCalendarEventInterface> = [];
  const [events, setEvents] = useState(eventsSetup);
  const { status, updateApp } = useContext(AppContext);

  const fetchCalendarEvents = async () => {
    updateApp({ ...status, app: "1" });
    const list = await getCalendarEvents();

    var sortedEvents = list.sort(function (
      event1: FullCalendarEventInterface,
      event2: FullCalendarEventInterface
    ) {
      let a = new Date(event1.start);
      let b = new Date(event2.start);
      return a < b ? -1 : a > b ? 1 : 0;
    });
    setEvents(sortedEvents);
    if (list.length > 0) {
      updateApp({ ...status, app: "0" });
    } else {
      updateApp({
        ...status,
        app: "0",
        msg: "w| Aún no tienes eventos guardados en tus favoritos.",
      });
    }
  };

  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  return <MyFullCalendar myEvents={events} />;
};
