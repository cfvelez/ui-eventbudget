import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { bind } from "../../utils/bind";
import styles from "./header.module.css";
import { routes } from "../../routes/index";
import { AppContext } from "../../app-context";

const cx = bind(styles);

export const Header: React.FC = () => {
  const { status } = useContext(AppContext);
  return (
    <header>
      <ul className={cx("nav-ul")}>
        {status.user === "1" && (
          <li className={cx("nav-li")}>
            <NavLink to={routes.settings} activeClassName={cx("active")}>
              Preferencias
            </NavLink>
          </li>
        )}
        {status.user === "1" && (
          <li className={cx("nav-li")}>
            <NavLink to={routes.events} activeClassName={cx("active")}>
              Eventos
            </NavLink>
          </li>
        )}
        {status.user === "1" && (
          <li className={cx("nav-li")}>
            <NavLink to={routes.favorites} activeClassName={cx("active")}>
              Favoritos
            </NavLink>
          </li>
        )}
        {status.user === "1" && (
          <li className={cx("nav-li")}>
            <NavLink to={routes.security} activeClassName={cx("active")}>
              Seguridad
            </NavLink>
          </li>
        )}
        {status.user === "1" && (
          <li className={cx("nav-li-last")}>
            <NavLink to={routes.logout} activeClassName={cx("active")}>
              Salir
            </NavLink>
          </li>
        )}
      </ul>
    </header>
  );
};
