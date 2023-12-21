import CardReport from '@/components/My-reports/my-reports';
// import UserReports from '@/components/My-reports/my-reports';
import type { NextPage } from 'next';
import React from 'react';

const MyReportsPage: NextPage = () => {
  return (
    <div className='my-reports-page'>
      <CardReport />
    </div>
  );
};

export default MyReportsPage;
