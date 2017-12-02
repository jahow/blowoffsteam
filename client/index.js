import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

window.onload = function() {
	ReactDOM.render(
	  React.createElement(App),
	  document.getElementById('app-container')
	);
}