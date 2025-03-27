import Router from "./Component/Router";
import "../src/Style/App.css";
import { createContext, useEffect, useRef, useState } from "react";
import axios, { AxiosInstance } from "axios";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "./Component/Loading";

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

  myAxios.interceptors.request.use(
    function (req) {
      return req;
    },
    function (error) {
      console.log("req Err", error);
      return Promise.reject(error);
    }
  );
  myAxios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (error.response.status === 403) {
        // try {
        //   const token = await myAxios.get("/token", {
        //     withCredentials: true,
        //   });
        //   const refreshResponse = await myAxios.post(
        //     "/refresh-token",
        //     { REFRESH_TOKEN: token.data.refreshToken },
        //     { withCredentials: true }
        //   );

        //   setUser(token.data);

        //   error.config.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
        //   return myAxios.request(error.config);
        // } catch (refreshError) {
        //   return Promise.reject(error);
        // }
        window.location.reload()
        return Promise.reject(error);

      }
      return Promise.reject(error);
    }
  );




  return (
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
  );
}

export default App;
