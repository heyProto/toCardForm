import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

function Environment() {
  if (process.env.NODE_ENV === "production"){
    console.log("production")
  } else {
    console.log("local")
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
Environment();