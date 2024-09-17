//#=======================Design 1 ===================================
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const features = [
  {
    title: "Students",
    heading: "Find Your Perfect Tutor Today!",
    description:
      "Submit your tuition request: Describe the subjects, class, and preferred timings.",
  },
  {
    title: "Teachers",
    heading: "Create a profile and list subjects you can teach",
    description:
      "Post your tutoring services & availability: Mention the subjects, classes, and timings you wish to teach.",
  },
  {
    title: "Connection",
    heading: "We'll connect you",
    description: "We match students' needs with the right tutor profiles.",
  },
];

const HowItWorks = () => {
  return (
    <>
      <hr className='w-full h-[2px]' />
      <div className='py-12 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'>
        <h2 className='p-4 mt-1 mb-8 text-4xl font-bold text-center text-gray-800 '>
          How It Works
        </h2>
        <div className='flex flex-wrap justify-center gap-8 px-4'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='w-full max-w-sm overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl'
            >
              <CardContent className='p-6'>
                <Typography
                  variant='h4'
                  component='div'
                  className='p-1 mb-4 font-semibold text-center text-white bg-blue-600 rounded-md'
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant='h6'
                  component='div'
                  className='mb-4 text-center text-blue-700 '
                >
                  {feature.heading}
                </Typography>
                <Typography
                  variant='body2'
                  fontSize={"1.1rem"}
                  color='textSecondary'
                  className='font-serif text-justify text-gray-900 hover:shadow-md'
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default HowItWorks;

//#======================Design 2 ====================================
// import { Card, CardContent, Typography } from "@mui/material";
// import React from "react";

// const features = [
//   {
//     title: "Students",
//     heading: "Find Your Perfect Tutor Today!",
//     description:
//       "Submit your tuition request: Describe the subjects, class, and preferred timings.",
//   },
//   {
//     title: "Teachers",
//     heading: "Create a profile and list subjects you can teach",
//     description:
//       "Post your tutoring services & availability: Mention the subjects, classes, and timings you wish to teach.",
//   },
//   {
//     title: "Connection",
//     heading: "We'll connect you ",
//     description: "We match students' needs with the right tutor profiles.",
//   },
// ];
// const HowItWorks = () => {
//   return (
//     <div className='py-12 bg-gray-100'>
//       <h2 className='mb-8 text-4xl font-bold text-center'>How It Works</h2>
//       <div className='flex justify-center space-x-8'>
//         {features.map((feature, index) => (
//           <Card key={index} className='max-w-sm bg-white shadow-md'>
//             <CardContent>
//               <Typography
//                 variant='h5'
//                 component='div'
//                 className='text-center text-blue-500'
//               >
//                 {feature.title}
//               </Typography>
//               <Typography
//                 variant='h6'
//                 component='div'
//                 className='text-center text-blue-500'
//               >
//                 {feature.heading}
//               </Typography>
//               <Typography variant='body2' color='textSecondary'>
//                 {feature.description}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HowItWorks;
