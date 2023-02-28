import React, { useContext, useState } from "react";
import { localUsersContext } from "../Context/LocalUsersContextProvider";
import { LoginContext } from "../Context/LoginContextProvider";
import "../Styles/ImageModal.css";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  SnackbarContent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import Snackbar from "@mui/material/Snackbar";

import Webcam from "react-webcam";

const phoneRegex = /^05[0-9]{8}$/; ////////////////////////
const nameRegex = /^[\u0590-\u05fe]{2,12}$/;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

const schema = Yup.object().shape({
  gender: Yup.string().required("חובה לבחור מגדר"),
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

const PEditProfile = (props) => {
  const [imgConfirmSign, setImgConfirmSign] = useState("  ✔");
  const { userLoggedin, SetLogUserIn } = useContext(LoginContext);
  const [userImage, setUserImage] = useState(userLoggedin.userImage);

  const [showModal, setShowModal] = useState(false);
  const [showcameraModal, setShowCameraModal] = useState(false);

  console.log(userLoggedin.userImage);
  const initialValues = {
    gender: userLoggedin.gender,
    firstName: userLoggedin.firstName,
    lastName: userLoggedin.lastName,
    phone: userLoggedin.phone,
    userImage: userLoggedin.userImage,
    email: userLoggedin.email,
    password: userLoggedin.password,
    passwordConfirm: userLoggedin.password,
  };

  //webcam
  const webcamRef = React.useRef(null);
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    initialValues.userImage = imageSrc;
    setUserImage(imageSrc);
  };

  const ChangeImageToUrlAndsetUserImage = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      let fReader = new FileReader();
      fReader.readAsDataURL(e.target.files[0]);
      fReader.onloadend = function (event) {
        initialValues.userImage = event.target.result;
        setUserImage(event.target.result);
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
    setShowModal((prev) => !prev);
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

  const { usersLocal, editUserInContext } = useContext(localUsersContext);

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // שליחת טופס ההרשמה
  function handleFormSubmit(e) {
    let newUser = {
      id: userLoggedin.id,
      email: e.email,
      phone: e.phone,
      gender: e.gender,
      firstName: e.firstName,
      lastName: e.lastName,
      password: e.password,
      userImage: userImage,
    };

    if (userLoggedin.phone !== e.phone) {
      let userPhoneExists = usersLocal.find((user) => user.phone === e.phone);
      if (userPhoneExists) {
        setMessage("המידע שעודכן שגוי");
        setColor("#cc0000");
        console.log(userPhoneExists);
        setState({
          open: true,
          ...{
            vertical: "bottom",
            horizontal: "center",
          },
        });
        return;
      }
    }
    if (userLoggedin.email !== e.email) {
      let userEmailExists = usersLocal.find((user) => user.email === e.email);
      if (userEmailExists) {
        setMessage("המידע שעודכן שגוי");
        setColor("#cc0000");
        handleClick({
          vertical: "bottom",
          horizontal: "center",
        });
        return;
      }
    }
    editUserInContext(newUser);
    SetLogUserIn(newUser);
    setMessage("הפורפיל עודכן");
    setColor("#00cc00");
    handleClick({
      vertical: "buttom",
      horizontal: "center",
    });
  }

  return (
    <Container sx={{ mt: 12, mb: 12 }}>
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
              backgroundColor: color,
              fontSize: "1.2rem",
              fontFamily: "Arial",
            }}
          />
        </div>
      </Snackbar>

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
                    עדכון פרופיל
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
                      <span style={{ color: "green" }}>{imgConfirmSign}</span>
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
                    variant="filled"
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
                    variant="filled"
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
                    variant="filled"
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
                    variant="filled"
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
                    variant="filled"
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
                    variant="filled"
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
                      sx={{ textDecoration: "underline" }}
                      variant="contained"
                      style={{
                        minWidth: "30vw",
                        minHeight: "5vh",
                        color: "white",
                        borderRadius: "5%",
                      }}
                    >
                      עדכן
                    </Button>
                  </Box>
                </Box>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </Container>
  );
};

export default PEditProfile;
