import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";

const TutionPostCard = () => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/tution-details/${id}`);
  };

  //?=== hit get teacher posts api =======
  const { isPending, isLoading, data, error } = useQuery({
    queryKey: ["get-tution-posts"],
    queryFn: async () => {
      return await $axios.post("/tution/posts", {
        page: 1,
        limit: 10,
      });
    },
  });
  if (isLoading) {
    return <CircularProgress size={60} />;
  }
  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }
  // Handle case when data is undefined or null
  if (!data || data.length === 0) {
    return <Typography>No data available</Typography>;
  }
  const posts = data?.data?.posts;
  console.log(posts);
  console.log("Posts in PostCard", posts);
  // const rows = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     subjects: "Math",
  //     class: "john@example.com",
  //     price: 12000,
  //     priceType: "Monthly",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2,
  //     name: "John Doe",
  //     subjects: "Science",
  //     class: "john@example.com",
  //     price: 12000,
  //     priceType: "Monthly",
  //     status: "Pending",
  //   },
  //   {
  //     id: 3,
  //     name: "John Doe",
  //     subjects: "English",
  //     class: "john@example.com",
  //     price: 12000,
  //     priceType: "Monthly",
  //     status: "Pending",
  //   },
  // ];

  return (
    <Box className='w-full'>
      <Box className='flex flex-row items-center justify-center gap-2 m-2'>
        {isPending && <CircularProgress size={60} />}
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead style={{ border: "2px solid #1976D2" }}>
            <TableRow>
              <TableCell
                style={{
                  fontSize: "18px",
                  color: "#1976D2",
                  backgroundColor: "#DBEAFE",
                }}
              >
                Sn.
              </TableCell>
              <TableCell style={{ fontSize: "18px", color: "#1976D2" }}>
                Name
              </TableCell>
              <TableCell
                style={{
                  fontSize: "18px",
                  color: "#1976D2",
                  backgroundColor: "#DBEAFE",
                }}
              >
                Subjects
              </TableCell>
              <TableCell style={{ fontSize: "18px", color: "#1976D2" }}>
                Class
              </TableCell>
              <TableCell
                style={{
                  fontSize: "18px",
                  color: "#1976D2",
                  backgroundColor: "#DBEAFE",
                }}
              >
                Price
              </TableCell>
              <TableCell style={{ fontSize: "18px", color: "#1976D2" }}>
                Price Type
              </TableCell>
              <TableCell
                style={{
                  fontSize: "18px",
                  color: "#1976D2",
                  backgroundColor: "#DBEAFE",
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((row, index) => (
              <TableRow
                key={row._id}
                hover
                onClick={() => handleRowClick(row._id)}
                style={{
                  cursor: "pointer",
                  border: "2px solid green",
                }}
              >
                <TableCell style={{ backgroundColor: "#DBEAFE" }}>
                  {index + 1}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell style={{ backgroundColor: "#DBEAFE" }}>
                  {`${row.subjects} `}
                </TableCell>
                <TableCell>{row.forClass}</TableCell>
                <TableCell style={{ backgroundColor: "#DBEAFE" }}>
                  {row.price}
                </TableCell>
                <TableCell>{row.priceType}</TableCell>
                <TableCell style={{ backgroundColor: "#DBEAFE" }}>
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TutionPostCard;
