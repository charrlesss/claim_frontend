import Router from "./Component/Router";
import "../src/Style/App.css";
import { createContext, useEffect, useRef, useState } from "react";
import axios, { AxiosInstance } from "axios";
import PageHelmet from "./Component/PageHelmet";

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
  myAxios: AxiosInstance;
}

const myAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const UserContext = createContext<UserContextType>({
  myAxios,
  setUser: (_user: any) => {},
  user: {},
});

function App() {
  const [user, setNewUser] = useState(null);
  const setUser = (_user: any) => {
    setNewUser(_user);
  };

  return (
  <>
  <PageHelmet title="Loading..." />
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <UserContext.Provider value={{ myAxios, user, setUser }}>
        <Router />
      </UserContext.Provider>
    </div>
  </>
  );
}

export default App;
