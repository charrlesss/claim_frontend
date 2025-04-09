import { CircularProgress, Box, Typography } from "@mui/material";

export const Loading = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: "red",
          zIndex: "88",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          zIndex: "100",
          background: "white",
          width: "auto",
          height: "auto",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          boxShadow: "3px 6px 32px -7px rgba(0,0,0,0.75)",
          display: "flex",
          columnGap: "10px",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 15px",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
          }}
        >
          <CircularProgress color="primary" />
          <span
          className="loading-text-percentage"
            style={{
              position: "absolute",
              textAlign: "center",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            id="loading-percentage"
          ></span>
        </div>
        <span className="loading-text" style={{ fontSize: "13px", fontWeight: "500" }}>
          Please Wait...
        </span>
      </div>
      <style>
        {`
          @media (max-width: 768px) {
           .loading-text{
              font-size:11px !important;
            }
          .loading-text-percentage{
              font-size:11px !important;
            }

          }
        `}
      </style>
    </>
  );
};
