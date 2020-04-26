import React from "react";
import { bind } from "../../utils/bind";
import styles from "./card.module.css";
import { EventInterface } from "./../../features/app/domain/event/Event";
import { Button } from "../button/button";

const cx = bind(styles);

interface Props {
  items: Array<EventInterface>;
  //list: EventInterface[]
}

const handleSaveEventBtn = (id: string) => {
  let div = document.querySelector(`div#${id}`) as HTMLDivElement;
  div.hidden = true;
};

const listEvents = (list: Array<EventInterface>) => {
  const card = list.map((event: EventInterface) => {
    return (
      <div key={event.id} id={event.id} className={cx("card")}>
        {event.id}-{event.name}
        <Button onClick={() => handleSaveEventBtn(event.id)}>Agregar</Button>
      </div>
    );
  });

  return card;
};

export const Card: React.FunctionComponent<Props> = ({ items }) => {
  return <>{listEvents(items)}</>;
};
