import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.less';
import Signup from './pages/Signup/Signup';
import FillMyProfile from './pages/FillMyProfile/FillMyProfile';
import Confirm from './pages/Confirm/Confirm';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const accessToken = localStorage.getItem('accessToken');
  let skillId = 1;
  
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/confirm' element={<Confirm />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route
            path='/users/:id'
            element={
              <FillMyProfile accessToken={accessToken} skillId={skillId} />
            }
          />
          <Route path='/:id' element={<div>It is my profile</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
