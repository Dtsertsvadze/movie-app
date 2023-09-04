import React, { useState } from "react";

export const MyContext = React.createContext();

const MyContextProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState({});

  const updateSelectedMovie = (newData) => {
    setSelectedMovie(newData);
  };

  return (
    <MyContext.Provider value={{ selectedMovie, updateSelectedMovie }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
