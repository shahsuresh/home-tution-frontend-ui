import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { useNavigate } from "react-router-dom";
import TutionPostCard from "../components/TutionPostCard";

const TeacherDashboard = () => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  return (
    <Box className='flex flex-col items-center justify-center w-full gap-1'>
      {userRole === "teacher" && (
        <Box className='flex items-center justify-center mt-1'>
          <Button
            variant='contained'
            color='primary'
            size='medium'
            endIcon={<ImportContactsIcon />}
            onClick={() => {
              navigate("/add-tuition");
            }}
          >
            Add Tuition
          </Button>
        </Box>
      )}

      <Box className='flex flex-col items-center justify-center w-10/12 gap-1 bg-[#1976D2] '>
        <Typography variant='h5' className='text-white '>
          Lists of Tuitions, you have added
        </Typography>
        <TutionPostCard />
      </Box>
    </Box>
  );
};

export default TeacherDashboard;
