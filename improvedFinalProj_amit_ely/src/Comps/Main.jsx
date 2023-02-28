import React, { useContext } from "react";

import { Link, Route, Routes } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";

import "../Styles/BottomNavigation.css";

import PEditProfile from "../Pages/PEditProfile";
import PHome from "../Pages/PHome";
import PLogin from "../Pages/PLogin";
import PProfile from "../Pages/PProfile";
import PSignUp from "../Pages/PSignUp";

import PNavToAddReqOrOff from "../Pages/PNavToAddReqOrOff";
import { LoginContext } from "../Context/LoginContextProvider";
import { localUsersContext } from "../Context/LocalUsersContextProvider";
import PAddDrive from "../Pages/PAddDriveOrRequest";
import CHeader from "./CHeader";


import CHintNavigation from "./CHintNavigation";
import EDivLine from "../Elements/EDivLine";
import PRideOffers from "../Pages/rideOffers/PRideOffers";
import PRideRequests from "../Pages/rideRequest/PRideRequests";
import PRidesHistory from "../Pages/MyOffersAndRequest/PRidesHistory";
import CUserOffersList from "../Pages/MyOffersAndRequest/CUserOffersList";
import CSuggestsTrempsList from "../Pages/MyOffersAndRequest/CSuggestsTrempsList";

const Main = () => {
  const { userLoggedin } = useContext(LoginContext);
  const { setUsersLocal } = useContext(localUsersContext);

  return (
    <div style={{ direction: "rtl", marginTop: 15 }}>
      {userLoggedin && <CHeader />}
      <div style={{ marginBottom: "70px" }}></div>

      <Routes>
        <Route path="/home" element={<PHome />} />
        <Route path="/" element={<PLogin />} />
        <Route path="/signup" element={<PSignUp />} />
        <Route path="/profile" element={<PProfile />} />
        <Route path="/editprofile" element={<PEditProfile />} />
        <Route path="/ride_offers" element={<PRideOffers />} />
        <Route path="/ride_requests" element={<PRideRequests />} />
        <Route path="/add_request_offer" element={<PNavToAddReqOrOff />} />
        <Route path="/add_drive" element={<PAddDrive />} />
        <Route path="/ride_history" element={<PRidesHistory />} />

        {/* <Route path="/ride_info" element={<CRideInfo />} /> */}
        <Route path="/join_requests" element={<CUserOffersList />} />
        <Route path="/join_offers" element={<CSuggestsTrempsList />} />
      </Routes>
      <div style={{ marginBottom: "100px" }}></div>

      {userLoggedin && (
        <div
          sx={{ bgcolor: "success.main" }}
          className="w-100"
          style={{
            display: "flex",
            justifyContent: "space-around",
            position: "fixed",
            bottom: 0,
            right: 0,
            zIndex: 999,
            backgroundColor: "#f5f5f5",
            boxShadow: " 10px 10px 20px 2px black",
          }}
        >
          {/* <Link to={"/"}>דף בית</Link> */}
          <Link to={"/home"} className="link-style">
            <HomeOutlinedIcon fontSize="large" />
            <CHintNavigation hint="בית" />
          </Link>
          {EDivLine}
          <Link to={"/ride_offers"} className="link-style">
            <EmojiPeopleOutlinedIcon color="secondary" fontSize="large" />
            <CHintNavigation hint="טרמפיסט" color="#d1086b" />
          </Link>
          {EDivLine}
          <Link to={"/add_request_offer"} className="link-style">
            <AddOutlinedIcon fontSize="large" />
            <CHintNavigation hint="הוסף נסיעה/" hint2="בקשה" />
          </Link>
          {EDivLine}
          <Link to={"/ride_requests"} className="link-style">
            <DirectionsCarFilledOutlinedIcon color="primary" fontSize="large" />
            <CHintNavigation hint="נהג" color="#ff8000" />
          </Link>
          {EDivLine}
          <Link to={"/ride_history"} className="link-style">
            <HistoryOutlinedIcon fontSize="large" />
            <CHintNavigation hint="בקשות/" hint2="נסיעות שלי" />
          </Link>
        </div>
      )}

      <button
        style={{ display: "none" }}
        onClick={() => {
          setUsersLocal([]);
        }}
      >
        מחק context
      </button>
    </div>
  );
};

export default Main;
