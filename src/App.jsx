import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.less';
import Signup from './pages/Signup/Signup';
import FillMyProfile from './pages/FillMyProfile/FillMyProfile';
import Confirm from './pages/Confirm/Confirm';
import Login from './pages/Login/Login';

function App() {
  const accessToken = localStorage.getItem('accessToken');

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/confirm' element={<Confirm />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/users/:id'
            element={<FillMyProfile accessToken={accessToken} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
