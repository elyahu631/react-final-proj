import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
// import "../Styles/Fonts.css";

export default function PHome() {
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
      <Paper elevation={6} style={{ maxWidth: "80%",marginBottom:"100px" }}>
        <Box
          style={{
            color: "whitesmoke",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          sx={{
            p: 2,
            backgroundColor: "info.dark",         
          }}
        >
          טרמפים יכולים להיות חוויה מרתקת ומספקת הן עבור הטרמפיסט והן לנהג. הוא
          מציע הזדמנות להתחבר לאנשים, לחסוך בעלויות הובלה ולקבל נקודות מבט חדשות
          על החיים.
        </Box>
      </Paper>
      <Button
        sx={{ width: 200, padding: 1, margin: 2 }}
        variant="contained"
        color="secondary"
        onClick={(e) => {
          navigate("/ride_offers");
        }}
        style={{
          minWidth: "30vw",
          minHeight: "5vh",
          borderRadius: "5%",
        }}
      >
        טרמפיסט
      </Button>

      <br />
      <hr />
      <br />
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
          navigate("/ride_requests", { state: "driver" });
        }}
      >
        נהג
      </Button>
    </div>
  );
}
