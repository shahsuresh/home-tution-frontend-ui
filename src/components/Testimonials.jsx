//#=================================Design 1 ================================

import React from "react";

const Testimonials = () => {
  return (
    <>
      <div className='py-12 bg-gradient-to-r from-blue-200 via-cyan-100 to-blue-50'>
        <h2 className='mb-8 text-4xl font-bold text-center text-gray-800'>
          What Our Users Say
        </h2>
        <div className='flex flex-wrap justify-center gap-8 px-4'>
          {[
            {
              text: "Great platform! Found an amazing tutor in just a few clicks.",
              author: "- Student: Prince Rai",
            },
            {
              text: "It's so easy to offer my tutoring services.",
              author: "- Teacher: Anju Sah",
            },
            {
              text: "The best platform to find the perfect tutor for my child. The process was simple and quick!",
              author: "- Parent",
            },
            {
              text: "I love how I can easily connect with students looking for tuition. Highly recommended!",
              author: "- Teacher: Prince Yadav",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className='w-full max-w-xs p-6 text-center transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl'
            >
              <p className='text-lg italic leading-relaxed text-gray-700'>
                &quot;{testimonial.text}&quot;
              </p>
              <p className='mt-4 font-bold text-blue-600'>
                {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonials;

//#================================Design 2 =================================

// import React from "react";

// const Testimonials = () => {
//   return (
//     <div className='py-12 bg-white'>
//       <h2 className='mb-8 text-4xl font-bold text-center'>
//         What Our Users Say
//       </h2>
//       <div className='flex flex-wrap justify-center space-x-8'>
//         <div className='max-w-xs text-center'>
//           <p className='text-xl italic'>
//             &quot;Great platform! Found an amazing tutor in just a few
//             clicks.&quot;
//           </p>
//           <p className='mt-2 font-bold text-blue-500'>- Student: Prince Rai</p>
//         </div>
//         <div className='max-w-xs text-center'>
//           <p className='text-xl italic'>
//             &quot; It&apos;s so easy to offer my tutoring services.&quot;
//           </p>
//           <p className='mt-2 font-bold text-blue-500'>- Teacher: Anju Sah </p>
//         </div>
//         <div className='max-w-xs text-center'>
//           <p className='text-xl italic'>
//             "The best platform to find the perfect tutor for my child. The
//             process was simple and quick!"
//           </p>
//           <p className='mt-2 font-bold text-blue-500'>– Parent</p>
//         </div>
//         <div className='max-w-xs text-center'>
//           <p className='text-xl italic'>
//             "I love how I can easily connect with students looking for tuition.
//             Highly recommended!"
//           </p>
//           <p className='mt-2 font-bold text-blue-500'>-Teacher: Prince Yadav</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;
