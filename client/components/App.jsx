import React, { Component } from 'react';
import { MessageWriter } from './MessageWriter';

export class App extends Component {
  render() {
    return (
      <div className="app">
        <h1 className="app-title">Faites-vous du bien, lâchez-vous :</h1>
        <MessageWriter />
      </div>
    );
  }
}