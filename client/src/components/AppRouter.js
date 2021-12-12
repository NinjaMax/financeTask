import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Main from './Main';
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {

    return (
       
          <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='*' element={<div>PAGE NOT FOUND</div>}/>
          </Routes>
        
    );
});

export default AppRouter;