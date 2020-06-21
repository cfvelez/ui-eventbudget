import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FullCalendarEventInterface } from "../../features/app/domain/fullCalendarEvent/FullCalendarEvent";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

interface Props {
  myEvents: Array<FullCalendarEventInterface>;
}

export const MyFullCalendar: React.FunctionComponent<Props> = ({
  myEvents,
}) => {
  const events = myEvents;

  return (
    <>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={events}
        locale="es"
        timeZone="local"
        eventRender={(api) => {
          api.el.innerHTML =
            "<span class='fc-title'>" + api.event.title + "</span>";
        }}
        eventClick={(api) => {
          api.jsEvent.preventDefault();
          if (api.event.url) {
            window.open(api.event.url);
          }
        }}
      />
    </>
  );
};
