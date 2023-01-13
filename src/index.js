import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './main/App';
const cors = require('cors');

App.use(cors());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
