import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.less';
import Signup from './pages/Signup/Signup';
import FillMyProfile from './pages/FillMyProfile/FillMyProfile';
import Confirm from './pages/Confirm/Confirm';
import Login from './pages/Login/Login';
import ViewMyProfile from './pages/ViewMyProfile/ViewMyProfile';
import { getLocalStorage } from './helpers/localStorage';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  const accessToken = getLocalStorage('accessToken');
  const currentUserId = getLocalStorage('currentUserId');
  const userStatus = getLocalStorage('verified');

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={ accessToken && userStatus === 'verified' 
            ? <Navigate to={`/${currentUserId}`} /> :
            accessToken && userStatus !== 'verified' ? 
            <Navigate to={ `/users/${currentUserId}`} /> : <Navigate to='login' /> } />
          <Route path='/signup' element={ accessToken ? <Navigate to='/'/> : <Signup /> } />
          <Route path='/confirm' element={ accessToken ? <Navigate to='/'/> :<Confirm /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/dashboard' element={ <Dashboard/> }/>
          <Route path='/users/:id'
            element={ !accessToken ? <Navigate to='/login' /> 
            : <FillMyProfile accessToken={ accessToken } /> }
          />
          <Route path='/:id'
            element={ userStatus === 'verified' ? <ViewMyProfile accessToken={accessToken} /> 
            : <Navigate to='/login' /> }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
