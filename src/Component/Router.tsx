import { Route, Routes } from "react-router-dom";
import { lazy, useContext, useEffect, useRef } from "react";
import Container, { NotFoundContainer } from "./Container";
import { UserContext } from "../App";
// import NotFound from "./NotFound";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "./Loading";
import DisplayReport from "./DisplayReport";

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
  const NotFound = lazy(() => import("./NotFound"));
  const ReimbursementBasicDocument = lazy(
    () => import("./ReimbursementBasicDocument")
  );

  const refreshToken = window.localStorage.getItem("refreshToken");

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
      if (res.data.accessToken && res.data.refreshToken) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    },
  });
  const mutateRef = useRef(mutate);

  useEffect(() => {
    mutateRef.current();
  }, []);

  if (user === null) {
    return (
      <>
        {isPending && <Loading />}
        <Routes>
          <Route path={`/${DEPARTMENT}`}>
            <Route path="*" element={<NotFoundContainer />}>
              <Route index element={<NotFound />} />
            </Route>
          </Route>
          <Route
            path={`/${DEPARTMENT}/login`}
            element={<Container showheader={false} />}
          >
            <Route index element={<Login />} />
            <Route path="*" element={<NotFound />}></Route>
          </Route>
          <Route path="*" element={<NotFoundContainer />}>
            <Route index element={<NotFound />} />
          </Route>
        </Routes>
      </>
    );
  }

  return (
    <>
      {isPending && <Loading />}
      <Routes>
        <Route path={`/${DEPARTMENT}`}>
          <Route path="*" element={<NotFoundContainer />}>
            <Route index element={<NotFound />} />
          </Route>
        </Route>

        <Route path={`/${DEPARTMENT}/dashboard`} element={<Container />}>
          <Route index element={<Dashboard />} />
          <Route
            path={`/${DEPARTMENT}/dashboard/reimbursement`}
            element={<ListImursement />}
          />

          <Route
            path={`/${DEPARTMENT}/dashboard/reports/claims-report`}
            element={<ClaimsReport />}
          />
          <Route path="*" element={<NotFound />}></Route>
        </Route>
        <Route
          path={`/${DEPARTMENT}/dashboard/report`}
          element={<DisplayReport />}
        />
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
          <Route
            path={`/${DEPARTMENT}/attactment/reimbursement-basic-documents`}
            element={<ReimbursementBasicDocument />}
          />
          <Route path="*" element={<NotFound />}></Route>
        </Route>
        <Route path="*" element={<NotFoundContainer />}>
          <Route index element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
