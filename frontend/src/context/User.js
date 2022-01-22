import React from "react";

const User = React.createContext({
  authToken: "",
  loggedIn: false,
  setAuthToken: () => {},
  setLoggedIn: () => {},
});

export default User;
