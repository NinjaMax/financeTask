import React, {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import Main from './Main';
import  priceStore  from '../storage/PriceStorage';

const ENDPOINT = 'ws://localhost:4000';

const NavBar = () => {
    const [datas, setDatas] = useState('');
   
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
        socket.on("online", (arg) => {
                setDatas(arg);
            });
        
        return () => socket.disconnect();
    }, []);

    const [value, setValue] = useState('');

    const filterQuotes = priceStore.quotes.filter(ticker => {
        return ticker.ticker.toUpperCase().includes(value.toUpperCase());
        });
  
    return (
        <div>
          
        <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="/#">
            <img
                src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
                className="me-2"
                height="20"
                alt=""
                loading="lazy"
            />
            <small>Price Tickers <br/></small>
                
            <small >{datas}</small>
            </a>
            <form className="d-flex input-group w-auto">
                <input
                    type="text"
                    className="search_input"
                    placeholder="Search Ticker"
                    onChange={(e) => setValue(e.target.value)}
                    aria-label="Search"
                />
                    <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search"></i>
                    </span>
            </form>
        </div>
            
        {!filterQuotes ? filterQuotes.map((item) => {
            return (
          <Main item={item} key={item["ticker"]+1} />
        )}) : "Ticker Prices" }
   
        </nav>

        </div>
    );
};

export default NavBar;