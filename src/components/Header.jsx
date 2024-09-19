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
import { useNavigate } from "react-router-dom";

const pages = [
  { id: 1, name: "Home", path: "/home" },
  { id: 2, name: "Become a Tutor", path: "/login" },
  { id: 3, name: "Find a Tutor", path: "/contact-student" },
  { id: 4, name: "About", path: "/about" },
  { id: 5, name: "Contact", path: "/contactus-form" },
];
const settings = [
  { id: 1, name: "Profile" },
  { id: 2, name: "Dashboard" },
  { id: 3, name: "Contact Form Data" },
  { id: 4, name: "Logout" },
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
  //*====get userRole data from local Storage============
  const userRole = localStorage.getItem("role");
  const userFirstName = localStorage.getItem("firstName");
  const userLastName = localStorage.getItem("lastName");
  //?====filter settings array based on userRole=======================
  const filteredSettingsArray =
    userRole === "admin" ? settings : settings.filter((item) => item.id !== 3);
  // console.log(filteredSettingsArray);

  //?=====Function to handle onClick Event on user Setting Menu========
  const handleProfileSettingMenuClick = (item) => {
    // console.log(`You clicked on: ${item.name}`);

    if (item.name === "Logout") {
      // Clears localStorage when user clicks logout button
      localStorage.clear();
      navigate("/home");
      // if (userRole === "admin") {
      //   navigate("/home");
      // } else {
      //   // And redirect to login page
      //   navigate("/login");
      // }
    }

    if (item.name === "Dashboard") {
      userRole === "admin"
        ? navigate("/admin-dashboard")
        : navigate("/teacher-dashboard");
    }
    if (item.name === "Profile") {
      userRole === "admin"
        ? navigate("/admin-profile")
        : navigate("/teacher-profile");
    }
    if (item.name === "Contact Form Data") {
      userRole === "admin"
        ? navigate("/admin-profile/contact-form-data")
        : null;
    }
  };
  //*==================================================================

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
    <AppBar position='static' className='w-full px-4'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <a href='/home'>
            <img
              src='logo1.png'
              alt='logo'
              className='hidden w-16 h-auto mr-1 md:w-20 md:flex'
            />
          </a>

          <Typography
            variant='h4'
            noWrap
            component='a'
            href='/home'
            className='hidden mr-2 font-mono font-bold tracking-wider text-white md:flex'
          >
            Namaste Home Tuition
          </Typography>
          <Box className='flex-grow md:hidden'>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
              className='md:hidden'
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
              className='block md:hidden'
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.id}
                  onClick={() => {
                    navigate(page.path);
                  }}
                >
                  <Typography className='text-center '>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* //!==========Drawer Screen======================= */}
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          {/* <img
            src='logo1.png'
            alt='logo'
            className='w-10 h-auto mr-1 md:none sm:flex'
          /> */}
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/home'
            className='flex flex-grow font-mono text-sm font-bold text-white md:hidden md:text-lg'
          >
            Namaste Home Tuition
          </Typography>
          <Box className='flex-grow hidden px-1 md:flex'>
            {pages.map((page) => (
              <Button
                size='large'
                variant='outline'
                key={page.id}
                onClick={() => {
                  navigate(page.path);
                }}
                className='px-1 mx-3 text-white hover:bg-blue-700'
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {userRole === "teacher" || userRole === "admin" ? (
            <>
              <Box className='flex-grow-0'>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} className='p-0'>
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
                  {filteredSettingsArray.map((setting) => (
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
              <Box className='flex flex-col gap-0 pl-4'>
                <Typography className='text-xs text-white md:text-base'>
                  Hi,
                  {(userFirstName + " " + userLastName).toUpperCase()}
                </Typography>
                <Typography className='text-xs text-green-400 md:text-base'>
                  {greetByTime()}
                </Typography>
              </Box>
            </>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
