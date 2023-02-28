import { Box, Container, IconButton, Paper } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContextProvider";
import bg from "../images/bg_profile.png";
import EditIcon from "@mui/icons-material/Edit";
import { HistoryContext } from "../Context/HistoryContextProvider";

export default function PProfile() {
  const navigate = useNavigate();
  const { GetUserLoggedInAmountOfTremps, GetUserLoggedInAmountOfRides } =
    useContext(HistoryContext);

  const { userLoggedin } = useContext(LoginContext);
  if (!userLoggedin) {
    console.log("must log in first");
    return;
  }

  const SendToEdit = () => {
    navigate("/editprofile");
  };
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          minHeight: "75vh",
          color: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: "400px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <h2
            style={{
              marginTop: "30px",
              fontSize: "1rem",
              fontWeight: "700",
            }}
          >
            הפרופיל שלי
          </h2>
          <div
            style={{
              margin: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <img
              width={150}
              height={150}
              src={userLoggedin.userImage}
              alt="תמונה"
              style={{ border: "2px solid #f5f5f5", borderRadius: "50%" }}
            />
          </div>

          <IconButton
            style={{
              position: "absolute",
              top: "45px",
              left: "4px",
              color: "white",
            }}
            sx={{ border: 1 }}
            onClick={SendToEdit}
          >
            <EditIcon />
          </IconButton>

          <p style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {userLoggedin.firstName} {userLoggedin.lastName}
          </p>
        </div>

        <Container
          style={{
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "40vh",
          }}
        >
          <Paper elevation={6}>
            <Box
              style={{
                color: "whitesmoke",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              sx={{
                width: 160,
                height: 50,
                backgroundColor: "secondary.dark",
                "&:hover": {
                  backgroundColor: "secondary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              כמות הבקשות שלי: {GetUserLoggedInAmountOfTremps(userLoggedin)}
            </Box>
          </Paper>
          <Paper elevation={6}>
            <Box
              style={{
                color: "whitesmoke",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              sx={{
                width: 160,
                height: 50,
                backgroundColor: "primary.dark",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
           כמות ההצעות שלי: {GetUserLoggedInAmountOfRides(userLoggedin)}
            </Box>
          </Paper>
        </Container>
      </div>
    </>
  );
}
