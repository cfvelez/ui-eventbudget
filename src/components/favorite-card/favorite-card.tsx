/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import { bind } from "../../utils/bind";
import styles from "./favorite-card.module.css";
import { FavoriteInterface } from "../../features/app/domain/favorite/Favorite";
import { deleteEvent } from "../../infrastructure/events/events";
import { Button } from "../button/button";
import { AppContext } from "../../app-context";

const cx = bind(styles);

interface Props {
  items: Array<FavoriteInterface>;
  //list: EventInterface[]
}

export const FavoriteCard: React.FunctionComponent<Props> = ({ items }) => {
  const { status, updateApp } = useContext(AppContext);
  const handleAddEventBtn = async (id: string) => {
    updateApp({
      ...status,
      app: "1",
    });
    const data = await deleteEvent(id);
    if (data.status === "ok") {
      let div = document.querySelector(`div#${id}`) as HTMLDivElement;
      div.hidden = true;
      updateApp({
        ...status,
        app: "0",
      });
    } else {
      updateApp({
        ...status,
        app: "0",
        msg: "e|Un error inesperado ha ocurrido.",
      });
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
