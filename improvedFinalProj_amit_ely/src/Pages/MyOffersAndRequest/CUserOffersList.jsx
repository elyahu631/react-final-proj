import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { localUsersContext } from "../../Context/LocalUsersContextProvider";
import { LoginContext } from "../../Context/LoginContextProvider";
import CUserOffer from "./CUserOffer";
import "../../Styles/Colors.css";

import { HistoryContext } from "../../Context/HistoryContextProvider";

//מוצג בתוך הצעות נהיגה כשלוחצים על נהיגה
//state from CRideHistory

export default function CUserOffersList() {
  const { GetUserFromDB } = useContext(localUsersContext);
  const { userLoggedin } = useContext(LoginContext);
  const [requests, setRequestsToJoin] = useState(
    JSON.parse(localStorage.getItem("JoinRideRequests")) || []
  );
  const { state } = useLocation();
  const { AddTrempToHistory ,nextRequistsId, UpdateNextRequistId } = useContext(HistoryContext);
  let stateDateFormat = new Date(state.date);
  
  const RequestStatusAccepted = (requestParam) => {
    let pastRequests =
      JSON.parse(localStorage.getItem("JoinRideRequests")) || [];
    let request = pastRequests.find(
      (request) => request.id === requestParam.id
    );
    if (request.requestStatus === 1) return;
    let localOffers =
      JSON.parse(localStorage.getItem("rideOffersContext")) || [];
    let offerToUpdateAmount = localOffers.find(
      (offer) => offer.id === request.offerId
    );
    if (offerToUpdateAmount.amount === 0) return;
    offerToUpdateAmount.amount -= 1;
    request.requestStatus = 1;
    localStorage.setItem("JoinRideRequests", JSON.stringify(pastRequests));
    setRequestsToJoin(pastRequests);
    let localRequests =
      JSON.parse(localStorage.getItem("rideRequistsContext")) || [];
    // הורדת הכמות בהתאם לבקשות הטרמפ
    localStorage.setItem("rideOffersContext", JSON.stringify(localOffers));
    let newRequest = {
      offerOrRequest: false,
      id: nextRequistsId,
      userId: request.userId,
      date: state.date,
      from: state.from,
      to: state.to,
      amount: requestParam.amount,
      note: "",
      show: false,
    };
    let newRequests = [...localRequests, newRequest];
    localStorage.setItem("rideRequistsContext", JSON.stringify(newRequests));
    UpdateNextRequistId(nextRequistsId + 1)
    AddTrempToHistory(newRequest);
    // setTremps(localOffers);
  };

  const RequestStatusDenied = (requestParam) => {
    let pastRequests =
      JSON.parse(localStorage.getItem("JoinRideRequests")) || [];
    let requestObj = pastRequests.find(
      (request) => request.id === requestParam.id
    );
    if (requestObj.requestStatus !== 0) return false;
    requestObj.requestStatus = 2;
    localStorage.setItem("JoinRideRequests", JSON.stringify(pastRequests));
    setRequestsToJoin(pastRequests);
    return true;
  };

  // const AcceptHitchhiker=()=>{
  //     JSON.parse(localStorage.getItem("rideOffersContext")) || [];
  // }

  let requestObjects = requests
    .filter(
      (request) =>
        request.offerUserId === userLoggedin.id && request.offerId === state.id
    )
    .map((request) => {
      let userAskedToJoin = GetUserFromDB(request.userId);
      let borderColor;
      if (request.requestStatus === 1) {
        borderColor = "green";
      } else if (request.requestStatus === 2) {
        borderColor = "red";
      } else {
        borderColor = "gray";
      }

      return (
        <CUserOffer
          id={request.id}
          userAskedToJoinFullName={userAskedToJoin.fullName}
          userAskedToJoinImg={userAskedToJoin.userImg}
          status={request.requestStatus}
          amount={request.amount}
          RequestStatusDenied={RequestStatusDenied}
          RequestStatusAccepted={RequestStatusAccepted}
          borderColor={borderColor}
          key={request.id}
        />
      );
    });

  return (
    <Box style={{ padding: "30px 0" }}>
      <h2
        style={{
          textAlign: "center",
          paddingBottom: "30px",
          textDecoration: "underline",
        }}
        className="c-orenge"
      >
        בקשות הצטרפות
      </h2>
      <Card
        style={{
          boxShadow: " 0 1px 5px 0px #ff8000",
          padding: "0",
          justifyContent: "space-between",
        }}
      >
        <CardContent
          style={{
            padding: "5px 0px",
          }}
        >
          <h6
            style={{
              fontSize: "16px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            ההצעה שלי
          </h6>
          <CardContent
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "5px 10px",
            }}
          >
            {/* <Typography gutterBottom variant="h5" component="div">
            {state.firstName} {state.lastName}
          </Typography> */}

            <Typography variant="body2" color="text.secondary">
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  textDecoration: "underline",
                }}
              >
                מסלול הנסיעה
              </span>{" "}
              <br />מ - {state.from}
              <br /> ל - {state.to}
            </Typography>
            <Typography color="text.secondary" style={{paddingTop:4, textAlign: "center", fontSize: "12px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  textDecoration: "underline",
                }}
              >
                מקומות פנויים
              </span>{" "}
              <br />
              {state.amount}
            </Typography>
            <Typography color="text.secondary">
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  textDecoration: "underline",
                }}
              >
                תאריך ושעה
              </span>
              <br />
              {stateDateFormat.getDate()}/{stateDateFormat.getMonth() + 1}/
              {stateDateFormat.getFullYear()}
              <br />
              {("0" + stateDateFormat.getHours()).slice(-2)}:
              {("0" + stateDateFormat.getMinutes()).slice(-2)}
            </Typography>
          </CardContent>
        </CardContent>
      </Card>
      <br />
      <Box style={{ display: "grid", gap: 20 }}>{requestObjects}</Box>
    </Box>
  );
}
