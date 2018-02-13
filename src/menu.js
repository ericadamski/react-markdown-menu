import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Action } from './menu.styled';
import { header, italic, bold, link, quote } from './editor';

const buttons = [
  {
    icon: '👤',
    onClick: header(1),
  },
  {
    icon: '👥',
    onClick: header(2),
  },
  {
    icon: '𝒾',
    onClick: italic,
  },
  {
    icon: '𝌣',
    onClick: bold,
  },
  {
    icon: '🔗',
    onClick: link,
  },
  {
    icon: '❝',
    onClick: quote,
  },
];

export default class Menu extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    selection: PropTypes.string,
  };

  onChange(callback) {
    return event => {
      const { onChange, selection } = this.props;

      event.stopPropagation();

      const modified = callback(selection);

      onChange(modified);
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
          <Action key={button.icon} onClick={this.onChange(button.onClick)}>
            {button.icon}
          </Action>
        ))}
      </Container>
    );
  }
}
