import React from "react";

const App = () => {
  console.log(import.meta.env.VITE_MYNAME);
  return (
    <div className='text-3xl font-bold'>
      My Name is {import.meta.env.VITE_MYNAME}
    </div>
  );
};

export default App;
