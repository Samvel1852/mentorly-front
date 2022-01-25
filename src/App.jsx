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

function App() {
  const [verified, setVerified] = useState(false);

  useEffect(async () => {
    if (getLocalStorage('currentUserId') && getLocalStorage('accessToken')) {
      const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}${getLocalStorage('currentUserId')}`);
      console.log(res.data.user.status);
      setVerified(res.data.user.status);
      console.log(verified);
    }
  }, [])

  const accessToken = getLocalStorage('accessToken');
  const currentUserId = getLocalStorage('currentUserId');
  const userStatus = getLocalStorage('verified');
  let skillId = 1;

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={ accessToken && userStatus === 'verified' 
          ? <Navigate to={`/${currentUserId}`} /> :
            accessToken ? 
            <Navigate to={`/users/${currentUserId}`} /> : <Navigate to='login' />} />
          <Route path='/signup' element={accessToken ? <Navigate to='/'/> : <Signup />} />
          <Route path='/confirm' element={accessToken ? <Navigate to='/'/> : <Confirm />} />
          <Route path='/login' element={accessToken ? <Navigate to='/'/> : <Login />} />
          <Route
            path='/users/:id'
            element={accessToken ? <FillMyProfile accessToken={accessToken} skillId={skillId} />
              : <Navigate to='/' />
            }
          />
          <Route
            path='/:id'
            element={accessToken && verified === 'verified' ? <ViewMyProfile accessToken={accessToken} /> 
            : <Navigate to='/' /> }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
