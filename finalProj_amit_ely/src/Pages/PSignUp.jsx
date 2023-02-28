import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { localUsersContext } from "../Context/LocalUsersContextProvider";
import EAppOpennig from "../Elements/EAppOpennig";
import "../Styles/ImageModal.css";
//npm install formik --save
import { Formik } from "formik";//ספרייה לבניית טפסים ,עוזרת בניהול, אימות, והגשה שלהם
import * as Yup from "yup";//ספרייה שעובדת עם הספרייה פורמיק לצורך בדיקת נתונים מהמשתמש ותגובה בהתאם

import { Box, Button, Card, Container, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, SnackbarContent, TextField, Tooltip, Typography, } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import Webcam from "react-webcam";

const phoneRegex = /^05[0-9]{8}$/; ////////////////////////
const nameRegex = /^[\u0590-\u05fe]{2,12}$/;

//הגדרת תנאים לנתונים שאנו רוצים לקבל ומתן הודעות בהתאם
const schema = Yup.object()//יצירת אובייקט לבדיקה נתונים שניתן להשתמש בו כדי לאמת ולהמיר נתונים בצורה עקבית ותצוגתית
  .shape({//שיטה שדורשת צורה ספציפית לנתונים שאנו מקבלים
    gender: Yup.string()
      .required("חובה לבחור מגדר"),
    firstName: Yup.string()
      .trim()
      .required("שדה שם פרטי חובה")
      .matches(nameRegex, "שם פרטי לא תקין"),
    lastName: Yup.string()
      .trim()
      .required("שדה שם משפחה חובה")
      .matches(nameRegex, "שם משפחה לא תקין"),
    phone: Yup.string()
      .trim()
      .required("שדה פלאפון חובה")
      .matches(phoneRegex, "מספר פלאפון לא תקין"),
    email: Yup.string().required("שדה אימייל חובה").email("פורמט אימייל לא תקין"),
    password: Yup.string()
      .required("שדה סיסמה חובה")
      .min(2, "סיסמה חייבת להיות לפחות 8 תווים"),
    passwordConfirm: Yup.string()
      .required("שדה אימות סיסמה חובה")
      .oneOf([Yup.ref("password"), null], "אימות הסיסמה לא תואם"),
  });

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

const initialValues = {
  gender: "",
  firstName: "",
  lastName: "",
  phone: "",
  userImage: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const PSignUp = () => {
  const navigate = useNavigate();
  const [imgConfirmSign, setImgConfirmSign] = useState("  ❌");
  const [userImage, setUserImage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showcameraModal, setShowCameraModal] = useState(false);

  const { usersLocal, addUserToContext, idCounter } = useContext(localUsersContext);

  //webcam
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();//הולך למצלמה לפי הרפרנס ועושה סקרין שוט
    initialValues.userImage = imageSrc;//שומר את התמונה בשביל הבדיקות yup
    setUserImage(imageSrc);//מעדכן את התמונה בשביל להציג אותה למשתמש
    setImgConfirmSign("  ✔");

  };

  const ChangeImageToUrlAndsetUserImage = (e) => {
    //console.log(e.target.files[0]);
    let fileSelected = e.target.files[0];//תופס את התמונה שבחרנו
    if (fileSelected) {//אם הוא בחר
      let fReader = new FileReader();//יוצר אובייקט מסוג פיילרידר
      fReader.readAsDataURL(fileSelected);//מתרגם את הכתובת לurl
      fReader.onloadend = function (event) {
        initialValues.userImage = event.target.result;//שומר את התמונה בשביל הבדיקות yup
        setUserImage(event.target.result);//מעדכן את התמונה בשביל להציג אותה למשתמש
        setImgConfirmSign("  ✔");
      };
    }
    e.target.value = null;
  };

  const setCameraModalStatus = (event) => {
    event.preventDefault();
    setShowCameraModal((prev) => !prev);
  };

  const setModalStatus = (event) => {
    event.preventDefault();
    setShowModal(prev => !prev);
    setShowCameraModal(false);
  };

  const uploadImg = (e) => {
    if (initialValues.userImage !== "") {
      setImgConfirmSign("  ✔");
    }
    setModalStatus(e);
  };

  const deleteImg = (e) => {
    if (initialValues.userImage === "") {
      setModalStatus(e);
    }
    e.preventDefault();
    initialValues.userImage = "";
    setUserImage("");
    setImgConfirmSign("  ❌");
  };


  const [state, setState] = useState({//snakebar
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, open, message } = state;
  const handleClick = (newState) => {
    setState({ open: true, ...newState });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };



  // שליחת טופס ההרשמה
  function handleFormSubmit(e) {
    console.log(userImage, "userImage");
    if (userImage === "") {
      setState({
        open: true,
        message: "הוסף תמונה",
        ...{
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    };//אם המתשמש לא בחר בתמונה
    let newUser = {
      id: idCounter,
      email: e.email,
      phone: e.phone,
      gender: e.gender,
      firstName: e.firstName,
      lastName: e.lastName,
      password: e.password,
      userImage: userImage,
    };

    let userPhoneExists = usersLocal.find((user) => user.phone === e.phone);
    if (userPhoneExists) {
      console.log(userPhoneExists);
      setState({
        open: true,
        message: "פרטי הרשמה שגויים",
        ...{
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }
    let userEmailExists = usersLocal.find((user) => user.email === e.email);
    if (userEmailExists) {
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
      return;
    }
    addUserToContext(newUser);
    navigate("/");
  }

  return (
    <Container sx={{ mt: 12, mb: 12, bgcolor: "primary.main" }}>
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
            style={{ backgroundColor: "#cc0000", fontSize: '1.2rem', fontFamily: 'Arial' }}
          />
        </div>
      </Snackbar>
      <Paper elevation={3}>
        <Card variant="outlined" sx={{ p: 3 }}>
          {EAppOpennig}
          <Formik
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <div className="login">
                <div className="form">
                  <form noValidate onSubmit={handleSubmit}>
                    <Box display="grid" gap="1vh">
                      <Typography
                        color="primary"
                        display="flex"
                        justifyContent="center"
                        variant="h4"
                        component="h2"
                        sx={{ textDecoration: "underline" }}
                      >
                        הרשמה
                      </Typography>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">מגדר</FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          name="gender"
                          style={{ display: "initial" }}
                          onChange={handleChange}
                          value={values.gender}
                          id="gender"
                        >
                          <FormControlLabel
                            value="גבר"
                            control={<Radio />}
                            label="גבר"
                          />
                          <FormControlLabel
                            value="נקבה"
                            control={<Radio />}
                            label="נקבה"
                          />
                          <FormControlLabel
                            value="אחר"
                            control={<Radio />}
                            label="אחר"
                          />
                        </RadioGroup>
                      </FormControl>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">
                          תמונת פרופיל{" "}
                          <span style={{ color: "green" }}>
                            {imgConfirmSign}
                          </span>
                        </FormLabel>
                      </FormControl>
                      <div>
                        <TextField
                          style={{ position: "relative", display: "none" }}
                          type="file"
                          id="user_image"
                          accept="image/*"
                          onChange={(event) => {
                            ChangeImageToUrlAndsetUserImage(event);
                          }}
                        />

                        {!showModal && (
                          <div>
                            <button
                              className="image_button"
                              onClick={(event) => setModalStatus(event)}
                            >
                              הוסף תמונה
                            </button>
                          </div>
                        )}
                        {showModal && (
                          <div className="modalPopup">
                            <div className="labelDiv">
                              <Tooltip title="סגור חלון">
                                <button
                                  className="closeImgPopup"
                                  onClick={(event) => setModalStatus(event)}
                                >
                                  ✖
                                </button>
                              </Tooltip>
                              <div className="modal_label_div">
                                <label
                                  style={{
                                    backgroundImage: `url(${userImage})`,
                                  }}
                                  className="modal_label"
                                  htmlFor="user_image"
                                >
                                  <div>
                                    <div>
                                      {showcameraModal && (
                                        <Webcam
                                          className="modal_label"
                                          audio={false}
                                          height={200}
                                          ref={webcamRef}
                                          screenshotFormat="image/jpeg"
                                          width={220}
                                          videoConstraints={videoConstraints}
                                          screenshotQuality={1}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </label>

                                <div className="imgButtons">
                                  <button onClick={(event) => uploadImg(event)}>
                                    אשר תמונה
                                  </button>

                                  {!showcameraModal ? (
                                    <button
                                      className="image_button"
                                      onClick={(event) => {
                                        setCameraModalStatus(event);
                                      }}
                                    >
                                      צלם תמונה
                                    </button>
                                  ) : (
                                    <button
                                      className="image_button"
                                      onClick={(event) => {
                                        capture(event);
                                        setCameraModalStatus(event);
                                      }}
                                    >
                                      צלם
                                    </button>
                                  )}

                                  <button
                                    onClick={(event) => {
                                      deleteImg(event);
                                    }}
                                  >
                                    מחק תמונה
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* s */}
                      <TextField
                        size="small"
                        label="פלאפון"
                        type="phone"
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        placeholder="הזן מספר פלאפון"
                        id="phone"
                        error={!!errors.phone && !!touched.phone}
                        helperText={touched.phone && errors.phone}
                      />{" "}
                      <TextField
                        size="small"
                        label="שם פרטי"
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        placeholder="הזן שם פרטי"
                        id="firstName"
                        error={!!errors.firstName && !!touched.firstName}
                        helperText={touched.firstName && errors.firstName}
                      />{" "}
                      <TextField
                        size="small"
                        label="שם משפחה"
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        placeholder="הזן שם משפחה"
                        id="lastName"
                        error={!!errors.lastName && !!touched.lastName}
                        helperText={touched.lastName && errors.lastName}
                      />
                      <TextField
                        size="small"
                        label="אימייל"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="הכנס מייל"
                        id="email"
                        error={!!errors.email && !!touched.email}
                        helperText={touched.email && errors.email}
                      />
                      <TextField
                        size="small"
                        label="סיסמה"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="הכנס סיסמה"
                        className="form-control"
                        error={!!errors.password && !!touched.password}
                        helperText={touched.password && errors.password}
                      />
                      <TextField
                        size="small"
                        label="אימות סיסמה"
                        type="password"
                        name="passwordConfirm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.passwordConfirm}
                        placeholder="אמת סיסמה"
                        className="form-control"
                        error={
                          !!errors.passwordConfirm && !!touched.passwordConfirm
                        }
                        helperText={
                          touched.passwordConfirm && errors.passwordConfirm
                        }
                      />
                      <Box display="flex" justifyContent="center" mt="4px">
                        <Button
                          size="big"
                          type="submit"
                          variant="contained"
                          style={{
                            minWidth: "30vw",
                            minHeight: "5vh",
                            borderRadius: "5%",
                            color: "white",
                            fontWeight: "500",
                          }}
                        >
                          הירשם
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </div>
              </div>
            )}
          </Formik>
          <div>
            <br />
            יש לך כבר חשבון{" "}
            <Button
              size="large"
              variant="text"
              sx={{ fontWeight: "bold" }}
              onClick={(e) => {
                navigate("/");
              }}
            >
              התחבר
            </Button>
          </div>
        </Card>
      </Paper>
    </Container>
  );
};

export default PSignUp;
