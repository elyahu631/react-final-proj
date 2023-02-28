import { Snackbar, SnackbarContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CRideOffer from "./CRideOffer";
import React, {  useContext, useState } from "react";
import { localUsersContext } from "../../Context/LocalUsersContextProvider";
import { LoginContext } from "../../Context/LoginContextProvider";


//send props to CRideOffers
export default function PRideOffers() {
  const { userLoggedin } = useContext(LoginContext);
  const { GetUserFromDB } = useContext(localUsersContext);

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });

  const { vertical, horizontal, open, message } = state;

  let localOffers = JSON.parse(localStorage.getItem("rideOffersContext")) || [];
  console.log(localOffers , " localOffers");
  const SendRequest = (offerObject) => {
    if (offerObject.amount < 1) {  // צריך לא להציג נסעיה זו 
      setState({
        open: true,message:"אין מקמות פנויים בנסיעה זו",
        ...{
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }

    let pastRequests =
      JSON.parse(localStorage.getItem("JoinRideRequests")) || [];
    let isAlreadySent = pastRequests.find(
      (request) =>
        request.userId === userLoggedin.id &&
        request.offerId === offerObject.id &&
        request.offerUserId === offerObject.userId
    );
    if (isAlreadySent) {
      setState({
        open: true, message:"הצטרפת כבר לנסיעה זו",
        ...{
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }

    let newRequest = {
      userId: userLoggedin.id,
      offerUserId: offerObject.userId,
      offerId: offerObject.id,
      id: pastRequests.length,
      requestStatus: 0,
      amount: 1,
    };

    let newRequests = [...pastRequests, newRequest];
    localStorage.setItem("JoinRideRequests", JSON.stringify(newRequests));
    //console.log(offerObject);
  };

  let offers = localOffers
    .filter((offer) =>offer.show && offer.userId !== userLoggedin.id && offer.amount !== 0)
    .map((offer) => {
      let currentUserOffers = GetUserFromDB(offer.userId);
      return (
        <CRideOffer
          id={offer.id}
          userId={offer.userId}
          fullName={currentUserOffers.fullName}
          date={offer.date}
          from={offer.from}
          to={offer.to}
          maxAmount={offer.amount}
          img={currentUserOffers.userImg}
          note={offer.note}
          gender={currentUserOffers.gender}
          key={offer.id}
          SendRequest={SendRequest}
        />
      );
    });

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Box style={{marginBottom:"80px"}}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SnackbarContent
            message={message}
            style={{
              backgroundColor: "#cc0000",
              fontSize: "1.2rem",
              fontFamily: "Arial",
            }}
          />
        </div>
      </Snackbar>
      <br />
      <Typography align="center" variant="h5" color={"secondary"} sx={{fontWeight: 'bold'}}>
        הצעות לנסיעה
      </Typography>
      <br />
      {offers}
    </Box>
  );
}
