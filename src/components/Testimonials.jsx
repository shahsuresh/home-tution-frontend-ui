import React from "react";

const Testimonials = () => {
  return (
    <div className='py-12 bg-white'>
      <h2 className='mb-8 text-4xl font-bold text-center'>
        What Our Users Say
      </h2>
      <div className='flex flex-wrap justify-center space-x-8'>
        <div className='max-w-xs text-center'>
          <p className='text-xl italic'>
            &quot;Great platform! Found an amazing tutor in just a few
            clicks.&quot;
          </p>
          <p className='mt-2 font-bold text-blue-500'>- Student: Prince Rai</p>
        </div>
        <div className='max-w-xs text-center'>
          <p className='text-xl italic'>
            &quot; It&apos;s so easy to offer my tutoring services.&quot;
          </p>
          <p className='mt-2 font-bold text-blue-500'>- Teacher: Anju Sah </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
