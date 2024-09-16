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

const AdminTeacherPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  //?=====api hit to get all teachers details===========
  const { isPending, isLoading, error, data } = useQuery({
    queryKey: ["get-all-teacher-details-admin"],
    queryFn: async () => {
      return await $axios.get("/admin/profile/teacher-list");
    },
  });
  //*==============================================================

  //?=====api hit to delete  teacher data(By ID)===============

  const {
    isPending: isDeletePending,
    error: deleteError,
    mutate,
  } = useMutation({
    mutationKey: ["delete-teacher-data-by-admin"],
    mutationFn: async (id) => {
      console.log("DELETE TEACHER BY ID", id);
      return await $axios.delete(`/admin/profile/teacher/delete/${id}`);
    },
    onSuccess: (res) => {
      dispatch(openErrorSnackbar(res?.data?.message));
      queryClient.invalidateQueries("get-all-teacher-details-admin");
      // console.log(res?.data?.message);
      navigate("/admin-dashboard");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.message));
      console.log(error?.message, "Some error happened");
    },
  });

  //*==============================================================

  // Handle loading state
  if (isPending || isLoading || isDeletePending) {
    return (
      <Box className='flex items-center justify-center min-h-full p-4'>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Handle error state
  if (error || deleteError) {
    return (
      <Box className='flex items-center justify-center min-h-full p-4 '>
        <Typography className='text-center text-red-600'>
          Error: {error?.message}
        </Typography>
      </Box>
    );
  }

  const teacherList = data?.data?.teacherList;
  console.log("Teacher Data", teacherList);
  if (!teacherList) {
    return (
      <div className='text-center'>
        <Typography variant='h4' color='primary'>
          No any Teachers found
        </Typography>
      </div>
    );
  }
  return (
    <div className='relative max-h-full overflow-auto shadow-md sm:rounded-lg'>
      <h1 className='py-2 font-extrabold text-center text-blue-700'>
        Teachers Profile
      </h1>
      <table className='w-full text-sm text-left text-blue-100 rtl:text-right dark:text-blue-100'>
        <thead className='text-xs text-white uppercase bg-green-700 border-b border-blue-400 dark:text-white'>
          <tr>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-orange-700'>
              Teacher Name
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-orange-700'>
              Mobile
            </th>

            <th scope='col' className='sticky top-0 px-6 py-3 bg-orange-700'>
              Email
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-orange-700'>
              Subjects
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-orange-700'>
              level
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-orange-700'>
              Degree
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-orange-700'>
              Address
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-orange-700'>
              Action
            </th>
          </tr>
        </thead>
        {teacherList.map((item, index) => {
          return (
            <tbody key={index}>
              <tr className='bg-blue-600 border-b border-blue-200 hover:bg-blue-500'>
                <th
                  scope='row'
                  className='sticky left-0 px-6 py-4 font-medium bg-orange-800 text-blue-50'
                >
                  {item.firstName} {item.lastName}
                </th>
                <td className='px-6 py-4'>{item.mobile}</td>
                <td className='px-6 py-4'>{item.email}</td>

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
                <td className='px-6 py-4'>{item.level}</td>
                <td className='px-6 py-4'>{item.degree}</td>
                <td className='px-6 py-4'>
                  {item.city} {item.area}
                </td>

                <td className='flex flex-row gap-1 px-6 py-4'>
                  <Tooltip title='Delete Teacher Data'>
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
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default AdminTeacherPanel;
