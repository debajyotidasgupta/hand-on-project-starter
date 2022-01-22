import { React, useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.scss";
import logo from "../../assets/images/logo.svg";

import Button from "../Button/Button";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [navLinks, setNavLinks] = useState([]);

  const logIn = () => {
    // eslint-disable-next-line no-undef
    fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, { method: "GET" })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (!loggedIn) {
      setLoggedIn(true);
      setNavLinks([
        { name: "My APIs", path: "/myapi" },
        { name: "My Account", path: "/myaccount" },
      ]);
    } else {
      setLoggedIn(false);
      setNavLinks([]);
    }
  };

  return (
    <nav className={styles.container}>
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <div>
        {navLinks.map((e, i) => (
          <NavLink key={i} className={styles.lnText} to={e.path}>
            {e.name}
          </NavLink>
        ))}
        <Button
          text={loggedIn ? "+ New API" : "Login/Signup"}
          onClick={() => logIn()}
        />
      </div>
    </nav>
  );
};

export default Navbar;
