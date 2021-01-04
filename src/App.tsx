import React from 'react';
import Notification from './components/notification';
import Navbar from './components/navbar';
import Dock from './components/dock';
import Desktop from './Containers/Desktop';

function App() {
  return (
    <>
      <Notification />
      <Navbar />
      <Desktop />
      <Dock />
    </>
  );
}

export default App;
