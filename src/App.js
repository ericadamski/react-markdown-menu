import React, { Component } from "react";

import { MediumMenu } from "react-markdown-menu";

import Hero from "./hero";
import { Page, Header, Title } from "./app.styled";

class App extends Component {
  render() {
    return (
      <Page>
        <Header>
          <Title>React-Markdown-Menu</Title>
        </Header>
        <Hero />
      </Page>
    );
  }
}

export default App;
