import AddUser from '@/components/AddUser/add-user';
import type { NextPage } from 'next';
import React from 'react';

const InespectorDashBoard: NextPage = () => {
  return (
    <div>
      <h1>This is the sign up page</h1>
      <AddUser />
      {/* Your homepage content goes here */}
    </div>
  );
};

export default InespectorDashBoard;
