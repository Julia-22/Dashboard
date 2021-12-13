import React from 'react';
import { Routes ,Route, Navigate } from 'react-router-dom';

import RegisterView from './views/RegisterView/RegisterView';
import LoginView from './views/LoginView/LoginView';
import BoardsView from './views/BoardsView/BoardsView';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/register" element={<PublicRoute element={RegisterView}/>} />
        <Route path="/login" element={<PublicRoute element={LoginView}/>} />
        <Route path="/boards" element={<PrivateRoute element={BoardsView}/>}/>
      </Routes>
    </div>
  );
}

export default App;
