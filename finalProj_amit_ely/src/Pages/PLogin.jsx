import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { localUsersContext } from "../Context/LocalUsersContextProvider";
import { LoginContext } from "../Context/LoginContextProvider";
import { Formik } from "formik";
import EAppOpennig from "../Elements/EAppOpennig"
import * as Yup from "yup"; //ספרייה שעובדת עם הספרייה פורמיק לצורך בדיקת נתונים מהמשתמש ותגובה בהתאם
import {
  Box,
  Button,
  Card,
  Container,
  Paper,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography,
} from "@mui/material";

// Creating schema
//הגדרת תנאים לנתונים שאנו רוצים לקבל ומתן הודעות בהתאם
const schema = Yup.object().shape({
  email: Yup.string().required("שדה אימייל חובה").email("פורמט אימייל לא תקין"),
  password: Yup.string()
    .required("שדה סיסמה חובה")
});

const initialValues = {
  email: "",
  password: "",
};

const PLogin = () => {
  const { SetLogUserIn } = useContext(LoginContext);

  const { usersLocal } = useContext(localUsersContext);

  const navigate = useNavigate();

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };



  const handleFormSubmit = (values) => {
    let loginAccount = usersLocal.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (!loginAccount) {
      setState({
        open: true,
        ...{
          vertical: "top",
          horizontal: "center",
        },
      });
      return; //
    }
    SetLogUserIn(loginAccount);
    console.log("logged in", loginAccount);
    navigate("/home");
  };






  return (
    <Container sx={{ mt: 12 ,bgcolor: 'primary.main' }}>
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
            message="סיסמה או מייל שגויים"
            style={{ backgroundColor: "#cc0000" ,fontSize: '1.2rem', fontFamily: 'Arial'}}
          />
        </div>
      </Snackbar>
      <Paper elevation={3}  >
        <Card variant="outlined" sx={{ p: 3 }} >
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
                  <form noValidate onSubmit={handleSubmit} >
                    <Box display="grid" gap="1.5vh" >
                      <Typography
                        color="primary"                        
                        display="flex"
                        justifyContent="center"
                        variant="h4"
                        component="h2"
                        sx={{textDecoration: 'underline'}}
                      >
                        התחברות
                      </Typography>

                      <TextField
                        size="small"
                        label="אימייל"
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="הכנס מייל"
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
                      <Box display="flex" justifyContent="center" mt="4px">
                        <Button
                          type="submit"                          
                          variant="contained"
                          sx={{ fontWeight: 'bold'}}
                          style={{
                            minWidth: "30vw",
                            minHeight: "5vh",
                            borderRadius: "5%",
                            color: "white",
                          }}
                        >
                          התחבר
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </div>
              </div>
            )}
          </Formik>
          <br />
          <div>
            <br />
           אין לך חשבון  
          <Button
            size="large"
            variant="text"
            sx={{ fontWeight: 'bold'}}
            onClick={(e) => {
              navigate("/signup");
            }}
          >
            הירשם
          </Button>
          </div>
        </Card>
      </Paper>
    </Container>
  );
};

export default PLogin;
