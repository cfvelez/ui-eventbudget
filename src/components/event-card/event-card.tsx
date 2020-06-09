/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import { bind } from "../../utils/bind";
import styles from "./event-card.module.css";
import { EventInterface } from "../../features/app/domain/event/Event";
import { addEvent } from "../../infrastructure/events/events";
import { Button } from "../button/button";
import { AppContext } from "../../app-context";
import dateInputStories from "../form/date-input/date-input.stories";

const cx = bind(styles);

interface Props {
  items: Array<EventInterface>;
  //list: EventInterface[]
}

export const EventCard: React.FunctionComponent<Props> = ({ items }) => {
  const { status, updateApp } = useContext(AppContext);
  const handleAddEventBtn = async (id: string, event: string) => {
    updateApp({ ...status, app: "1" });
    const data = await addEvent(id);
    if (data.status === "ok") {
      let div = document.querySelector(`div#${id}`) as HTMLDivElement;
      div.hidden = true;
      updateApp({
        ...status,
        app: "0",
        msg: "s| El evento " + event + " fue adicionado a tus favoritos.",
      });
    } else {
      updateApp({ ...status, app: "0", msg: "e|" + data.message });
    }
  };

  const listEvents = (list: Array<EventInterface>) => {
    const card = list.map((event: EventInterface) => {
      return (
        <div key={event.id} id={event.id} className={cx("grid-item")}>
          <div className={cx("card")}>
            <img
              src={event.image}
              alt={event.category.name}
              className={cx("card-img")}
            />
            <h3>{event.name}</h3>
            <p>{event.location.name}</p>
            <p>
              {event.date.localDate}-{event.date.localTime}
            </p>
            <p>
              <Button onClick={() => handleAddEventBtn(event.id, event.name)}>
                Agregar
              </Button>
            </p>
          </div>
        </div>
      );
    });

    return card;
  };

  return (
    <>
      <div className={cx("grid-container")}>{listEvents(items)}</div>
    </>
  );
};
