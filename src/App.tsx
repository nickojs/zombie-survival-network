import React from 'react';

import Notification from './components/notification';
import Navbar from './components/navbar';
import Routes from './routes';

function App() {
  return (
    <>
      <Navbar />
      <Notification />
      <Routes />
    </>
  );
}

export default App;
