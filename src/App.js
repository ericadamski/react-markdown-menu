import React, { Component } from "react";

import { MediumMenu } from "react-markdown-menu";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  componentDidMount() {
    if (this.area) {
      this.area.addEventListener("select", () => {
        const { value, selectionStart, selectionEnd } = this.area;

        this.setState({
          selectionStart,
          selectionEnd,
          selection: value.substr(selectionStart, selectionEnd)
        });
      });
    }
  }

  onChange(text) {
    const { selectionStart, selectionEnd } = this.state;

    this.area.setSelectionRange();
    // this.area.value = this.area.value.slice(selectionStart, selectionEnd);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <MediumMenu x={10} y={10} selection="hello" onChange={console.log} />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <textarea ref={node => (this.area = node)} />
      </div>
    );
  }
}

export default App;
