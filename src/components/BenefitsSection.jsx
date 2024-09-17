//#===================Design 1============================

import React from "react";

const BenefitsSection = () => {
  return (
    <>
      <hr className='w-full h-[2px]' />
      <div className='py-12 bg-gradient-to-r from-pink-300 via-purple-400 to-blue-400'>
        <h2 className='mb-8 text-4xl font-bold text-center text-white'>
          What Benefits For You
        </h2>
        <div className='flex flex-wrap justify-center gap-10 px-4 '>
          <div className='max-w-xs p-6 text-center transition-shadow duration-300 bg-white rounded-lg shadow-lg bg-opacity-80 hover:shadow-2xl'>
            <p className='mt-2 text-2xl font-bold text-blue-700'>Student</p>
            <ul className='mt-4 text-lg italic text-justify text-gray-800 list-none'>
              <li className='flex items-start mb-2'>
                <span className='mr-3 text-2xl text-blue-500'>✔</span>
                Personalized one-on-one learning experience
              </li>
              <li className='flex items-start mb-2'>
                <span className='mr-3 text-2xl text-blue-500'>✔</span>
                Convenient home-based tuition
              </li>
              <li className='flex items-start mb-2'>
                <span className='mr-3 text-2xl text-blue-500'>✔</span>
                Access to qualified and experienced tutors
              </li>
              <li className='flex items-start mb-2'>
                <span className='mr-3 text-2xl text-blue-500'>✔</span>
                Flexible scheduling
              </li>
            </ul>
          </div>
          <div className='max-w-xs p-6 text-center transition-shadow duration-300 bg-white rounded-lg shadow-lg bg-opacity-80 hover:shadow-2xl'>
            <p className='mt-2 text-2xl font-bold text-blue-700'>Teacher</p>
            <ul className='mt-4 text-lg italic text-justify text-gray-800 list-none'>
              <li className='flex items-start mb-2'>
                <span className='mr-3 text-2xl text-blue-500'>✔</span>
                Flexible teaching opportunities
              </li>
              <li className='flex items-start mb-2'>
                <span className='mr-3 text-2xl text-blue-500'>✔</span>
                Showcase your skills and connect with students
              </li>
              <li className='flex items-start mb-2'>
                <span className='mr-3 text-2xl text-blue-500'>✔</span>
                Earn additional income
              </li>
              <li className='flex items-start mb-2'>
                <span className='mr-3 text-2xl text-blue-500'>✔</span>
                Flexible teaching hours
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BenefitsSection;

//#===================Design 2============================

// import React from "react";

// const BenefitsSection = () => {
//   return (
//     <div className='py-12 bg-white'>
//       <h2 className='mb-8 text-4xl font-bold text-center'>
//         What benefits for you
//       </h2>
//       <div className='flex flex-wrap justify-center space-x-8'>
//         <div className='max-w-xs text-center'>
//           <p className='mt-2 font-bold text-blue-500'>Student</p>
//           <p className='text-xl italic'>
//             • Personalized one-on-one learning experience • Convenient
//             home-based tuition • Access to qualified and experienced tutors
//             •flexible scheduling
//           </p>
//         </div>
//         <div className='max-w-xs text-center'>
//           <p className='mt-2 font-bold text-blue-500'>Teacher </p>
//           <p className='text-xl italic'>
//             • Flexible teaching opportunities • Showcase your skills, connect
//             with students in need of home tuition. • Earn additional income •
//             Connect with students in your local area • flexible teaching hours.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BenefitsSection;
