import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.less';
import Signup from './pages/Signup/Signup';
import FillMyProfile from './pages/FillMyProfile/FillMyProfile';
import Confirm from './pages/Confirm/Confirm';
import Login from './pages/Login/Login';
import ViewMyProfile from './pages/ViewMyProfile/ViewMyProfile';
import { getLocalStorage } from './helpers/localStorage';
import axios from 'axios';
import EditMyProfile from './pages/EditMyProfile/EditMyProfile';

function App() {
  const [verified, setVerified] = useState(false);

  useEffect(async () => {
    if (getLocalStorage('currentUserId') && getLocalStorage('accessToken')) {
      const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}${getLocalStorage('currentUserId')}`);
      console.log(res.data.user.status);
      setVerified(res.data.user.status);
    }
  }, [])

  const accessToken = getLocalStorage('accessToken');
  const currentUserId = getLocalStorage('currentUserId')
  let skillId = 1;

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={ accessToken && verified ? <Navigate to={`/${currentUserId}`} /> :
          accessToken ? <Navigate to={`/users/${currentUserId}`} /> : <Navigate to='login' />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/confirm' element={<Confirm />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/users/:id'
            element={
              <FillMyProfile accessToken={accessToken} skillId={skillId} />
            }
          />
          <Route
            path='/:id'
            element={<ViewMyProfile accessToken={accessToken} />}
          />
          <Route path='/edit/:id' element={<EditMyProfile edit='edit' accessToken={accessToken} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
