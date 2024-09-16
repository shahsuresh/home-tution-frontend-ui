import { Box } from "@mui/material";
import React from "react";
import AdminStudentPanel from "../components/AdminStudentPanel";
import AdminTutionPanel from "../components/AdminTutionPanel";
import AdminTeacherPanel from "../components/AdminTeacherPanel";

const AdminDashboard = () => {
  return (
    <Box className='flex flex-col w-full h-full gap-2 p-2 m-2 '>
      {/* //!=================Row1==================== */}
      <Box className='flex flex-row gap-2 '>
        {/* //!=================Row1_column1================ */}

        <Box className='w-1/2  h-[500px] rounded-md shadow-[0_3px_10px_rgb(0,0,200,0.5)]'>
          <AdminStudentPanel />
        </Box>
        {/* //!=================Row1_column2================ */}

        <Box className='w-1/2 h-[500px] rounded-md shadow-[0_3px_10px_rgb(0,200,0,0.5)]'>
          <AdminTutionPanel />
        </Box>
      </Box>
      {/* //!====================Row2=================== */}

      <Box className=' h-auto overflow-auto py-6 px-4 mb-6 shadow-[0_3px_10px_rgb(200,0,0,0.5)]'>
        <AdminTeacherPanel />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
