import React from 'react';
import DepositForm from './components/DepositForm';
import WagerTypeRegistration from './components/WagerTypeRegistration';
import Stats from './components/Stats';

function App() {
  return (
    <div>
      <h1>Casino MVP</h1>
      <DepositForm />
      <hr/>
      <WagerTypeRegistration />
      <hr/>
      <Stats />
    </div>
  );
}

export default App;