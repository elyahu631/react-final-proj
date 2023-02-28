import { Box, Button, Card, CardMedia } from "@mui/material";
import React, { useState } from "react";

//הצעות טרמפים לנבג שביקש
//props from CSuggestsTrempsList
export default function CSuggestsTremp(props) {
  const [borderColor, setBorderColor] = useState(props.borderColor);

  return (
    <Card
      style={{
        border: "1px solid " + borderColor,
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
      id={props.id}
    >
      <Box>
        {/* <h1>{props.id}</h1> */}

        <h5>סטטוס : {props.status}</h5>
        <h5>כמות : {props.amount}</h5>
        <Button
          color="green"
          variant="outlined"
          style={{marginLeft:"5px"}}
          onClick={() => {
            setBorderColor("green");
            props.OfferstatusAccepted(props);
          }}
        >
          אישור
        </Button>
        <Button
          color="error"
          variant="outlined"
          onClick={() => {
            if (props.OfferstatusDenied(props)) setBorderColor("red");
          }}
        >
          סירוב
        </Button>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "10px",
          flexDirection: "column",
        }}
      >
        <h6> {props.userOfferedTheRideFullName}</h6>
        <CardMedia
          component="img"
          alt=""
          image={props.userOfferedTheRideImg}
          height={80}
          border="1px solid black"
          style={{
            borderRadius: "50%",
            width: "80px",
          }}
        />
      </Box>
    </Card>
  );
}
