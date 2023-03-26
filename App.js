import * as React from 'react';
import {UserProvider} from './UserContext';
import Router from './Router';

const App = () => {
  return (
    <UserProvider>
      <Router/>
    </UserProvider>
  );
}
export default App;