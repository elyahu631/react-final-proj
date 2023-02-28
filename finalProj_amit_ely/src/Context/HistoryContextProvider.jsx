import React, { createContext, useEffect, useState } from "react";
export const HistoryContext = createContext();

export default function HistoryContextProvider(props) {
  const [rides, setRides] = useState(
    JSON.parse(localStorage.getItem("rideOffersContext")) || []
  );
  const [idRidesHistory, setIdRidesHistory] = useState(
    JSON.parse(localStorage.getItem("idRidesHistory")) || parseInt(0)
  );
  const [tremps, setTremps] = useState(
    JSON.parse(localStorage.getItem("rideRequistsContext")) || []
  );
  const [nextOfferId, setNextOfferId] = useState(
    JSON.parse(localStorage.getItem("nextOfferId")) || parseInt(0)
  );
  const [nextRequistsId, setNextRequistsId] = useState(
    JSON.parse(localStorage.getItem("nextRequistsId")) || parseInt(0)
  );

  const UpdateNextOfferId = (nextId) => {
    setNextOfferId(nextId)
    localStorage.setItem("nextOfferId", JSON.stringify(nextId));
  }
  const UpdateNextRequistId = (nextId) => {
    setNextRequistsId(nextId)
    localStorage.setItem("nextRequistsId", JSON.stringify(nextId));
  }
  const GetUserLoggedInAmountOfTremps = (userLoggedin) => {
    let getAllTrempsOfUserLoggedIn = GetAllTrempsOfUserLoggedIn(userLoggedin)
    return getAllTrempsOfUserLoggedIn.length;
  }


  const GetAllTrempsOfUserLoggedIn = (userLoggedin) => {
    if (!userLoggedin) return [];
    let pastRequists = JSON.parse(localStorage.getItem("rideRequistsContext"));
    if (!pastRequists) return []
    let trempsArr = pastRequists
      .filter((tremp) => tremp.userId === userLoggedin.id)
      .map((tremp) => {
        tremp.firstName = userLoggedin.firstName;
        tremp.lastName = userLoggedin.lastName;
        return tremp;
      });

    return trempsArr;
  };
  const GetUserLoggedInAmountOfRides = (userLoggedin) => {
    let getAllRidesOfUserLoggedIn = GetAllRidesOfUserLoggedIn(userLoggedin)
    return getAllRidesOfUserLoggedIn.length;
  }


  const GetAllRidesOfUserLoggedIn = (userLoggedin) => {
    if (!userLoggedin) return [];
    let pastOffers = JSON.parse(localStorage.getItem("rideOffersContext"));
    if (!pastOffers) return []
    let RidesArr = pastOffers
      .filter((ride) => ride.userId === userLoggedin.id)
      .map((ride) => {
        ride.firstName = userLoggedin.firstName;
        ride.lastName = userLoggedin.lastName;
        return ride;
      });
    return RidesArr || [];
  };

  const AddTrempToHistory = (newTremp) => {
    let trempsObj = { ...newTremp };
    let pastTremps = tremps;
    let pastRides = rides;
    setTremps([...pastTremps, trempsObj]);
    newTremp.id = idRidesHistory;
    let newHistoryTremps = [...pastTremps, newTremp];
    setIdRidesHistory((prev) => prev + 1);
    localStorage.setItem("RidesHistoryContext", JSON.stringify([...pastRides, ...newHistoryTremps]));
    localStorage.setItem("idRidesHistory", idRidesHistory + 1);
  };

  const AddRideToHistory = (newRide) => {
    let rideObj = { ...newRide };
    let pastRides = rides;
    let pastTremps = tremps;
    setRides([...pastRides, rideObj]);//עדכון הצעות חדשות אחרי הוספת החדש
    newRide.id = idRidesHistory;
    let newHistoryRides = [...pastRides, newRide];//הצעות חדשות אחרי הוספת החדש
    let newRidesAndTremps = [...newHistoryRides, ...pastTremps];//מערך של  היסטוריית הבקשות וההצעות יחד
    localStorage.setItem("RidesHistoryContext", JSON.stringify(newRidesAndTremps));
    localStorage.setItem("idRidesHistory", idRidesHistory + 1);
    setIdRidesHistory((prev) => prev + 1);
  };

  const DelRideFromHistory = (oldRidesId) => {
    let newRides = rides.filter((ride) => ride.id !== oldRidesId);
    setRides(newRides);
    localStorage.setItem("RidesHistoryContext", JSON.stringify(newRides));
  };



  const DeFromRideOffersContext = (idToRemove) => {
    let newRides = rides.filter((ride) => ride.id !== idToRemove);
    setRides(newRides);
    localStorage.setItem("rideOffersContext", JSON.stringify(newRides));
  };

  const DeFromRideRequistsContext = (idToRemove) => {

    let newRides = tremps.filter((ride) => ride.id !== idToRemove);
    setTremps(newRides);
    localStorage.setItem("rideRequistsContext", JSON.stringify(newRides));
  };




  useEffect(() => {
    const updateLocalStorage = () => {
      localStorage.setItem("RidesHistoryContext", JSON.stringify(rides));
    };
    window.addEventListener("beforeunload", updateLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", updateLocalStorage);
    };
  }, [rides]);

  return (
    <HistoryContext.Provider
      value={{
        idRidesHistory,
        rides,
        GetAllRidesOfUserLoggedIn,GetUserLoggedInAmountOfRides,
        tremps,
        AddRideToHistory,
        GetAllTrempsOfUserLoggedIn,GetUserLoggedInAmountOfTremps,
        AddTrempToHistory,
        DelRideFromHistory,
        setTremps, setRides,
        UpdateNextRequistId, UpdateNextOfferId,
        nextRequistsId, nextOfferId,
        DeFromRideRequistsContext, DeFromRideOffersContext


      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
}
