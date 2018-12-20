import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import AppContextStore from './AppContextStore';

ReactDOM.render(
  <AppContextStore>
    <App />
  </AppContextStore>
,
  document.querySelector('#root')
);
