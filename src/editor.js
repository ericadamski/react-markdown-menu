import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';

import { unwrapArray, noop, isDOMElement, getElementProps } from './utils';
import Menu from './menu';
import { Wrapper } from './editor.styled';

export default class Editor extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    getLineRange: PropTypes.func,
    getSelectionRange: PropTypes.func,
    updateText: PropTypes.func,
    updateSelection: PropTypes.func,
    onChangeSelection: PropTypes.func,
    shouldHideMenu: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {},
    getLineRange: () => {},
    getSelectionRange: () => {},
    updateText: () => {},
    updateSelection: () => {},
    onChangeSelection: () => {},
  };

  state = { selection: null, start: -1, end: -1, top: -1, left: -1 };
  selection$ = new Subject();

  componentDidMount() {
    if (this._rootNode) {
      this.props.onChangeSelection(
        this._rootNode,
        this.selection$.next.bind(this.selection$)
      );

      const menu = findDOMNode(this.menuRef);

      this.click$ = Observable.fromEvent(document, 'mousedown').filter(
        ({ target }) => !menu.contains(target)
      );

      this.click$
        .merge(Observable.fromEvent(this._rootNode, 'keydown'))
        .subscribe(() => this.setState({ selection: null }));

      this.value$ = this.selection$
        .withLatestFrom(this.click$)
        .subscribe(([select, click]) => {
          const { value, selectionStart, selectionEnd } = this._rootNode;

          this.setState({
            top: click.clientY,
            left: click.clientX,
            selection: value.substring(selectionStart, selectionEnd),
          });
        });
    }
  }

  componentWillUnmount() {
    this.click$ instanceof Subscriber &&
      this.click$
        .remove(this.value$)
        .remove(this.selection$)
        .unsubscribe();
  }

  onChange(text, line) {
    const selectionRange = line
      ? this.props.getLineRange(this._rootNode)
      : this.props.getSelectionRange(this._rootNode);

    this.props.onChange(text);
    this.props.updateText(this._rootNode, text, selectionRange);
    this.props.updateSelection(this._rootNode, text, selectionRange);
  }

  getStateAndHelpers() {
    const { selection } = this.state;
    const { getEditorProps } = this;

    return { getEditorProps, selection };
  }

  editorRef = node => (this._rootNode = node);

  getEditorProps = (
    { refKey = 'ref', ...rest } = {},
    { suppressRefError = false } = {}
  ) => {
    // this is used in the render to know whether the user has called getEditorProps.
    // It uses that to know whether to apply the props automatically
    this.getEditorProps.called = true;
    this.getEditorProps.refKey = refKey;
    this.getEditorProps.suppressRefError = suppressRefError;
    return { [refKey]: this.editorRef, ...rest };
  };

  render() {
    const { selection, top, left } = this.state;

    const rerender = el => (
      <Wrapper>
        <Menu
          ref={node => (this.menuRef = node)}
          x={left}
          y={top}
          selection={selection}
          onChange={this.onChange.bind(this)}
        />
        {el}
      </Wrapper>
    );

    const children = unwrapArray(
      this.props.render || this.props.children,
      noop
    );
    // we reset this so we know whether the user calls getEditorProps during
    // this render. If they do then we don't need to do anything,
    // if they don't then we need to clone the element they return and
    // apply the props for them.
    this.getEditorProps.called = false;
    this.getEditorProps.refKey = undefined;
    this.getEditorProps.suppressRefError = undefined;

    const element = unwrapArray(children(this.getStateAndHelpers()));

    if (!element) {
      return null;
    }
    if (this.getEditorProps.called) {
      if (!this.getEditorProps.suppressRefError) {
        validateGetEditorPropsCalledCorrectly(element, this.getEditorProps);
      }
      return rerender(element);
    } else if (isDOMElement(element)) {
      // they didn't apply the root props, but we can clone
      // this and apply the props ourselves
      return rerender(
        React.cloneElement(
          element,
          this.getEditorProps(getElementProps(element))
        )
      );
    } else {
      // they didn't apply the root props, but they need to
      // otherwise we can't query around the autocomplete
      throw new Error(
        'Markdown-Menu: If you return a non-DOM element, you must use apply the getEditorProps function'
      );
    }
  }
}

function validateGetEditorPropsCalledCorrectly(element, { refKey }) {
  const refKeySpecified = refKey !== 'ref';
  const isComposite = !isDOMElement(element);
  if (isComposite && !refKeySpecified) {
    throw new Error(
      'Markdown-Menu: You returned a non-DOM element. You must specify a refKey in getEditorProps'
    );
  } else if (!isComposite && refKeySpecified) {
    throw new Error(
      `Markdown-Menu: You returned a DOM element. You should not specify a refKey in getEditorProps. You specified "${refKey}"`
    );
  }
  if (!getElementProps(element)[refKey]) {
    throw new Error(
      `Markdown-Menu: You must apply the ref prop "${refKey}" from getEditorProps onto your root element.`
    );
  }
}
