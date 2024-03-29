/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOMClient.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <App />
        </StyledEngineProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
