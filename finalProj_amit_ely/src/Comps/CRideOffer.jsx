import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";

//props from PRideOffers
export default function CRideOffer(props) {
  let propsDateFormat = new Date(props.date); //למקרה שבא מהלוקאל , כי הוא מבטל את סוג האובייקט והופך אותה למחרוזת
  const [isFullInfoOpen, setIsFullInfoOpen] = useState(false);
  let contentToShow;

  if (!isFullInfoOpen) {
    //אם לא מצב מפורט
    contentToShow = (
      <Box sx={{ m: "0.5rem" }}>
        <Card style={{ boxShadow: " 0 1px 5px 0px #d1086b" }}>
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
              component="div"
              style={{ fontSize: "13px", fontWeight: "700" }}
            >
              מקומות
              <br /> פנויים: {props.maxAmount}
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
              {/* {props.date.$D}/{props.date$M + 1}/{props.date.$y}
                        <br />
                        {props.date.$H}:{props.date.$m} */}
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
              color="secondary"
              onClick={() => {
                props.SendRequest(props);
              }}
              size="small"
            >
              שלח בקשה
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
          border: "5px solid #d1086b",
          marginRight: "2%",
          marginBottom: "30px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              display: "flex",
              border: "2px solid #d1086b",
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
              border: "2px solid #d1086b",
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
            border: "2px solid #d1086b",
            flexDirection: "column",
            padding: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            נוסעים שהצטרפו {0}
            <Slider
              defaultValue={0}
              step={1}
              marks
              min={0}
              max={props.amount}
              disabled
              color="secondary"
            />
          </div>

          <Button
            onClick={() => {
              props.SendRequest(props);
            }}
            size="small"
            color="secondary"
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
