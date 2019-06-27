import React from 'react';
import './App.css';

export class App extends React.PureComponent {
  render() {
    return (
      <div className="app">
        <header className="app-header" />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default App;
