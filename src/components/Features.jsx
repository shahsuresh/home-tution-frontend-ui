//#==================Design 1===============================================

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const features = [
  {
    title: "Qualified & Verified Tutors",
    description:
      "We provide highly qualified and verified tutors to ensure quality and reliability.",
  },
  {
    title: "Personalized Matching",
    description: "Find tutors tailored to your learning needs.",
  },
  {
    title: "Customizable Learning",
    description: "Request sessions with just a few clicks.",
  },
  {
    title: "Easy & Flexible Scheduling",
    description:
      "Choose the time that works best for both students and tutors. Set your own schedule and learn at your own pace.",
  },
];

const Features = () => {
  return (
    <>
      <hr className='w-full h-[2px]' />
      <div className='py-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>
        <h2 className='mb-10 text-4xl font-bold text-center text-white'>
          Why Choose Us?
        </h2>
        <div className='grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4 md:px-16'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='transition-transform transform bg-white rounded-lg shadow-md cursor-pointer duration-400 hover:scale-105'
            >
              <CardContent className='p-8'>
                <Typography
                  variant='h5'
                  component='div'
                  className='mb-4 font-bold text-center text-purple-600'
                >
                  {feature.title}
                </Typography>
                <Typography
                  color='textSecondary'
                  className='font-serif text-4xl text-center'
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <hr className='w-full h-[3px] bg-yellow-400' />
    </>
  );
};

export default Features;

// //#==================Design 2===============================================

// import React from "react";
// import { Card, CardContent, Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";

// // Define custom styles
// const useStyles = makeStyles({
//   container: {
//     padding: "4rem 0",
//     background:
//       "linear-gradient(90deg, rgba(29,78,216,1) 0%, rgba(147,51,234,1) 50%, rgba(236,72,153,1) 100%)",
//   },
//   heading: {
//     marginBottom: "3rem",
//     color: "#fff",
//     textAlign: "center",
//     fontSize: "2.5rem",
//     fontWeight: "bold",
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: "2rem",
//     maxWidth: "1200px",
//     margin: "0 auto",
//     padding: "0 1rem",
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: "0.75rem",
//     boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//   },
//   cardContent: {
//     padding: "1.5rem",
//   },
//   title: {
//     color: "#4f46e5", // Indigo color
//     fontWeight: "600",
//     marginBottom: "1rem",
//   },
//   description: {
//     color: "#4a5568", // Gray color
//   },
// });

// const features = [
//   {
//     title: "Qualified & Verified Tutors",
//     description:
//       "We provide highly qualified and verified tutors to ensure quality and reliability.",
//   },
//   {
//     title: "Personalized Matching",
//     description: "Find tutors tailored to your learning needs.",
//   },
//   {
//     title: "Customizable Tutoring Preferences",
//     description: "Request sessions with just a few clicks.",
//   },
//   {
//     title: "Easy & Flexible Scheduling",
//     description:
//       "Choose the time that works best for both students and tutors. Set your own schedule and learn at your own pace.",
//   },
// ];

// const Features = () => {
//   const classes = useStyles(); // Use the custom styles

//   return (
//     <div className={classes.container}>
//       <h2 className={classes.heading}>Why Choose Us?</h2>
//       <div className={classes.grid}>
//         {features.map((feature, index) => (
//           <Card key={index} className={classes.card}>
//             <CardContent className={classes.cardContent}>
//               <Typography
//                 variant='h5'
//                 component='div'
//                 className={classes.title}
//               >
//                 {feature.title}
//               </Typography>
//               <Typography variant='body2' className={classes.description}>
//                 {feature.description}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Features;
