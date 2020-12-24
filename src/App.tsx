import React from 'react';
import Auth from './Containers/Auth';
import Title from './components/UI/text';
import Notification from './components/notification';

function App() {
  return (
    <>
      <Notification />
      <Title text="S.N.I. - Survival Network Interface" />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Auth />
      </div>
    </>
  );
}

export default App;
