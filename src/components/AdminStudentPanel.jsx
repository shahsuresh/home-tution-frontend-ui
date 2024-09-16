import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import $axios from "../lib/axios/axios.instance";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";

const AdminStudentPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  //?=====api hit to get all students tuitions requests===========
  const { isPending, isLoading, error, data } = useQuery({
    queryKey: ["get-all-student-tution-requests"],
    queryFn: async () => {
      return await $axios.post("/admin/profile/student-list");
    },
  });
  //*==============================================================

  //?=====api hit to delete  student data(By ID)===============

  const {
    isPending: isDeletePending,
    error: deleteError,
    mutate,
  } = useMutation({
    mutationKey: ["delete-student-data"],
    mutationFn: async (id) => {
      // console.log("DELETE STUDENT BY ID", id);
      return await $axios.delete(`/admin/profile/student/delete/${id}`);
    },
    onSuccess: (res) => {
      dispatch(openErrorSnackbar(res?.data?.message));
      queryClient.invalidateQueries("get-all-student-tution-requests");
      console.log(res?.data?.message);
      navigate("/admin-dashboard");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error.message));
      console.log(error.message, "Some error happened");
    },
  });

  //*==============================================================

  //?=====api hit to update student status to 'Completed'(By ID)========

  const {
    isPending: isUpdatePending,
    error: updateError,
    mutate: updateMutate,
  } = useMutation({
    mutationKey: ["update-student-status"],
    mutationFn: async (id) => {
      return await $axios.put(
        `/admin/profile/student-list/update-status/${id}`
      );
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      queryClient.invalidateQueries("get-all-student-tution-requests");
      navigate("/admin-dashboard");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error.message));
      console.log(error.message, "Some error happened");
    },
  });

  //*==============================================================

  // Handle loading state
  if (isPending || isLoading || isDeletePending || isUpdatePending) {
    return (
      <Box className='flex items-center justify-center min-h-full p-4'>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Handle error state
  if (error || deleteError || updateError) {
    return (
      <Box className='flex items-center justify-center min-h-full p-4 '>
        <Typography className='text-center text-red-600'>
          Error: {error.message}
        </Typography>
      </Box>
    );
  }
  const studentList = data?.data?.studentList;
  if (!studentList) {
    return (
      <div className='text-center'>
        <Typography variant='h4' color='primary'>
          No any Students found
        </Typography>
      </div>
    );
  }
  // console.log(studentList);

  return (
    <div className='relative max-h-full overflow-auto shadow-md sm:rounded-lg'>
      <h1 className='py-2 font-extrabold text-center text-blue-700'>
        Tuition Requests from Students
      </h1>
      <table className='w-full text-sm text-left text-blue-100 rtl:text-right dark:text-blue-100'>
        <thead className='text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white'>
          <tr>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-blue-700'>
              Student Name
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-blue-700'>
              Mobile
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-blue-700'>
              Email
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-blue-700'>
              Class
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-blue-700'>
              Subjects
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-blue-700'>
              City
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-blue-700'>
              Timing
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-blue-700'>
              Status
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-blue-700'>
              Action
            </th>
          </tr>
        </thead>
        {studentList.map((item, index) => {
          return (
            <tbody key={index}>
              <tr className='bg-blue-600 border-b border-blue-200 hover:bg-blue-500'>
                <th
                  scope='row'
                  className='sticky left-0 px-6 py-4 font-medium bg-blue-700 text-blue-50'
                >
                  {item.firstName} {item.lastName}
                </th>
                <td className='px-6 py-4'>{item.mobile}</td>
                <td className='px-6 py-4'>{item.email}</td>
                <td className='px-6 py-4'>{item.class}</td>
                <td className='px-6 py-4'>
                  {item.subjects.map((subject, index) => {
                    return (
                      <Chip
                        key={index}
                        label={subject}
                        variant='outlined'
                        sx={{
                          padding: "0.2rem",
                          margin: ".2rem",
                          color: "white",
                        }}
                      />
                    );
                  })}
                </td>
                <td className='px-6 py-4'>
                  {item.city} {item.area}
                </td>
                <td className='px-6 py-4'>{item.timing}</td>
                <td className='px-6 py-4'>
                  <span
                    style={{
                      color: item.status === "Pending" ? "wheat" : "limegreen",
                      fontSize: "1rem",
                    }}
                  >
                    {item.status}
                  </span>
                </td>
                <td className='flex flex-row gap-1 px-6 py-4'>
                  <Tooltip title='update Student status'>
                    <Button
                      variant='contained'
                      endIcon={
                        <ChangeCircleIcon size='large' fontSize='large' />
                      }
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to update status?"
                          )
                        ) {
                          updateMutate(item._id);
                        }
                      }}
                    >
                      Update Status
                    </Button>
                  </Tooltip>
                  <Tooltip title='Delete Student Data'>
                    <IconButton
                      aria-label='delete'
                      size='large'
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this item?"
                          )
                        ) {
                          mutate(item._id);
                        }
                      }}
                    >
                      <DeleteIcon fontSize='inherit' color='secondary' />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
              {/* More table rows */}
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default AdminStudentPanel;
