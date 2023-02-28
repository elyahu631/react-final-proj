import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { localUsersContext } from "../Context/LocalUsersContextProvider";
import { LoginContext } from "../Context/LoginContextProvider";
import CSuggestsTremp from "./CSuggestsTremp";
import { HistoryContext } from "../Context/HistoryContextProvider";
import "../Styles/Colors.css";

//מוצג בתוך הצעות להסעה של בקשה לטרמפ
export default function CSuggestsTrempsList() {
  const { GetUserFromDB } = useContext(localUsersContext);
  const { userLoggedin } = useContext(LoginContext);

  const [offers, setOffersToJoin] = useState(
    JSON.parse(localStorage.getItem("JoinRideOffers")) || []
  );
  const { state } = useLocation();
  let stateDateFormat = new Date(state.date);

  const { AddRideToHistory ,UpdateNextOfferId ,nextOfferId} = useContext(HistoryContext);

  const OfferStatusAccepted = (offerParam) => {
    console.log(offerParam, "offerParam");
    console.log(state, "state");
    let pastOffers = JSON.parse(localStorage.getItem("JoinRideOffers")) || [];
    let offerToUpdate = pastOffers.find((offer) => offer.id === offerParam.id);
    if (offerToUpdate.requestStatus === 1) return;
    offerToUpdate.requestStatus = 1;
    localStorage.setItem("JoinRideOffers", JSON.stringify(pastOffers));
    setOffersToJoin(pastOffers);
    let localOffers =
      JSON.parse(localStorage.getItem("rideOffersContext")) || [];
    let newOffer = {
      offerOrRequest: true,
      id: nextOfferId, 
      userId: offerParam.userOfferedId,
      date: state.date,
      from: state.from,
      to: state.to,
      amount: offerParam.amount,
      note: "",
      passengers: [],
      show: false,
    };
    let newOffers = [...localOffers, newOffer];
    localStorage.setItem("rideOffersContext", JSON.stringify(newOffers));
    UpdateNextOfferId(nextOfferId + 1)
    AddRideToHistory(newOffer);
    // setRides(localOffers);
    // localStorage
    //   .setItem("rideRequistsContext", JSON.stringify(newOffers))
    //   .find((Requist) => Requist.id === offerParam.id);
    // AddRideToHistory(newOffer);
    // return;
  };
  const OfferStatusDenied = (offerParam) => {
    let pastOffers = JSON.parse(localStorage.getItem("JoinRideOffers")) || [];
    let removeOffer = pastOffers.find((offer) => offer.id === offerParam.id);
    let offerObj = pastOffers.find((offer) => offer.id === offerParam.id);
    if (offerObj.requestStatus !== 0) return false;
    removeOffer.requestStatus = 2;
    localStorage.setItem("JoinRideOffers", JSON.stringify(pastOffers));
    setOffersToJoin(pastOffers);
    return true;
  };

  let offerObjects = offers
    .filter(
      (offer) =>
        offer.offerUserId === userLoggedin.id && offer.offerId === state.id
    )
    .map((offer) => {
      let userOfferedTheRide = GetUserFromDB(offer.userId);
      let borderColor;
      if (offer.requestStatus === 1) {
        borderColor = "green";
      } else if (offer.requestStatus === 2) {
        borderColor = "red";
      } else {
        borderColor = "gray";
      }

      return (
        <CSuggestsTremp
          id={offer.id}
          userOfferedTheRideFullName={userOfferedTheRide.fullName}
          userOfferedTheRideImg={userOfferedTheRide.userImg}
          status={offer.requestStatus}
          amount={offer.amount}
          OfferstatusDenied={OfferStatusDenied}
          OfferstatusAccepted={OfferStatusAccepted}
          borderColor={borderColor}
          key={offer.id}
          userOfferedId={offer.userId}
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
        className="c-purple"
      >
        הצעות להצטרפות
      </h2>
      <Card
        style={{
          boxShadow: " 0 1px 5px 0px #d1086b",
          padding: "0",
          justifyContent: "space-between",
        }}
      >
        <CardContent
          style={{
            padding: "5px 10px",          
          }}
        >
          <h6
            style={{
              fontSize: "16px",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            הבקשה שלי
          </h6>          
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              padding: "5px 10px",
            }}
          >
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
              <br />מ - {state.from} <br /> ל - {state.to}
            </Typography>

            <Typography  color="text.secondary">
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
              <br />
            </Typography>
          </CardContent>
        </CardContent>
      </Card>
      <br />
      <Box style={{ display: "grid", gap: 20 }}>{offerObjects}</Box>
    </Box>
  );
}
