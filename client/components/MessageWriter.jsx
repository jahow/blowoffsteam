import React, { Component } from 'react';

export class MessageWriter extends Component {
  render() {
    return (
      <div className="message-writer">
        <textarea placeholder="Ecrivez votre message">
        </textarea>
      </div>
    );
  }
}