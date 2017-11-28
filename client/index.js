import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

window.onload = function() {
	ReactDOM.render(
	  React.createElement(App),
	  document.getElementById('app-container')
	);
}