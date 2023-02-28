import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";

//props from PRideRequests
export default function CRideRequest(props) {
  console.log(props, " props");
  // (e)=>navigate('/ride_info',{state:{userrideinfo}})
  let propsDateFormat = new Date(props.date);
  const [isFullInfoOpen, setIsFullInfoOpen] = useState(false);
  let contentToShow;
  if (!isFullInfoOpen) {
    //אם לא במצב מפורט
    contentToShow = (
      <Box sx={{ m: "0.5rem" }}>
        <Card style={{ boxShadow: " 0 1px 5px 0px #ff8000" }}>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "5px 10px",
              fontWeight: "800",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontSize: "13px", fontWeight: "700" }}
            >
              {props.fullName}
              <br />
              {props.gender}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              style={{ fontSize: "13px", fontWeight: "700" }}
            >
              כמות
              <br /> נוסעים: {props.amount}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              style={{ fontSize: "13px", fontWeight: "700" }}
            >
              {propsDateFormat.getDate()}/{propsDateFormat.getMonth() + 1}/
              {propsDateFormat.getFullYear()}
              <br />
              {("0" + propsDateFormat.getHours()).slice(-2)}:
              {("0" + propsDateFormat.getMinutes()).slice(-2)}
              {/* {propsDateFormat.$D}/{propsDateFormat$M + 1}/{propsDateFormat.$y}
                <br />
                {propsDateFormat.$H}:{propsDateFormat.$m} */}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              style={{ fontSize: "10px", fontWeight: "700" }}
            >
              מ{props.from}
              <br />ל{props.to}
            </Typography>
          </CardContent>
          <CardActions
            style={{
              padding: "2px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => {
                props.SendOffer(props);
              }}
              size="small"
            >
              הצע הסעה
            </Button>
            <IconButton
              color="warning"
              onClick={() => {
                setIsFullInfoOpen(true);
              }}
            >
              <ArrowCircleDownOutlinedIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    );
  } else {
    //אם במצב מפורט
    contentToShow = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: "96%",
          marginRight: "2%",
          border: "5px solid #ff8000",
          marginBottom: "30px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              display: "flex",
              border: "2px solid #ff8000",
              flexDirection: "column",
              gap: "10px",
              width: "50%",
              padding: "10px",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <span style={{ fontWeight: "700", textDecoration: "underline" }}>
                {" "}
                מיקום
              </span>
              <br />מ{props.from} <br /> ל{props.to}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span style={{ fontWeight: "700", textDecoration: "underline" }}>
                זמן
              </span>
              <br />
              {propsDateFormat.getDate()}/{propsDateFormat.getMonth() + 1}/
              {propsDateFormat.getFullYear()}
              <br />
              {("0" + propsDateFormat.getHours()).slice(-2)}:
              {("0" + propsDateFormat.getMinutes()).slice(-2)}
              <br />
            </Typography>
            <div
              style={{
                minHeight: "10vh",
              }}
            >
              <span style={{ fontWeight: "600", textDecoration: "underline" }}>
                פרטים
              </span>{" "}
              <br />
              {props.note}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              border: "2px solid #ff8000",
              flexDirection: "column",
              gap: "15px",
              width: "50%",
              padding: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {props.fullName}
            </Typography>
            <CardMedia
              component="img"
              alt=""
              height={100}
              image={props.img}
              style={{ borderRadius: "50%", width: "100px" }}
            />
            <Typography gutterBottom variant="h5" component="div">
              מגדר: {props.gender}
            </Typography>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            border: "2px solid #ff8000",
            flexDirection: "column",
            padding: "10px",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Button
            style={{ color: "white" }}
            onClick={() => {
              props.SendOffer(props);
            }}
            size="small"
            color="primary"
            variant="contained"
          >
            בקשו להצטרף לנסיעה
          </Button>
        </div>
        <IconButton
          color="warning"
          style={{ position: "absolute", bottom: "2px", left: "2px" }}
          onClick={() => {
            setIsFullInfoOpen(false);
          }}
        >
          <ArrowCircleUpOutlinedIcon />
        </IconButton>
      </div>
    );
  }

  return contentToShow;
}
