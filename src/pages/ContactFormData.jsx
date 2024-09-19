import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import $axios from "../lib/axios/axios.instance";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";

const ContactFormData = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  //#=========api hit to get all contact form data ===========

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-contact-form-data"],
    queryFn: async () => {
      return await $axios.get("/contact-form/data");
    },
  });
  //#=========api hit to update status of an item in contact form ===========

  const {
    isPending,
    error: updateError,
    mutate,
  } = useMutation({
    mutationKey: ["update-status-to-contacted"],
    mutationFn: async (id) => {
      return await $axios.put(`/contact-form/data/update/${id}`);
    },
    onSuccess: (res) => {
      console.log(res);
      dispatch(openSuccessSnackbar(res?.data?.message));
      queryClient.invalidateQueries("get-contact-form-data");
    },
  });

  //#=========api hit to delete an item in contact form(by _id) ===========
  const {
    isPending: isDeletePending,
    error: deleteError,
    mutate: deleteMutate,
  } = useMutation({
    mutationKey: ["delete-contact-form-data"],
    mutationFn: async (id) => {
      return await $axios.delete(`/contact-form/data/delete/${id}`);
    },
    onSuccess: (res) => {
      console.log(res.data.message);
      dispatch(openErrorSnackbar(res?.data?.message));
      queryClient.invalidateQueries("get-contact-form-data");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error));
    },
  });
  //?========================================================================
  if (isLoading || isPending || isDeletePending) return <LinearProgress />;
  if (error || updateError || deleteError)
    return <div>Error fetching data</div>;

  const formData = data?.data?.contactFormData;

  if (!formData) {
    return (
      <Typography variant='h4' className='text-center'>
        {data?.data?.message}
      </Typography>
    );
  }
  console.log(formData);
  return (
    <div className='p-4'>
      <TableContainer
        component={Paper}
        className='border-4 border-blue-700 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-blue-700'
      >
        <Table>
          <TableHead className='bg-blue-800 '>
            <TableRow sx={{ position: "sticky", top: 0 }}>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  color: "white",
                  position: "sticky",
                  top: 0,
                }}
              >
                S.No
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  color: "white",
                  position: "sticky",
                }}
              >
                Name
              </TableCell>
              <TableCell sx={{ fontSize: "1.4rem", color: "white" }}>
                Mobile No.
              </TableCell>
              <TableCell sx={{ fontSize: "1.4rem", color: "white" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontSize: "1.4rem", color: "white" }}>
                Subject
              </TableCell>
              <TableCell sx={{ fontSize: "1.4rem", color: "white" }}>
                Message
              </TableCell>
              <TableCell sx={{ fontSize: "1.4rem", color: "white" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontSize: "1.4rem", color: "white" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.map((row, index) => (
              <TableRow
                key={row._id}
                className='transition duration-300 hover:bg-blue-200'
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {row.firstName} {row.lastName}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {row.mobileNo}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>{row.email}</TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>{row.subject}</TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>{row.message}</TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                    color: row.status === "Pending" ? "red" : "green",
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label='update'
                    color='primary'
                    className='text-white'
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to update status?"
                        )
                      ) {
                        mutate(row._id);
                      }
                    }}
                    disabled={isPending}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    color='secondary'
                    className='text-white'
                    disabled={isDeletePending}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to Delete this item?"
                        )
                      ) {
                        deleteMutate(row._id);
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContactFormData;
