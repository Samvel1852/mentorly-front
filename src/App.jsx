import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.less';
import Signup from './pages/Signup/Signup';
import FillMyProfile from './pages/FillMyProfile/FillMyProfile';
import Confirm from './pages/Confirm/Confirm';
import Login from './pages/Login/Login';
import ViewMyProfile from './pages/ViewMyProfile/ViewMyProfile';
import { getLocalStorage } from './helpers/localStorage';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// import PrivateRoute from './components/HOC/PrivateRoute';

function App() {

  const accessToken = getLocalStorage('accessToken');
  const currentUserId = getLocalStorage('currentUserId');
  const userStatus = getLocalStorage('verified');

  return (
    <div className='App'>
        <Routes>
          <Route path='/' element={ accessToken && userStatus === 'verified' 
            ? <Navigate to={`/${currentUserId}`} /> :
            accessToken && userStatus !== 'verified' ? 
            <Navigate to={ `/users/${currentUserId}`} /> : <Navigate to='login' /> } />
          <Route path='/signup' element={ accessToken ? <Navigate to='/'/> : <Signup /> } />
          <Route path='/confirm' element={ accessToken ? <Navigate to='/'/> :<Confirm /> } />
          <Route path='/login' element={ <Login /> } />            
          <Route path='/users/:id'
            element={ <FillMyProfile accessToken={ accessToken } /> }
          />
          <Route element={<PrivateRoute />} >
            <Route path='/dashboard' element={ <Dashboard/> } />
            <Route path='/:id' element={ <ViewMyProfile accessToken={accessToken} /> } />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
