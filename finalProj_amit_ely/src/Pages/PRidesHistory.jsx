import { Box, Container, Switch, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import CRideHistory from "../Comps/CRideHistory";
import { HistoryContext } from "../Context/HistoryContextProvider";
import { LoginContext } from "../Context/LoginContextProvider";

//שולח props ל CRideHistory
export default function PRidesHistory() {
  const [isDriverHistory, setIsDriverHistory] = useState(false); //הוק שמתחיל בדף של הבקשות טרמפים 
  const { userLoggedin } = useContext(LoginContext);
  const { GetAllRidesOfUserLoggedIn, GetAllTrempsOfUserLoggedIn } =
    useContext(HistoryContext);
  let userHistory;
  let color = "";

  let title = isDriverHistory ? "הצעות נסיעה של"  : "הבקשות של"//אם בדף של ההצעות נסיעה מציג הצעות נסיעה של ואם בטרמפים מראה הבקשות של
  if (isDriverHistory) {
    userHistory = GetAllRidesOfUserLoggedIn(userLoggedin);
    color = "#d1086b";    
  } else {
    userHistory = GetAllTrempsOfUserLoggedIn(userLoggedin);
    color = "#666688";
  }
  let userHistoryElements = userHistory.map((ride) => (
    <CRideHistory
      id={ride.id}
      firstName={ride.firstName}
      lastName={ride.lastName}
      date={ride.date}
      from={ride.from}
      to={ride.to}
      key={ride.id}
      isOffer={isDriverHistory}
      // color={color}
      amount={ride.amount}
    />
  ));
  return (
    <Container style={{  padding: "0px" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        variant="h4"
        component="h2"
      >
        <Typography sx={{ fontWeight: "bold" }} color="secondary">
          טרמפים
        </Typography>
        <Switch
          onClick={(e) => {
            setIsDriverHistory((prev) => !prev);
          }}
          checked={isDriverHistory}
        />
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          הצעות נסיעה
        </Typography>
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "5px",
          fontWeight: "bold",
          textDecoration:"underline",
          color:{color}
        }}
      >
      {title} {userLoggedin.firstName} {userLoggedin.lastName}
      </div>
      {userHistoryElements}
    </Container>
  );
}
