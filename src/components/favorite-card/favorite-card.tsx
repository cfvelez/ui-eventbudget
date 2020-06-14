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

  const handleDetails = (url: string) => {
    window.open(url);
  };

  const getTime = (time: string) => {
    if (time != "") {
      const hour = parseInt(time.substring(0, 2));

      if (hour > 0 && hour <= 12) {
        return "AM";
      } else {
        return "PM";
      }
    }

    return "";
  };

  const listFavorites = (list: Array<FavoriteInterface>) => {
    if (list !== undefined) {
      console.log(list);
      const card = list.map((favorite: FavoriteInterface) => {
        return (
          <div
            key={favorite.eventId}
            id={favorite.eventId}
            className={cx("grid-item")}
          >
            <div className={cx("card")}>
              <img
                src={favorite.image}
                alt={favorite.name}
                className={cx("card-img")}
              />
              <h3>{favorite.name}</h3>
              <p>{favorite.location}</p>
              <p>
                {favorite.date.substring(0, 10)}:{favorite.time}:
                {getTime(favorite.time)}
              </p>
              <p>
                <Button
                  theme={"secondary"}
                  onClick={() => handleAddEventBtn(favorite.eventId)}
                >
                  Eliminar
                </Button>
                <Button onClick={() => handleDetails(favorite.url)}>
                  Comprar
                </Button>
              </p>
            </div>
          </div>
        );
      });
      return card;
    } else {
      return "";
    }
  };
  return (
    <>
      <div className={cx("grid-container")}>{listFavorites(items)}</div>
    </>
  );
};
