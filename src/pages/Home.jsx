import React from "react";

const Home = () => {
  console.log(import.meta.env.VITE_MYNAME);
  return <div> My Name is {import.meta.env.VITE_MYNAME}</div>;
};

export default Home;
