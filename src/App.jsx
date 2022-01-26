import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.less';
import Signup from './pages/Signup/Signup';
import FillMyProfile from './pages/FillMyProfile/FillMyProfile';
import Confirm from './pages/Confirm/Confirm';
import Login from './pages/Login/Login';
import ViewMyProfile from './pages/ViewMyProfile/ViewMyProfile';
import { getLocalStorage } from './helpers/localStorage';
import Dashboard from './pages/Dashboard/Dashboard';
import { PrivateRoute, PublicRoute, SemiPrivateRoute } from './components/ConfigureRoutes/ConfigureRoutes';

function App() {
  const [currentUserId, setCurrentUserId] = useState(getLocalStorage('currentUserId'));

  useEffect(() => {
    setCurrentUserId(getLocalStorage('currentUserId'));
  },[]);

  return (
    <div className='App'>
        <Routes>
          <Route path='/' element={<Navigate to={`/${currentUserId}`} />} />
          <Route element={ <PublicRoute /> }>
            <Route path='/signup' element={ <Signup /> } />
            <Route path='/confirm' element={ <Confirm /> } />
            <Route path='/login' element={ <Login /> } /> 
          </Route>
          <Route element={ <SemiPrivateRoute />}>
            <Route path='/users/:id' element={ <FillMyProfile /> } />
          </Route>
          <Route element={<PrivateRoute />} >
            <Route path='/dashboard' element={ <Dashboard/> } />
            <Route path='/:id' element={ <ViewMyProfile /> } />
          </Route>
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
    </div>
  );
}

export default App;
