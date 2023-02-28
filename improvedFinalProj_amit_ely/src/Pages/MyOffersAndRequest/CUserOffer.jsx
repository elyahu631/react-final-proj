import { Box, Button, Card, CardMedia } from "@mui/material";
import React, { useState } from "react";

//מוצג בתוך הצעות נהיגה כשלוחצים על נהיגה
//props from CUserOffersList
export default function CUserOffer(props) {
  const [borderColor, setBorderColor] = useState(props.borderColor);

  let statusName = ["","אושר","לא מאושר"]
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
        {/* <h2>שם מבקש: {props.userAskedToJoinFullName}</h2> */}
        <h5>סטטוס : {statusName[props.status]}</h5>
        <h5>כמות : {props.amount}</h5>
        <Button
          color="green"
          variant="outlined"
          style={{ marginLeft: "5px" }}
          onClick={() => {
            setBorderColor("green");
            props.RequestStatusAccepted(props);
          }}
        >
          אישור
        </Button>
        <Button
          color="error"
          variant="outlined"
          onClick={() => {
            if (props.RequestStatusDenied(props)) setBorderColor("red");
          }}
        >
          סירוב
        </Button>
      </Box>
      <Box style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "10px",
          flexDirection: "column",
        }}>
        <h6> {props.userAskedToJoinFullName}</h6>

        <CardMedia
          component="img"
          alt=""
          image={props.userAskedToJoinImg}
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
