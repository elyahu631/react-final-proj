import { Snackbar, SnackbarContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import CRideRequest from "./CRideRequest";
import { localUsersContext } from "../../Context/LocalUsersContextProvider";
import { LoginContext } from "../../Context/LoginContextProvider";

//send props to CRideRequest
export default function PRideRequests() {
  const { userLoggedin } = useContext(LoginContext);
  const { usersLocal } = useContext(localUsersContext);


  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, open, message } = state;




  const SendOffer = (offerObject) => {
    let pastOffers = JSON.parse(localStorage.getItem("JoinRideOffers")) || [];
    let isAlreadySent = pastOffers.find(
      (request) =>
        request.userId === userLoggedin.id &&
        request.offerId === offerObject.id &&
        request.offerUserId === offerObject.userId
    );
    if (isAlreadySent) {
      setState({
        open: true,message:"שלחת כבר הצעה לטראמפ הזה",
        ...{
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
      
    }
    let newOffer = {
      userId: userLoggedin.id,
      offerUserId: offerObject.userId,
      offerId: offerObject.id,
      id: pastOffers.length,
      requestStatus: 0,
      amount: offerObject.amount,
    };
    let newOffers = [...pastOffers, newOffer];
    localStorage.setItem("JoinRideOffers", JSON.stringify(newOffers));
    //console.log(offerObject);
  };

  const GetUserFromDB = (id) => {//gets the user that uploaded the request
    let user = usersLocal.find((user) => user.id === id);
    let userInfo = {
      userId: id,
      fullName: user.firstName + " " + user.lastName,
      rideImage: user.userImage,
      gender:user.gender
    };
    return userInfo;
  };

  let localRequests =
    JSON.parse(localStorage.getItem("rideRequistsContext")) || [];

  let requists = localRequests
    .filter((request) => request.show && request.userId !== userLoggedin.id)
    .map((request) => {
      let currentUserRequest = GetUserFromDB(request.userId);
      return (
        <CRideRequest
          id={request.id}
          userId={request.userId}
          fullName={currentUserRequest.fullName}
          date={request.date}
          from={request.from}
          to={request.to}
          amount={request.amount}
          img={currentUserRequest.rideImage}
          note={request.note}
          gender={currentUserRequest.gender}
          key={request.id}
          SendOffer={SendOffer}
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
      <Typography align="center" variant="h5" color={"primary"} sx={{fontWeight: 'bold'}}>
        בקשות לטרמפים
      </Typography>
      <br />
      {requists}
    </Box>
  );
}
