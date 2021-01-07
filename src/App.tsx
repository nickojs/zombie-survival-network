import React from 'react';
import Notification from './components/notification';
import Navbar from './components/navbar';
import Dock from './components/dock';
import Desktop from './Containers/Desktop';
import { useAuth } from './contexts/authContext';

function App() {
  const { token } = useAuth();

  return (
    <>
      <Notification />
      <Navbar />
      <Desktop />
      {token && <Dock />}
    </>
  );
}

export default App;
