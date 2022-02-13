import React from 'react';
import {NavBar} from "./components/NavBar";
import {BrowserRouter, Routes} from "react-router-dom";
import {Route} from 'react-router-dom'
import {Home} from "./pages/Home";
import CryptoPage from "./pages/Crypticurrencies/CryptoPage";
import {News} from "./components/News";
import {CryptoDetail} from "./components/Cryptocurrencies/CryptoDetail";

const App = () => {
    return <>
        <BrowserRouter>
            <div className="container">
                <NavBar/>
                <section className='main-section'>
                    <div className="wrapper">
                        <Routes>
                            <Route path='/' exact element={<Home/>}/>
                            <Route path='/home' exact element={<Home/>}/>
                            <Route path='/cryptocurrencies' exact element={<CryptoPage/>}/>
                            <Route path="/cryptocurrencies/:cryptoId" exact element = {<CryptoDetail/>} />
                            <Route path="/cryptoNews" exact element = {<News/>}/>
                        </Routes>
                    </div>
                </section>
            </div>
        </BrowserRouter>
    </>
}
export default App;