import { IconButton, MenuItem, Stack } from "@mui/material";
import React, { useContext, useState } from "react";
import EAppTitle from "../Elements/EAppTitle";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

import { Box } from "@mui/system";
import Menu from "@mui/material/Menu";

import { LoginContext } from "../Context/LoginContextProvider";
import { useNavigate } from "react-router-dom";

export default function CHeader() {
  const { LogUserOut } = useContext(LoginContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sendBack = () => {
    navigate(-1);
  };

  const sentToProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  const signOutAction = () => {
    navigate("/");
    LogUserOut();
  };

  return (
    <Box sx={{ bgcolor: "success.main" }}   style={{
      
      position: "fixed",
      top: "10px",
      right: "3%",
      zIndex: 999,
      backgroundColor: "#f5f5f5", 
      width:"94vw"        
    }}>
      <Stack direction="row" justifyContent="space-between" display="flex">
        <IconButton onClick={sendBack}
        >
          <ArrowForwardOutlinedIcon
            color="info"
            fontSize="large"
          />
        </IconButton>
        {EAppTitle}
        <Box>
          <IconButton onClick={handleClick}
          >
            <PersonIcon
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              color="info"
              fontSize="large"
            />
          </IconButton>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={sentToProfile}>פרופיל אישי</MenuItem>
            <MenuItem onClick={signOutAction}>צא מהחשבון</MenuItem>
          </Menu>
        </Box>
        {/* <PersonIcon color="primary" fontSize="large" /> */}
      </Stack>
    </Box>
  );
}
