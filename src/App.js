import React, { Component } from "react";

import { MediumMenu } from "react-markdown-menu";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = { selection: null };

  componentDidMount() {
    if (this.area) {
      this.area.addEventListener("select", () => {
        const { value, selectionStart, selectionEnd } = this.area;

        console.log({ value: value.length, selectionStart, selectionEnd });

        this.setState({
          start: selectionStart,
          end: selectionEnd,
          selection: value.substring(selectionStart, selectionEnd)
        });
      });
    }
  }

  onChange(text) {
    const { selection, start, end } = this.state;

    this.area.value = `${this.area.value.slice(
      0,
      start
    )}${text}${this.area.value.slice(end)}`;

    const diff = text.length - selection.length;

    this.area.setSelectionRange(start, end + diff);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <MediumMenu
          x={10}
          y={10}
          selection={this.state.selection}
          onChange={this.onChange.bind(this)}
        />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <textarea ref={node => (this.area = node)} />
      </div>
    );
  }
}

export default App;
