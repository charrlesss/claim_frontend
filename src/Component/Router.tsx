import { Route, Routes } from "react-router-dom";
import { lazy, useContext, useEffect, useRef } from "react";
import Container from "./Container";
import { UserContext } from "../App";
import NotFound from "./NotFound";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "./Loading";

function Router() {
  const { user, myAxios, setUser } = useContext(UserContext);
  const DEPARTMENT = process.env.REACT_APP_DEPARTMENT;
  const Login = lazy(() => import("./Login"));
  const Dashboard = lazy(() => import("./Dashboard"));
  const BasicDocument = lazy(() => import("./Attachment/BasicDocument"));
  const Attachment = lazy(() => import("./Attachment"));
  const ListImursement = lazy(() => import("./ListImursement"));
  const ClaimsReport = lazy(() => import("./Report/ClaimsReport"));
  const UpdateAttachment = lazy(() => import("./Attachment/UpdateAttachment"));

  const refreshToken = window.localStorage.getItem("refreshToken");

  const { isPending: isLoadingRefreshoken, mutate: mutateRefreshToken } =
    useMutation({
      mutationKey: ["user"],
      mutationFn: async (variables: any) => {
        return await myAxios.post("/refresh-token", variables, {
          withCredentials: true,
        });
      },
      onSuccess: async (res) => {
        if (res.data.accessToken && res.data.refreshToken) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      },
    });

  const { isPending, mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (variables) => {
      return await myAxios.get("/token", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
    },
    onSuccess: async (res) => {
      mutateRefreshToken({ REFRESH_TOKEN: res.data.refreshToken });
    },
  });
  const mutateRef = useRef(mutate);

  useEffect(() => {
    mutateRef.current();
  }, []);

  if (user === null) {
    return (
      <>
        {(isPending || isLoadingRefreshoken) && <Loading />}
        <Routes>
          <Route
            path={`/${DEPARTMENT}/login`}
            element={<Container showheader={false} />}
          >
            <Route index element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      {(isPending || isLoadingRefreshoken) && <Loading />}
      <Routes>
        <Route path={`/${DEPARTMENT}/dashboard`} element={<Container />}>
          <Route index element={<Dashboard />} />
          <Route
            path={`/${DEPARTMENT}/dashboard/imbursement`}
            element={<ListImursement />}
          />
          <Route
            path={`/${DEPARTMENT}/dashboard/reports/claims-report`}
            element={<ClaimsReport />}
          />
        </Route>
        <Route
          path={`/${DEPARTMENT}/attactment/`}
          element={<Container showheader={false} />}
        >
          <Route path={`/${DEPARTMENT}/attactment/`} element={<Attachment />} />
          <Route
            path={`/${DEPARTMENT}/attactment/basic-document/`}
            element={<BasicDocument />}
          />
          <Route
            path={`/${DEPARTMENT}/attactment/update/`}
            element={<UpdateAttachment />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default Router;
