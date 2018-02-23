[![Build Status](https://travis-ci.org/ericadamski/react-markdown-menu.svg?branch=master)](https://travis-ci.org/ericadamski/react-markdown-menu)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# react-markdown-menu

A small medium-esk react component to allow editing markdown files

# Install

`npm install react-markdown-menu`

or

`yarn add react-markdown-menu`

# Usage

While the component is intended to be used as a compound component until it has been tested the main usage will be through the base `MarkdownMenu` component

```javascript
class MarkdownMenu extends Component {
  static propTypes = {
    // The number of pixels from the left of the browser to place the menu
    x: PropTypes.number,
    // The number of pixels from the top of the browser to place the menu
    y: PropTypes.number,
    // A function that is called whenever a button on the menu is clicked.
    // The function is of the type:
    // function onChange(modifiedText: string, line: boolean): undefined
    // When a button is clicked to modified text is sent to the onChange,
    // and a boolean to say whether to replace the entire line or
    // just the selected area
    onChange: PropTypes.func.isRequired,
    // The text selection of the entire line the cursor is currently on
    lineSelection: PropTypes.string,
    // The text selection of whatever is curretly highlighted
    selection: PropTypes.string,
  };

  /* the rest of the class */
}
```

Below is an example using a textarea as the editor

```javascript
import React from 'react';
import { render, findDOMNode } from 'react-dom';
import { MarkdownMenu } from 'react-markdown-menu';

class App extends React.Component {
  state = {};

  getLineRange(value, selectionEnd) {
    let length = 0;

    const lines = value.split('\n').map(str => (length += str.length + 1));

    const max = lines.filter(l => l < selectionEnd);

    const start = max[max.length - 1] || 0;
    const end = lines[max.length] - 1;

    return [start, end];
  }

  componentDidMount() {
    // Setup event listeners
    if (this.textareaRef) {
      const textarea = (this.textarea = findDOMNode(this.textareaRef));
      const menu = findDOMNode(this.menu);

      console.log(menu);

      const hideMenu = () =>
        this.setState({ selection: null, lineSelection: null });

      // Hide then menu on scroll of the window.
      document.addEventListener('scroll', hideMenu);

      // Hide the menu on clicking outside of the menu
      document.addEventListener(
        'mousedown',
        ({ target }) => !menu.contains(target) && hideMenu()
      );

      // Update the selected text and position of the menu
      let clickEvent;
      // Keep track of the click position to know where to place the menu
      textarea.addEventListener('mousedown', event => (clickEvent = event));
      // Handle text and line selection
      textarea.addEventListener('select', event => {
        const { value, selectionStart, selectionEnd } = textarea;
        const { clientX, clientY } = clickEvent;
        console.log(clickEvent);

        const [lineStart, lineEnd] = this.getLineRange(value, selectionEnd);

        console.log(this);

        this.setState({
          x: clientY,
          y: clientX,
          lineRange: [lineStart, lineEnd],
          selectionRange: [selectionStart, selectionEnd],
          lineSelection: value.substring(lineStart, lineEnd),
          selection: value.substring(selectionStart, selectionEnd),
        });
      });
    }
  }

  onChange(text, line) {
    const { selectionRange, lineRange } = this.state;

    const [start, end] = line ? lineRange : selectionRange;

    this.textarea.value = `${this.textarea.value.slice(
      0,
      start
    )}${text}${this.textarea.value.slice(end)}`;

    this.textarea.setSelectionRange(start, end + (text.length - end - start));
  }

  render() {
    const { x, y, selection, lineSelection } = this.state;

    return (
      <div>
        <MarkdownMenu
          ref={node => (this.menu = node)}
          x={x}
          y={y}
          onChange={this.onChange.bind(this)}
          selection={selection}
          lineSelection={lineSelection}
        />
        <textarea ref={node => (this.textareaRef = node)} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
```

[![Edit 4jv2612w4x](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4jv2612w4x)

The **experimental** compound component example that hasn't been completely tested and the API not yet refined.

```javascript
import React from 'react';
import { render } from 'react-dom';
import { Editor } from 'react-markdown-menu';

class App extends React.Component {
  getLineRange(value, selectionEnd) {
    let length = 0;

    const lines = value.split('\n').map(str => (length += str.length + 1));

    const max = lines.filter(l => l < selectionEnd);

    const start = max[max.length - 1] || 0;
    const end = lines[max.length] - 1;

    return [start, end];
  }

  getSelectionRange(element) {
    const { selectionStart, selectionEnd } = element;

    return [selectionStart, selectionEnd];
  }

  updateText(element, text, [start, end]) {
    element.value = `${element.value.slice(
      0,
      start
    )}${text}${element.value.slice(end)}`;
  }

  updateSelection(element, text, [start, end]) {
    element.setSelectionRange(start, end + (text.length - end - start));
  }

  render() {
    return (
      <Editor
        onChange={console.log}
        updateText={this.updateText}
        updateSelection={this.updateSelection}
        getSelectionRange={this.getSelectionRange}
        onChangeSelection={(element, update) =>
          element.addEventListener('select', update)
        }
        getLineRange={this.getLineRange}
        render={() => <textarea />}
      />
    );
  }
}

render(<App />, document.getElementById('root'));
```

[![Edit 52nnq4pxml](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/52nnq4pxml)
