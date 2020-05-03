/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { bind } from "../../utils/bind";
import styles from "./event-card.module.css";
import { EventInterface } from "../../features/app/domain/event/Event";
import { addEvent } from "../../infrastructure/events/events";
import { Button } from "../button/button";

const cx = bind(styles);

interface Props {
  items: Array<EventInterface>;
  //list: EventInterface[]
}

export const EventCard: React.FunctionComponent<Props> = ({ items }) => {
  const handleAddEventBtn = async (id: string) => {
    const data = await addEvent(id);
    if (data.status === "ok") {
      let div = document.querySelector(`div#${id}`) as HTMLDivElement;
      div.hidden = true;
    } else {
      //Pendiente
      alert(data.message + "(Pendiente UI)");
    }
  };

  const listEvents = (list: Array<EventInterface>) => {
    const card = list.map((event: EventInterface) => {
      return (
        <div key={event.id} id={event.id} className={cx("card")}>
          {event.id}-{event.name}
          <Button onClick={() => handleAddEventBtn(event.id)}>Agregar</Button>
        </div>
      );
    });

    return card;
  };

  return <>{listEvents(items)}</>;
};
