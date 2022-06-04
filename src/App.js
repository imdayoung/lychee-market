import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;