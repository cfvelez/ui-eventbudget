import React, { useEffect, useState } from "react";
import { FavoriteCard } from "../../../../components/favorite-card/favorite-card";
import { FavoriteInterface } from "../../../app/domain/favorite/Favorite";
import { getFavorites } from "../../../../infrastructure/events/events";

export const ListFavorites: React.FunctionComponent<{}> = () => {
  const favoriteSetup: Array<FavoriteInterface> = [];
  const [favorites, setFavorites] = useState(favoriteSetup);

  const fetchFavorites = async () => {
    const list = await getFavorites();
    setFavorites(list);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <>
      <FavoriteCard items={favorites}></FavoriteCard>
    </>
  );
};
