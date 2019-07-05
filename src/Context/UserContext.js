import React, { createContext } from "react";

const UserContext = createContext();
const UserContextProvider = props => {
  return (
    <UserContext.Provider value={{ user: null }}>
      {props.children}
    </UserContext.Provider>
  );
};
const UserContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, UserContextConsumer };
