import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // eslint-disable-line
import reportWebVitals from './reportWebVitals'; // eslint-disable-line

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
