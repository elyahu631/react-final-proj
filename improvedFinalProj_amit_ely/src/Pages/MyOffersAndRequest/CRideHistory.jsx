import {
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HistoryContext } from "../../Context/HistoryContextProvider";
import DeleteIcon from "@mui/icons-material/Delete";

//PRidesHistory מגיע מ props
export default function CRideHistory(props) {
  //בקשות ונסיעות שלי
  let propsDateFormat = new Date(props.date);
  const navigate = useNavigate();

  const { DeFromRideRequistsContext, DeFromRideOffersContext } =
    useContext(HistoryContext);

  const navigateToRequestsOrOffers = () => {
    props.isOffer
      ? navigate("/join_requests", { state: { ...props } }) //אם במצב הצעות נסיעה
      : navigate("/join_offers", { state: { ...props } }); //אם במצב טרמפים
  };
  return (
    <Box
      sx={{ m: "1rem" }}
      style={{ boxShadow: " 0 1px 5px 0px" }}
      // onClick={navigateToRequestsOrOffers}
    >
      <Card>
        <CardContent
          style={{
            display: "flex",

            flexDirection: "row",
            padding: "10px",
          }}
        >
          <Tooltip
            title="Delete"
            placement="top"
            style={{ flex: 1 }}
            onClick={() =>
              props.isOffer
                ? DeFromRideOffersContext(props.id)
                : DeFromRideRequistsContext(props.id)
            }
          >
            <IconButton color="warning"> 
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <CardContent
            onClick={navigateToRequestsOrOffers}
            style={{
              display: "flex",
              flex: "6",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "10px",
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
                תאריך ושעה
              </span>
              <br />
              {propsDateFormat.getDate()}/{propsDateFormat.getMonth() + 1}/
              {propsDateFormat.getFullYear()}
              <br />
              {("0" + propsDateFormat.getHours()).slice(-2)}:
              {("0" + propsDateFormat.getMinutes()).slice(-2)}
              {/* {propsDateFormat.$D}/{propsDateFormat$M + 1}/{propsDateFormat.$y}
                        <br />
                        {propsDateFormat.$H}:{propsDateFormat.$m} */}
            </Typography>

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
              <br />מ - {props.from} <br /> ל - {props.to}
            </Typography>
            {props.isOffer && (
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ textAlign: "center" }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    textDecoration: "underline",
                  }}
                >
                  כמות
                </span>
                <br />
                {props.amount}
              </Typography>
            )}
          </CardContent>
        </CardContent>
      </Card>
    </Box>
  );
}
