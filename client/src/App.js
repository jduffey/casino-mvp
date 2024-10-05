import React from 'react';
import DepositForm from './components/DepositForm';
import WagerTypeRegistration from './components/WagerTypeRegistration';

function App() {
  return (
    <div>
      <h1>Casino MVP</h1>
      <DepositForm />
      <hr/>
      <WagerTypeRegistration />
    </div>
  );
}

export default App;