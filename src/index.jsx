import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@avtopro/button/dist/style.css';
import '@avtopro/text-input/dist/style.css';
import '@avtopro/slider/dist/style.css';
import '@avtopro/modal/dist/style.css';
import '@avtopro/select/dist/style.css';
import '@avtopro/number-input/dist/style.css';
import { mainContext } from './context/mainContext';
import Model from './model';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <mainContext.Provider value={new Model()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </mainContext.Provider>
);
