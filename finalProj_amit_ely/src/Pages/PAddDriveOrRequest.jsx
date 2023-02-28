import { Box, Button, Container, Snackbar, SnackbarContent, Stack, Switch, TextField, Tooltip, Typography, } from "@mui/material";
import { LocalizationProvider, MobileDateTimePicker, } from "@mui/x-date-pickers";
import React, { useContext, useState } from "react";
import { useLocation /*useNavigate */ } from "react-router-dom";

import { LoginContext } from "../Context/LoginContextProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CGoogleMap from "../Comps/CGoogleMap";

import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { HistoryContext } from "../Context/HistoryContextProvider";

//state from PNavToAddReqOrOff
export default function PAddDriveOrRequest() {
  // const navigate = useNavigate();
  const { AddRideToHistory, AddTrempToHistory, UpdateNextRequistId, UpdateNextOfferId, nextRequistsId, nextOfferId } =useContext(HistoryContext);
  const { isLoaded } = useLoadScript({//trying to get the api key from the env
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],//שימוש בספרייה של המקומות של הapi
  });
  //const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { state } = useLocation();
  let driverOrNot = state === "driver";
  const { userLoggedin } = useContext(LoginContext);
  const [isDriver, setIsDriver] = useState(driverOrNot);
  const [date, setDate] = useState(new Date());
  const [fromPlace, setFromPlace] = useState("");
  const [toPlace, setToPlace] = useState("");
  const [amount, setAmount] = useState(1);
  const [note, setNote] = useState("");
  const optionsAuto = {
    types: ["geocode", "establishment"],//geocode ישובים וערים || establishment מקומות עסקיים
    componentRestrictions: { country: "IL" },//שיהיה רק ממדינת ישראל
  };

  const [state1, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state1;

  const handleClose = () => {
    setState({ ...state1, open: false });
  };

  if (!isLoaded) return <div>Loading...</div>;

  const addRide = () => {
    if (date === "" || fromPlace === "" || toPlace === "") {
      setState({
        open: true,
        ...{
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }

    let localOffers =
      JSON.parse(localStorage.getItem("rideOffersContext")) || [];
    let localRequests =
      JSON.parse(localStorage.getItem("rideRequistsContext")) || [];

    let newOffer;
    let newRequest;


    if (isDriver) {
      newOffer = {
        offerOrRequest: isDriver,
        id: nextOfferId,
        userId: userLoggedin.id,
        date: date,
        from: fromPlace,
        to: toPlace,
        amount: amount,
        note: note,
        passengers: [],
        show: true,
        isDeletedAllowed: true
      };
      UpdateNextOfferId(nextOfferId + 1)
      let newOffers = [...localOffers, newOffer];
      localStorage.setItem("rideOffersContext", JSON.stringify(newOffers));
      AddRideToHistory(newOffer);
      // navigate("/ride_history");
    } else {
      newRequest = {
        offerOrRequest: isDriver,
        id: nextRequistsId,
        userId: userLoggedin.id,
        date: date,
        from: fromPlace,
        to: toPlace,
        amount: amount,
        note: note,
        show: true,
        isDeletedAllowed: true
      };
      UpdateNextRequistId(nextRequistsId + 1)

      let newRequests = [...localRequests, newRequest];
      localStorage.setItem("rideRequistsContext", JSON.stringify(newRequests));
      AddTrempToHistory(newRequest);
      //console.log(newRequest);
      // navigate("/ride_history");
    }
  };

  return (
    <Container>
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
            message=" חייב למלא מוצא - יעד, תאריך ושעה"
            style={{
              backgroundColor: "#cc0000",
              fontSize: "1.2rem",
              fontFamily: "Arial",
            }}
          />
        </div>
      </Snackbar>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        variant="h4"
        component="h2"
      >
        <Typography color="secondary" sx={{ fontWeight: "bold" }}>
          טרמפיסט
        </Typography>
        <Switch
          onClick={(e) => {
            setIsDriver((prev) => !prev);
          }}
          checked={isDriver}
        />
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          נהג
        </Typography>
      </Box>

      <Box display={"grid"} gap={3}>
        <Box>
          <LocalizationProvider adapterLocale="en" dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <MobileDateTimePicker
                label="בחירת תאריך ושעה"
                value={date}
                minDate={new Date()}
                onChange={(newValue) => {
                  setDate(newValue.$d);//newValue זה אובייקט מסוג של MobileDateTimePicker שבתוכו יש לנו מאפיינים של כל הזמנים של התאריך 
                  //כאשר .$d מסמל את האובייקט של התאריך כפי שאנו מכירים 
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Box>

        <TextField
          id="outlined-number"
          label={isDriver ? "מקומות פנויים" : "כמות נוסעים"}
          required
          type="number"
          value={amount}
          onChange={(e) => {
            if (e.target.value >= 1 && e.target.value <= 5)
              setAmount(e.target.value);
          }}
          min="1"
          max="5"
          InputLabelProps={{
            shrink: true,
          }}
        />

        {!showModal && (
          <div>
            <button
              className="image_button"
              onClick={() => setShowModal((prev) => !prev)}
            >
              בחר מוצא
            </button>
          </div>
        )}
        {showModal && (
          <div className="modalPopup">
            <CGoogleMap />

            <div className="labelDiv">
              <Tooltip title="סגור חלון">
                <button
                  className="closeImgPopup"
                  onClick={() => setShowModal((prev) => !prev)}
                >
                  ✖
                </button>
              </Tooltip>
              <div className="modal_label_div">
                <div className="imgButtons"></div>
              </div>
            </div>
          </div>
        )}
        <Autocomplete options={optionsAuto}>
          <input
            type="text"
            placeholder="מוצא"
            name=""
            id=""
            onBlur={(e) => {
              setFromPlace(e.target.value);
            }}
          />
        </Autocomplete>
        <Autocomplete options={optionsAuto}>
          <input
            type="text"
            placeholder="יעד"
            name=""
            id=""
            onBlur={(e) => {
              setToPlace(e.target.value);
            }}
          />
        </Autocomplete>

        <TextField
          id="outlined-multiline-static"
          label="הערה"
          required
          multiline
          rows={5}
          placeholder="ניתן למלא הערות"
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
        {!isDriver && (
          <Button
            variant="contained"
            color="secondary"
            style={{
              minWidth: "20vw",
              minHeight: "5vh",
              borderRadius: "5%",
              color: "white",
              fontWeight: "500",
            }}
            onClick={addRide}
          >
            הוסף בקשה
          </Button>
        )}
        {isDriver && (
          <Button
            variant="contained"
            style={{
              minWidth: "20vw",
              minHeight: "5vh",
              borderRadius: "5%",
              color: "white",
              fontWeight: "500",
            }}
            onClick={addRide}
          >
            הוסף נסיעה
          </Button>
        )}
      </Box>
    </Container>
  );
}
