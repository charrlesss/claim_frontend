import { Route, Routes } from "react-router-dom";
import { lazy, useContext, useEffect, useRef } from "react";
import Container, { NotFoundContainer } from "./Container";
import { UserContext } from "../App";
// import NotFound from "./NotFound";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "./Loading";
import DisplayReport from "./DisplayReport";
import Policy from "./Production/Policies/Policy";
import CTPL from "./Reference/CTPL";
import Rates from "./Reference/Rates";
import Subline from "./Reference/Subline";
import Mortgagee from "./Reference/Mortgagee";
import IDEntry from "./Reference/Entry/IDEntry";
import SubAccount from "./Reference/SubAccount";
import PolicyAccount from "./Reference/PolicyAccount";

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

  const VehiclePolicy = lazy(
    () => import("./Production/Policies/PolicyComponent/Vehicle/VehiclePolicy")
  );
  const FirePolicy = lazy(
    () => import("./Production/Policies/PolicyComponent/Fire/FirePolicy")
  );
  const MarinePolicy = lazy(
    () => import("./Production/Policies/PolicyComponent/Marine/MarinePolicy")
  );
  const BondsPolicy = lazy(
    () => import("./Production/Policies/PolicyComponent/Bonds/BondsPolicy")
  );
  const MSPRPolicy = lazy(
    () => import("./Production/Policies/PolicyComponent/MSPR/MSPRPolicy")
  );
  const PAPolicy = lazy(
    () => import("./Production/Policies/PolicyComponent/PA/PAPolicy")
  );
  const CGLPolicy = lazy(
    () => import("./Production/Policies/PolicyComponent/CGL/CGLPolicy")
  );

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
            key={`/${DEPARTMENT}/dashboard/task/production/policy`}
            path={`/${DEPARTMENT}/dashboard/task/production/policy`}
            element={<Policy />}
          >
            <Route
              path={`/${DEPARTMENT}/dashboard/task/production/policy`}
              element={<VehiclePolicy />}
            />
            <Route path="fire" element={<FirePolicy />} />
            <Route path="marine" element={<MarinePolicy />} />
            <Route path="bonds" element={<BondsPolicy />} />
            <Route path="mspr" element={<MSPRPolicy />} />
            <Route path="pa" element={<PAPolicy />} />
            <Route path="cgl" element={<CGLPolicy />} />
          </Route>
       
          <Route
            key={`/${DEPARTMENT}/dashboard/reference/policy-account`}
            path={`/${DEPARTMENT}/dashboard/reference/policy-account`}
            element={<PolicyAccount />}
          />
          <Route
            key={`/${DEPARTMENT}/dashboard/reference/sub-account`}
            path={`/${DEPARTMENT}/dashboard/reference/sub-account`}
            element={<SubAccount />}
          />
          <Route
            key={`/${DEPARTMENT}/dashboard/reference/id-entry`}
            path={`/${DEPARTMENT}/dashboard/reference/id-entry`}
            element={<IDEntry />}
          />
          <Route
            key={`/${DEPARTMENT}/dashboard/reference/mortgagee`}
            path={`/${DEPARTMENT}/dashboard/reference/mortgagee`}
            element={<Mortgagee />}
          />
          <Route
            key={`/${DEPARTMENT}/dashboard/reference/subline`}
            path={`/${DEPARTMENT}/dashboard/reference/subline`}
            element={<Subline />}
          />
          <Route
            key={`/${DEPARTMENT}/dashboard/reference/rates`}
            path={`/${DEPARTMENT}/dashboard/reference/rates`}
            element={<Rates />}
          />
          <Route
            key={`/${DEPARTMENT}/dashboard/reference/ctpl`}
            path={`/${DEPARTMENT}/dashboard/reference/ctpl`}
            element={<CTPL />}
          />
       
          <Route
            path={`/${DEPARTMENT}/dashboard/policy`}
            element={<Policy />}
          />
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
