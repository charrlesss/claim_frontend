import {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
} from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { AccountCircle } from "@mui/icons-material";
import "../Style/header.css";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "../App";
import Swal from "sweetalert2";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToggleSlider } from "react-toggle-slider";


// const DepartmentContext = createC
const departmentPath = [
  "/CLAIMS/dashboard/task/production/policy/",
  "/CLAIMS/dashboard/task/production/policy/fire",
  "/CLAIMS/dashboard/task/production/policy/marine",
  "/CLAIMS/dashboard/task/production/policy/bonds",
  "/CLAIMS/dashboard/task/production/policy/mspr",
  "/CLAIMS/dashboard/task/production/policy/pa",
  "/CLAIMS/dashboard/task/production/policy/cgl",
];
function Container({ showheader = true }: any) {

  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const { myAxios, user, setUser } = useContext(UserContext);
  const department = useRef(process.env.REACT_APP_DEPARTMENT);
  const menuData = [
    {
      name: "Reference",
      subLinks: [
        {
          name: "Policy Account",
          path: `/${department.current}/dashboard/reference/policy-account`,
        },
        {
          name: "Sub Account",
          path: `/${department.current}/dashboard/reference/sub-account`,
        },
        {
          name: "ID Entry",
          path: `/${department.current}/dashboard/reference/id-entry`,
        },
        {
          name: "Subline",
          path: `/${department.current}/dashboard/reference/subline`,
        },
        {
          name: "Rates",
          path: `/${department.current}/dashboard/reference/rates`,
        },
        {
          name: "CTPL",
          path: `/${department.current}/dashboard/reference/ctpl`,
        },
        {
          name: "Mortgagee",
          path: `/${department.current}/dashboard/reference/mortgagee`,
        },
      ],
    },
    {
      name: "Claim",
      path: `/${department.current}/dashboard`,
    },
    {
      name: "Policy",
      path: `/${department.current}/dashboard/task/production/policy/`,
    },
    {
      name: "Reimbursement",
      path: `/${department.current}/dashboard/reimbursement`,
    },

    {
      name: "Claims Report",
      path: `/${department.current}/dashboard/reports/claims-report`,
    },
  ];
  const [openMenu, setOpenMenu] = useState(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const menuRef = useRef<any>(null); // Reference to the menu container
  const menuUserRef = useRef<any>(null); // Reference to the menu container
  const location = useLocation();

  const { mutate: mutateLogout, isPending: isLaodingLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async (variable: any) =>
      await myAxios.post("/logout", variable, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }),
    onSuccess: (res) => {
      if (res.data.success) {
        setOpenUserMenu(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 800,
        }).then(() => {
          setUser(null);
          navigate(`/${process.env.REACT_APP_DEPARTMENT}/login`);
        });
      }
    },
  });

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateLogout({});
      }
    });
  };

  const handleMouseEnter = (menuItem: any) => {
    if (!menuItem.path && menuItem.subLinks) {
      return; // Ignore hover if no direct path and has sublinks
    }
    setOpenMenu(menuItem.name);
  };
  const handleClick = (menuItem: any) => {
    if (!menuItem.path && menuItem.subLinks) {
      // Toggle submenu display on click
      setOpenMenu(openMenu === menuItem.name ? null : menuItem.name);
    }
  };
  const handleMobileClick = (menuItem: any, e: any) => {
    if (!menuItem.path && menuItem.subLinks) {
      // Toggle submenu display on click
      setOpenMenu(openMenu === menuItem.name ? null : menuItem.name);
    }
  };
  const handleSubLinkClick = () => {
    // Close submenu after clicking any sublink
    setOpenMenu(null);
  };
  // Add event listener to handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }

      if (menuUserRef.current && !menuUserRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isLaodingLogout && <Loading />}
      {showheader && (
        <header id="desk-header">
          <nav ref={menuRef} className="menu header-ch">
            <ul className="main-menu">
              {menuData.map((menuItem: any, index: any) => (
                <li key={index} onMouseEnter={() => handleMouseEnter(menuItem)}>
                  {/* Conditional rendering for click vs link */}
                  {menuItem.path ? (
                    <Link
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      to={menuItem.path}
                    >
                      {menuItem.name}
                    </Link>
                  ) : (
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                      onClick={() => handleClick(menuItem)}
                    >
                      {menuItem.name}
                    </span>
                  )}

                  {/* Show submenu based on hover or click */}
                  {menuItem.subLinks && openMenu === menuItem.name && (
                    <ul className="submenu">
                      {menuItem.subLinks.map((subLink: any, subIndex: any) => (
                        <li
                          key={subIndex}
                          style={{
                            background:
                              subLink.path === location.pathname ? "#555" : "",
                          }}
                        >
                          <Link to={subLink.path} onClick={handleSubLinkClick}>
                            {subLink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div
            className="header-ch"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              columnGap: "10px",
            }}
          >
   
            <div className="profile-sub-menu">
              <span>{department.current}</span>
            </div>
            <div
              ref={menuUserRef}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AccountCircle
                color="info"
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpenUserMenu((d) => !d);
                }}
              />
              {openUserMenu && (
                <ul className="user-menu">
                  <li>
                    <span>Profile</span>
                  </li>
                  <li>
                    <span
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Logout
                    </span>
                  </li>
                </ul>
              )}
            </div>
            <div style={{ width: "100px" }}>
              <Clock />
            </div>
          </div>
        </header>
      )}
      {showheader && (
        <>
          <header className="mobile-header">
            <IconButton
              onClick={() => {
                setShowSidebar(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <div
              style={{
                display: "flex",
                columnGap: "10px",
                alignItems: "center",
              }}
            >
       
              <div
                style={{
                  width: "80px",
                  textAlign: "right",
                }}
              >
                <Clock />
              </div>
            </div>
          </header>
          {showSidebar && (
            <div
              className="sidebar-shadow"
              onClick={() => setShowSidebar(false)}
            ></div>
          )}
          {showSidebar && (
            <div className="sidebar mh">
              <IconButton
                sx={{
                  position: "absolute",
                  top: "0px",
                  right: "5px",
                }}
                onClick={() => {
                  setShowSidebar(false);
                }}
              >
                <CloseIcon />
              </IconButton>
              <nav ref={menuRef} className="menu header-ch">
                <ul className="main-menu mobile">
                  {menuData.map((menuItem: any, index: any) => (
                    <li
                      key={index}
                      onMouseEnter={() => handleMouseEnter(menuItem)}
                      style={{
                        padding: "5px 0px",
                        background:
                          window.location.pathname === menuItem.path
                            ? "#e5e5e7"
                            : "transparent",
                      }}
                    >
                      {/* Conditional rendering for click vs link */}
                      {menuItem.path ? (
                        <Link
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                          to={menuItem.path}
                          onClick={(e) => {
                            setShowSidebar(false);
                            document
                              .querySelectorAll(".main-menu.mobile li")
                              .forEach((li) => {
                                li.classList.remove("active");
                              });
                            e.currentTarget.parentElement?.classList.add(
                              "active"
                            );
                          }}
                        >
                          {menuItem.name}
                        </Link>
                      ) : (
                        <span
                          style={{
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                          onClick={(e) => handleMobileClick(menuItem, e)}
                        >
                          {menuItem.name}
                        </span>
                      )}

                      {/* Show submenu based on hover or click */}
                      {menuItem.subLinks && openMenu === menuItem.name && (
                        <ul className="submenu">
                          {menuItem.subLinks.map(
                            (subLink: any, subIndex: any) => (
                              <li
                                key={subIndex}
                                style={{
                                  background:
                                    subLink.path === location.pathname
                                      ? "#555"
                                      : "",
                                }}
                              >
                                <Link
                                  to={subLink.path}
                                  onClick={handleSubLinkClick}
                                >
                                  {subLink.name}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </li>
                  ))}
                  <li
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: " 5px 10px",
                    }}
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
    </>
  );
}

export const NotFoundContainer = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Container;

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 500);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    let minutes: any = date.getMinutes();
    let seconds: any = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <p style={{ fontSize: "13px", padding: 0, margin: 0 }}>
      {formatTime(time)}
    </p>
  );
}
