import React, { useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import socketIOClient from 'socket.io-client';
import  priceStore  from '../storage/PriceStorage';
import {Spinner} from "react-bootstrap";

const ENDPOINT = 'ws://localhost:4000';

const Main = observer (({item}) => {

    const [quote, setQuote] = useState([]);
    
    
    useEffect(() => {
           const socket = socketIOClient(ENDPOINT, { transports:["websocket"] });

               try {
                 socket.on("ticker", (data) => { 
                 priceStore.setPriceTicker(data);   
                 setQuote(priceStore.quotes);
            });
      
                } catch (e) {
                 console.error(e.massage);
             }    
            return () => { 
            socket.disconnect();
           };  
                
    },[]);

    return (
        
<table className="table table-hover text-nowrap">
        <thead>
            <tr>
                <th scope="col" >Ticker</th>
                <th scope="col" >Exchange</th>
                <th scope="col" >Price</th>
                <th scope="col">Change</th>
                <th scope="col">Change percent</th>
                <th scope="col">Dividend</th>
                <th scope="col">Yield</th>
                <th scope="col">Last trade time</th>
            </tr>
        </thead>
    <tbody>
               
            
        { item ? 
            <React.Fragment key={item["ticker"] +1}>
       <tr>        
           <th scope="row">{item["ticker"]}</th>
               
               <th>
               
               <span className="text-danger">
                   <i className="fas fa-caret"></i><span>{item["exchange"]}</span>
               </span>
              
               </th>
                <th>
                   <span className="text-success">
                       <i className="fas fa-caret-up me-1"></i><span>${item["price"]}</span>
                   </span>
               </th>
               <th>
                   <span className="text-success">
                       <i className="fas fa-caret-up me-1"></i><span>{item["change"]}</span>
                   </span>
               </th>
               <th>
                   <span className="text-success">
                       <i className="fas fa-caret-up me-1"></i><span>{item["change_percent"]}</span>
                   </span>
               </th>
               
               <th>
                   
                   <span className="text-danger">
                       <i className="fas fa-caret-down me-1"></i><span>{item["dividend"]}</span>
                   </span>
                   
               </th>
               <th>
                   
                   <span className="text-danger">
                       <i className="fas fa-caret-down me-1"></i><span>{item["yield"]}</span>
                   </span>
                   
               </th>
               <th>   
                   <span className="text-danger">
                       <i className="fas fa-caret"></i><span>{item["last_trade_time"]}</span>
                   </span>  
               </th>              
       </tr>
       </React.Fragment>
        : quote  && quote.length > 0 ? quote.map((item) =>
                 <React.Fragment key={item["ticker"] +1}>
            <tr>        
                <th scope="row">{item["ticker"]}</th>
                    
                    <th>
                    
                    <span className="text-danger">
                        <i className="fas fa-caret"></i><span>{item["exchange"]}</span>
                    </span>
                   
                    </th>
                     <th>
                        <span className="text-success">
                            <i className="fas fa-caret-up me-1"></i><span>${item["price"]}</span>
                        </span>
                    </th>
                    <th>
                        <span className="text-success">
                            <i className="fas fa-caret-up me-1"></i><span>{item["change"]}</span>
                        </span>
                    </th>
                    <th>
                        <span className="text-success">
                            <i className="fas fa-caret-up me-1"></i><span>{item["change_percent"]}</span>
                        </span>
                    </th>
                    
                    <th>
                        
                        <span className="text-danger">
                            <i className="fas fa-caret-down me-1"></i><span>{item["dividend"]}</span>
                        </span>
                        
                    </th>
                    <th>
                        
                        <span className="text-danger">
                            <i className="fas fa-caret-down me-1"></i><span>{item["yield"]}</span>
                        </span>
                        
                    </th>
                    <th>   
                        <span className="text-danger">
                            <i className="fas fa-caret"></i><span>{item["last_trade_time"]}</span>
                        </span>  
                    </th>              
            </tr>
            </React.Fragment>
        ):
        <>
        <span ><strong>Loading...</strong></span>
        <Spinner animation="grow" />
        </>
      }
    </tbody>
</table>
        
    );
})

export default Main;