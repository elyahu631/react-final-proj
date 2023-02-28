import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PNavToAddReqOrOff() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
       style={{
        minWidth: "30vw",
        minHeight: "5vh",
        color: "white",
        borderRadius: "5%",
      }}
        sx={{ width: 200, padding: 1, margin: 2 }}
        variant="contained"
        color="primary"
        onClick={(e) => {
          navigate("/add_drive", { state: "driver" });
        }}
      >
        הוסף נסיעה
      </Button>
      <br />
      <hr />
      <br />
      <Button
        sx={{ width: 200, padding: 1, margin: 2 }}
        variant="contained"
        color="secondary"
        onClick={(e) => {
          navigate("/add_drive");
        }}
        style={{
          minWidth: "30vw",
          minHeight: "5vh",
          borderRadius: "5%",
        }}
      >
        בקש טרמפ
      </Button>
      <br />
      <hr />
      <br />
      <Button
        sx={{ width: 200, padding: 1, margin: 2 }}
        variant="contained"
        color="info"
        onClick={(e) => {
          navigate("/ride_history");
        }}
        style={{
          minWidth: "30vw",
          minHeight: "5vh",
          color: "white",
          borderRadius: "5%",
        }}
      >
        הבקשות \ נסיעות שלי
      </Button>
    </div>
  );
}
