//import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style/Global.css';
import MessagePage from './pages/Message/MessagePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/msgbox" element={<MessagePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
