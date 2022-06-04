import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style/Global.css';
import './style/Notice.css'
import MessagePage from './pages/Message/MessagePage';
import Notice from './pages/Notice/NoticePage';
import NoticeRead from './pages/Notice/NoticeRead';
import NoticeWrite from './pages/Notice/NoticeWrite';
import NoticeSearch from './pages/Notice/NoticeSearch';
import BUY from './page/Search/BuyMain';
import BUYSEARCH from './page/Search/BuySearch';
import BUYDETAIL from './page/Detail/BuyDetail';
import SELL from './page/Search/SellMain';
import SELLSEARCH from './page/Search/SellSearch';
import SELLDETAIL from './page/Detail/SellDetail';
import MAIN from './page/Main/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MAIN/>}/>
        <Route path="/buy" element={<BUY/>}/>
        <Route path="/buy/search/*" element={<BUYSEARCH/>}/>
        <Route path="/buy/detail/*" element={<BUYDETAIL/>}/>
        <Route path='/sell' element={<SELL/>}/>
        <Route path='/sell/search/*' element={<SELLSEARCH/>}/>
        <Route path="/sell/detail/*" element={<SELLDETAIL/>}/>
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