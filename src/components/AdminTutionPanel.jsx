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
const AdminTutionPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  //?=====api hit to get all tuitions offers by teachers===========
  const { isPending, isLoading, error, data } = useQuery({
    queryKey: ["get-all-tution-requests-from-teachers"],
    queryFn: async () => {
      return await $axios.post("/admin/profile/tution/list");
    },
  });
  //*==============================================================

  //?=====api hit to delete  tuition data(By ID)===============

  const {
    isPending: isDeletePending,
    error: deleteError,
    mutate,
  } = useMutation({
    mutationKey: ["delete-tuition-data-by-admin"],
    mutationFn: async (id) => {
      console.log("DELETE TUITION BY ID", id);
      return await $axios.delete(`/admin/profile/tution/delete/${id}`);
    },
    onSuccess: (res) => {
      dispatch(openErrorSnackbar(res?.data?.message));
      queryClient.invalidateQueries("get-all-tution-requests-from-teachers");
      // console.log(res?.data?.message);
      navigate("/admin-dashboard");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.message));
      console.log(error?.message, "Some error happened");
    },
  });

  //*==============================================================

  //?=====api hit to update tuition status to 'Completed'(By ID)========

  const {
    isPending: isUpdatePending,
    error: updateError,
    mutate: updateMutate,
  } = useMutation({
    mutationKey: ["update-tuition-status"],
    mutationFn: async (id) => {
      return await $axios.put(`/admin/profile/tution/update/${id}`);
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      queryClient.invalidateQueries("get-all-tution-requests-from-teachers");
      navigate("/admin-dashboard");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.message));
      console.log(error?.message, "Some error happened");
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
  console.log("tution data", data?.data?.tuitionList);
  const tutionList = data?.data?.tuitionList;
  if (!tutionList) {
    return (
      <div className='text-center'>
        <Typography variant='h4' color='primary'>
          No any Tuitions found
        </Typography>
      </div>
    );
  }
  return (
    <div className='relative max-h-full overflow-auto shadow-md sm:rounded-lg'>
      <h1 className='py-2 font-extrabold text-center text-blue-700'>
        Tuition offers from Teachers
      </h1>
      <table className='w-full text-sm text-left text-blue-100 rtl:text-right dark:text-blue-100'>
        <thead className='text-xs text-white uppercase bg-green-700 border-b border-blue-400 dark:text-white'>
          <tr>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-green-700'>
              Teacher Name
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-green-700'>
              Tuition Name
            </th>

            <th scope='col' className='sticky top-0 px-6 py-3 bg-green-700'>
              for Class
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-green-700'>
              Subjects
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-green-700'>
              Price
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-green-700'>
              Price Type
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-green-700'>
              Status
            </th>
            <th scope='col' className='sticky top-0 px-6 py-3 bg-green-700'>
              Action
            </th>
          </tr>
        </thead>
        {tutionList.map((item, index) => {
          return (
            <tbody key={index}>
              <tr className='bg-blue-600 border-b border-blue-200 hover:bg-blue-500'>
                <th
                  scope='row'
                  className='sticky left-0 px-6 py-4 font-medium bg-green-800 text-blue-50'
                >
                  {item.teacherName}
                </th>
                <td className='px-6 py-4'>{item.name}</td>
                <td className='px-6 py-4'>{item.forClass}</td>

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
                <td className='px-6 py-4'>{item.price}</td>
                <td className='px-6 py-4'>{item.priceType}</td>

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
                  <Tooltip title='update tuition status'>
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
                  <Tooltip title='Delete Tuition Data'>
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

export default AdminTutionPanel;
