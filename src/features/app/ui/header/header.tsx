import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { bind } from "../../../../utils/bind";
import styles from "./header.module.css";
import { routes } from "../../../../routes/index";
import { AppContext } from "../../../../app-context";

const cx = bind(styles);

export const Header: React.FC = () => {
  const { status } = useContext(AppContext);
  return (
    <header>
      <NavLink to={routes.login} activeClassName={cx("active")}>
        Login
      </NavLink>
      {status.user === "1" && (
        <NavLink to={routes.settings} activeClassName={cx("active")}>
          Settings
        </NavLink>
      )}
      {status.user === "1" && (
        <NavLink to={routes.events} activeClassName={cx("active")}>
          Events
        </NavLink>
      )}
      {status.user === "1" && (
        <NavLink to={routes.favorites} activeClassName={cx("active")}>
          Favorites
        </NavLink>
      )}
      {status.user === "1" && (
        <NavLink to={routes.logout} activeClassName={cx("active")}>
          Salir
        </NavLink>
      )}
    </header>
  );
};
