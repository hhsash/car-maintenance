import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { mainContext } from './context/mainContext';
import Model from './model';
import App from './App';
import './index.css';
import '@avtopro/button/dist/style.css';
import '@avtopro/text-input/dist/style.css';
import '@avtopro/slider/dist/style.css';
import '@avtopro/modal/dist/style.css';
import '@avtopro/select/dist/style.css';
import '@avtopro/number-input/dist/style.css';
import '@avtopro/item-card/dist/style.css';
import '@avtopro/banner/dist/style.css';
import '@avtopro/css-grid/dist/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <mainContext.Provider value={new Model()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </mainContext.Provider>
);
