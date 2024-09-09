import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import $axios from "../lib/axios/axios.instance";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { openSuccessSnackbar } from "../store/slices/snackbarSlice";

const TutionDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  console.log("ID", id);

  //?=====api hit to get tution post data using id=======
  // Fetch the details of the selected item i.e. Fetch individual data based on ID
  const { data, error, isLoading } = useQuery({
    queryKey: ["single-tution-data-by-id", id],
    queryFn: async () => {
      return await $axios.get(`/tution/posts/${id}`);
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar("Getting Details..."));
    },
  });
  //*====================================================
  //?=====api hit to edit tution post data using id=======
  const {
    mutate,
    error: editError,
    isLoading: editIsLoading,
    isPending,
  } = useMutation({
    mutationKey: ["get-post-by-id-edit", id],
    mutationFn: async (item) => {
      console.log("ITEM", item);
      return await $axios.put(`/tution/posts/edit/${id}`, item);
    },
    onSuccess: () => {
      navigate(`/tution/edit/${id}`);
    },
  });

  //*====================================================
  //?=====api hit to delete tution post data using id=======
  const {
    mutate: deleteMutate,
    error: deleteError,
    isLoading: deleteIsLoading,
    isPending: deleteIsPending,
  } = useMutation({
    mutationKey: ["get-post-by-id-delete", id],
    mutationFn: async (id) => {
      console.log("DELETE ITEM ID", id);
      return await $axios.delete(`/tution/posts/delete/${id}`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries("get-tution-posts");
      navigate(`/teacher-profile`);
    },
    deleteError: (error) => {
      console.error("Failed to delete item:", error);
    },
  });

  //*====================================================
  const postData = data?.data?.post;
  console.log("Tution Detail Page", postData);

  if (isLoading || editIsLoading) return <CircularProgress size={60} />;
  if (error)
    return <Typography variant='h6'>Error: {error.message}</Typography>;
  if (!postData) {
    return <Typography variant='h5'>No data found for ID {id}</Typography>;
  }

  return (
    <Box className='flex items-center justify-center '>
      <Box className='flex flex-col w-1/3 gap-2 p-3 mt-10 rounded-lg shadow-xl min-w-fit h-1/2 bg-gradient-to-r from-blue-40 shadow-blue-500/50 '>
        <Typography variant='h5' className='text-[white] bg-[#1976D2]'>
          Details for: {postData.name}
        </Typography>

        <Typography>
          Subjects:
          {postData.subjects.map((item, index) => {
            return (
              <Chip
                key={index}
                label={item}
                variant='outlined'
                color='primary'
                sx={{ padding: "1rem", margin: ".2rem" }}
              />
            );
          })}
        </Typography>

        <Typography variant='subtitle1'>Class:{postData.forClass}</Typography>
        <Typography variant='subtitle1'>Price:{postData.price}</Typography>
        <Typography variant='subtitle1'>
          Price Type:{postData.priceType}
        </Typography>
        <Typography variant='subtitle1'>
          Status:
          <Chip
            label={postData.status}
            variant='outlined'
            color={postData.status == "Pending" ? "error" : "primary"}
          />
        </Typography>
        <Box className='flex gap-1'>
          <Button
            variant='contained'
            color='primary'
            className='w-1/2'
            onClick={() => {
              mutate(postData);
            }}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            color='primary'
            className='w-1/2'
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this item?")
              ) {
                deleteMutate(postData._id); // Trigger delete mutation
                navigate(`/teacher-profile`);
              }
            }}
          >
            Delete
          </Button>
        </Box>
        <Link to='/teacher-profile'>
          <Typography
            variant='h6'
            className='float-right p-1 text-blue-600 border-2 border-blue-400'
          >
            Go to your profile
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default TutionDetailsPage;
