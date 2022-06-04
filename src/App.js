//import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style/Global.css';
import './style/Notice.css'
import MessagePage from './pages/Message/MessagePage';
import Notice from './pages/Notice/NoticePage';
import NoticeRead from './pages/Notice/NoticeRead';
import NoticeWrite from './pages/Notice/NoticeWrite';
import NoticeSearch from './pages/Notice/NoticeSearch';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/msgbox" element={<MessagePage/>}/>
        <Route path="/notice" element={<Notice/>}/>
        <Route path="/notice/read/*" element={<NoticeRead/>}/>
        <Route path="/notice/write" element={<NoticeWrite/>}/>
        <Route path="/notice/search/*" element={<NoticeSearch/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
