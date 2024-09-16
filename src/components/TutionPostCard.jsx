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

  return (
    <Box className='w-full'>
      <Box className='flex flex-row items-center justify-center gap-2 m-2'>
        {isPending && <CircularProgress size={60} />}
      </Box>
      <Box className='w-full overflow-x-auto'>
        <TableContainer component={Paper}>
          <Table className='w-full min-w-[600px]'>
            <TableHead style={{ border: "2px solid #1976D2" }}>
              <TableRow>
                <TableCell className='px-4 py-2 text-lg font-bold text-blue-700 bg-blue-100'>
                  Sn.
                </TableCell>
                <TableCell className='px-4 py-2 text-lg font-bold text-blue-700'>
                  Name
                </TableCell>
                <TableCell className='px-4 py-2 text-lg font-bold text-blue-700 bg-blue-100'>
                  Subjects
                </TableCell>
                <TableCell className='px-4 py-2 text-lg font-bold text-blue-700'>
                  Class
                </TableCell>
                <TableCell className='px-4 py-2 text-lg font-bold text-blue-700 bg-blue-100'>
                  Price
                </TableCell>
                <TableCell className='px-4 py-2 text-lg font-bold text-blue-700'>
                  Price Type
                </TableCell>
                <TableCell className='px-4 py-2 text-lg font-bold text-blue-700 bg-blue-100'>
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
                  className='border-2 border-green-700 cursor-pointer hover:bg-blue-400'
                >
                  <TableCell className='px-4 py-2 text-sm bg-blue-100'>
                    {index + 1}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-sm'>
                    {row.name}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-sm bg-blue-100'>
                    {row.subjects.join(" , ")}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-sm'>
                    {row.forClass}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-sm bg-blue-100'>
                    {row.price}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-sm'>
                    {row.priceType}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-sm bg-blue-100'>
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TutionPostCard;
