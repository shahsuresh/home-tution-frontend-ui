import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const features = [
  {
    title: "Qualified Tutors",
    description: "We Provide you through highly qualified and verified tutors.",
  },
  {
    title: "Customizable Learning",
    description: "Set your own schedule and learn at your own pace & Place.",
  },
  {
    title: "Easy Scheduling",
    description: "Request sessions with a single click.",
  },
];

const Features = () => {
  return (
    <div className='py-12 bg-gray-100'>
      <h2 className='mb-8 text-4xl font-bold text-center'>Why Choose Us?</h2>
      <div className='flex justify-center space-x-8'>
        {features.map((feature, index) => (
          <Card key={index} className='max-w-sm bg-white shadow-md'>
            <CardContent>
              <Typography
                variant='h5'
                component='div'
                className='text-blue-500'
              >
                {feature.title}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Features;
