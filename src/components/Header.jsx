import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";

const pages = [
  { id: 1, name: "Home", path: "/home" },
  { id: 2, name: "Tutor Login", path: "/login" },
  { id: 3, name: "Request Tuition", path: "/contact-student" },
  { id: 4, name: "About", path: "/about" },
];
const settings = [
  { id: 1, name: "Profile" },
  { id: 2, name: "Account" },
  { id: 3, name: "Logout" },
];
//?========greeting message function=============
const greetByTime = () => {
  const timeNow = new Date().getHours();

  let greeting;
  if (timeNow < 12) {
    greeting = "Good Morning";
  } else if (timeNow >= 12 && timeNow < 17) {
    greeting = "Good Afternoon";
  } else if (timeNow >= 17 && timeNow < 20) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Evening";
  }

  return greeting;
};
//*==============================================
const Header = () => {
  //?=====Function to handle onClick Event on user Setting Menu========
  const handleProfileSettingMenuClick = (item) => {
    // console.log(`You clicked on: ${item.name}`);

    if (item.name === "Logout") {
      // Clears localStorage when user clicks logout button
      localStorage.clear();
      // And redirect to login page
      navigate("/login");
    }
    if (item.name === "Profile") {
      navigate("/teacher-profile");
      console.log("Profile Menu");
    }
    if (item.name === "Account") {
      console.log("Account Menu");
    }
  };
  //*==================================================================
  const userRole = localStorage.getItem("role");
  const userFirstName = localStorage.getItem("firstName");
  const userLastName = localStorage.getItem("lastName");

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    //!==========FullScreen Appbar=======================
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <img
            src='logo1.png'
            alt='logo'
            style={{
              width: "70px",
              height: "auto",
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          />
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant='h4'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Namaste Home Tuition
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.id}
                  onClick={() => {
                    navigate(page.path);
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* //!==========Drawer Screen======================= */}
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          {/* <img
            src='logo1.png'
            alt='logo'
            style={{
              width: "70px",
              height: "auto",
              display: { xs: "none", md: "flex", lg: "none" },
              mr: 1,
            }}
          ></img> */}
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: { xs: "11px", md: "18px" },
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Namaste Home Tuition
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                size='large'
                key={page.id}
                onClick={() => {
                  navigate(page.path);
                }}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  "&:hover": { backgroundColor: "#116bc5" },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {userRole === "teacher" && (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt='User' src='user.png' />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                      <Typography
                        sx={{ textAlign: "center" }}
                        onClick={
                          () => handleProfileSettingMenuClick(setting)
                          // setting.name === "Logout"
                          //   ? () => {
                          //       // Clears localStorage when user clicks logout button
                          //       localStorage.clear();
                          //       // And redirect to login page
                          //       navigate("/login");
                          //       console.log(setting.name);
                          //     }
                          //   : null
                        }
                      >
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box className='flex flex-col gap-0'>
                <Typography className='pl-2'>
                  Hi,
                  {(userFirstName + " " + userLastName).toUpperCase()}
                </Typography>
                <Typography className='pl-5 text-[#0f0]'>
                  {greetByTime()}
                </Typography>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
