/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { bind } from "../../utils/bind";
import styles from "./favorite-card.module.css";
import { FavoriteInterface } from "../../features/app/domain/favorite/Favorite";
import { deleteEvent } from "../../infrastructure/events/events";
import { Button } from "../button/button";

const cx = bind(styles);

interface Props {
  items: Array<FavoriteInterface>;
  //list: EventInterface[]
}

export const FavoriteCard: React.FunctionComponent<Props> = ({ items }) => {
  const handleAddEventBtn = async (id: string) => {
    const data = await deleteEvent(id);
    if (data.status === "ok") {
      let div = document.querySelector(`div#${id}`) as HTMLDivElement;
      div.hidden = true;
    } else {
      //Pendiente
      alert(data.message + "(Pendiente UI)");
    }
  };

  const listFavorites = (list: Array<FavoriteInterface>) => {
    const card = list.map((favorite: FavoriteInterface) => {
      return (
        <div
          key={favorite.eventId}
          id={favorite.eventId}
          className={cx("card")}
        >
          {favorite.eventId}-{favorite.name}
          <Button onClick={() => handleAddEventBtn(favorite.eventId)}>
            Borrar
          </Button>
        </div>
      );
    });

    return card;
  };
  return <>{listFavorites(items)}</>;
};
