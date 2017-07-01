import Form from './react-jsonschema-form';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/js/Body';
import Update from './src/js/Update';

if(typeof window.viewCast === "object") {
	ReactDOM.render(<Update />, document.getElementById('root'));
} else {
	ReactDOM.render(<App />, document.getElementById('root'));
}