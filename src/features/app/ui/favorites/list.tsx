import React, { useEffect, useState, useContext } from "react";
import { FavoriteCard } from "../../../../components/favorite-card/favorite-card";
import { FavoriteInterface } from "../../../app/domain/favorite/Favorite";
import { getFavorites } from "../../../../infrastructure/events/events";
import { AppContext } from "../../../../app-context";

export const ListFavorites: React.FunctionComponent<{}> = () => {
  const favoriteSetup: Array<FavoriteInterface> = [];
  const [favorites, setFavorites] = useState(favoriteSetup);
  const { status, updateApp } = useContext(AppContext);
  const [fav] = useState("");

  const fetchFavorites = async () => {
    updateApp({ ...status, app: "1" });
    const list = await getFavorites();
    setFavorites(list);
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
    fetchFavorites();
  }, [fav]);

  return (
    <>
      <FavoriteCard items={favorites}></FavoriteCard>
    </>
  );
};
