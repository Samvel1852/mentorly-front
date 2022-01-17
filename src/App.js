import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.less';
import Signup from './features/Signup/Signup';
import FillMyProfile from './pages/FillMyProfile/FillMyProfile';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/fill-my-profile' element={<FillMyProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
