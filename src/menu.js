import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Action } from './menu.styled';
import { header, italic, bold, link, quote } from './editor-utils';

const buttons = [
  {
    icon: '👤',
    onClick: header(1),
    isLine: true,
  },
  {
    icon: '👥',
    onClick: header(2),
    isLine: true,
  },
  {
    icon: '𝒾',
    onClick: italic,
    isLine: false,
  },
  {
    icon: '𝌣',
    onClick: bold,
    isLine: false,
  },
  {
    icon: '🔗',
    onClick: link,
    isLine: false,
  },
  {
    icon: '❝',
    onClick: quote,
    isLine: true,
  },
];

export default class Menu extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    selection: PropTypes.string,
  };

  onChange(callback, isLine) {
    return event => {
      const { onChange, selection } = this.props;

      event.stopPropagation();

      const modified = callback(selection);

      onChange(modified, isLine);
    };
  }

  render() {
    const { selection, x, y } = this.props;

    return (
      <Container
        visible={selection && selection.length > 0}
        position={{ x, y }}
      >
        {buttons.map(button => (
          <Action
            key={button.icon}
            onClick={this.onChange(button.onClick, button.isLine)}
          >
            {button.icon}
          </Action>
        ))}
      </Container>
    );
  }
}
