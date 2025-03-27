import { useNavigate } from "react-router-dom";
import "../Style/page-not-found.css";
import { useContext } from "react";
import { UserContext } from "../App";

function NotFound() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          alt="Upward Insurance"
          src={process.env.REACT_APP_IMAGE_URL + "logo.png"}
          style={{ width: "160px", height: "160px" }}
        />
        <h2 style={{ fontSize: "3em" }}>This page isn't available</h2>
        <p style={{ fontSize: "20px" }}>
          The link you followed may be broken, or the page may have been
          removed.
        </p>
        <button
          onClick={() => {
            if (user) {
              navigate(`/${process.env.REACT_APP_DEPARTMENT}/dashboard`);
            } else {
              navigate(`/${process.env.REACT_APP_DEPARTMENT}/login`);
            }
          }}
        >
          {user ? `GO BACK TO DASHBOARD` : `GO BACK TO LOGIN`}
        </button>
      </div>
    </main>
  );
}

export default NotFound;
