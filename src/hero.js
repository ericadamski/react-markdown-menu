import React, { Component } from "react";

import { Section, Editor } from "./hero.styled";

export default class Hero extends Component {
  state = { selection: null };

  componentDidMount() {
    if (this.area) {
      this.area.addEventListener("select", () => {
        const { value, selectionStart, selectionEnd } = this.area;

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
      <Section>
        <Editor />
      </Section>
    );
  }
}
