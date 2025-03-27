import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Loading } from "./Loading";
import { AccountCircle } from "@mui/icons-material";
import "../Style/header.css";

function Container({ showheader = true }: any) {
  const department = useRef(process.env.REACT_APP_DEPARTMENT);
  const menuData = [
    {
      name: "Claim",
      path: `/${department.current}/dashboard`,
    },
    {
      name: "Reimbursement",
      path: `/${department.current}/dashboard/imbursement`,
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

  // const { refetch, isLoading } = useQuery({
  //   queryKey: "logout",
  //   queryFn: async () =>
  //     wait(1200).then(async () => await Logout(myAxios, user)),
  //   enabled: false,
  //   onSuccess: (res) => {
  //     if (res.data.success) {
  //       setOpenUserMenu(false);
  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title: res.data.message,
  //         showConfirmButton: false,
  //         timer: 800,
  //       }).then(() => {
  //         setUser(null);
  //         navigate(`/${process.env.REACT_APP_DEPARTMENT}/login`);
  //       });
  //     }
  //   },
  // });

  // const handleLogout = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to logout!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, logout it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .get("http://localhost:7624/close-report", {
  //           withCredentials: true,
  //         })
  //         .then((res) => {
  //           if (!res.data.success) {
  //             alert(res.data.message);
  //           }
  //         })
  //         .catch(console.log);

  //       setTimeout(() => {
  //         refetch();
  //       }, 500);
  //     }
  //   });
  // };

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
      {showheader && (
        <header>
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
                        // handleLogout();
                      }}
                    >
                      Logout
                    </span>
                  </li>
                </ul>
              )}
            </div>
            <Clock />
          </div>
        </header>
      )}
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
}
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
