import './App.css';
import React from 'react';
import { isAuthenticated, logout, useUser } from './authentication';
import AuthenticationPage from './AuthenticationPage';

function App() {
  const {user} = useUser();

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-slate-700'>
      {isAuthenticated(user) 
        ? <button onClick={() => console.log(logout())}>Click</button> 
        : <AuthenticationPage />
      }
    </div>
  );
}

export default App;
