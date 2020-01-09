import React from 'react';

import { Uploader } from '../Components/Uploader';
import { UserMemes } from '../Components/UserMemes';

const Dashboard = () => (
  <div>
    <h2 className="mb-5">Dashboard</h2>
    <Uploader />
    <UserMemes />
  </div>
);

export default Dashboard;
