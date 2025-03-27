import { FormEvent, useContext, useState } from "react";
import "../Style/Login.css";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "./Loading";
import { UserContext } from "../App";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { myAxios, setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    success: false,
    message: "",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (variables: { username: string; password: string }) => {
      return await myAxios.post(
        "/login",
        {
          username: variables.username,
          password: variables.password,
        },
        { withCredentials: true }
      );
    },
    onSuccess: (res) => {
      setUser(res.data.user);
      setErrors({
        username: false,
        password: false,
        success: true,
        message: res.data.message,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 800,
      }).then(() => {
        setUser(res.data.user);
        window.localStorage.setItem("tab", `0`);
        navigate(`/${process.env.REACT_APP_DEPARTMENT}/dashboard`);
      });
    },
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    mutate({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    });
  }

  return (
    <>
      {isPending && <Loading />}

      <div className="main-landing-page">
        <form className="content" onSubmit={onSubmit}>
          <img
            alt="Upward Insurance"
            src={process.env.REACT_APP_IMAGE_URL + "logo.png"}
            style={{ width: "120px", height: "auto", background: "white" }}
          />
          <h3 style={{ fontWeight: "400", marginBottom: "30px" }}>
            LOGIN TO UPWARD INSURANCE
          </h3>
          <div className="content-field">
            <div>
              <label htmlFor="username"> USERNAME</label>
              <input
                autoFocus={true}
                name="username"
                id="username"
                className={errors.username ? "error" : ""}
                onFocus={() =>
                  setErrors({
                    username: false,
                    password: false,
                    success: false,
                    message: "",
                  })
                }
              />
              {errors.username && (
                <p className="warning-text">
                  {errors.username && errors.message}
                </p>
              )}
            </div>
          </div>
          <div className="content-field" style={{ marginTop: "15px" }}>
            <div>
              <label htmlFor="password"> PASSWORD</label>
              <input
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                className={errors.password ? "error" : ""}
                onFocus={() =>
                  setErrors({
                    username: false,
                    password: false,
                    success: false,
                    message: "",
                  })
                }
              />
              {errors.password && (
                <p className="warning-text">{errors.message}</p>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "10px",
              marginTop: "10px",
            }}
          >
            <input
              name="showpass"
              id="showpass"
              type="checkbox"
              style={{ padding: "0", margin: 0 }}
              onChange={(e) => {
                setShowPassword(e.currentTarget?.checked);
              }}
            />
            <label
              htmlFor="showpass"
              style={{
                fontSize: "10px",
                cursor: "pointer",
                padding: "0",
                margin: 0,
              }}
            >
              SHOW PASSWORD
            </label>
          </div>
          <button>SUBMIT</button>
        </form>
      </div>
    </>
  );
}
export default Login;
