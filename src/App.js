import React, { Component } from "react";

import Menu from "./hero";
import { Page, Header, Title, Editor } from "./app.styled";

class App extends Component {
  render() {
    return (
      <Page>
        <Header>
          <Title>React-Markdown-Menu</Title>
        </Header>
        <Menu>
          {({ getEditorProps }) => (
            <Editor {...getEditorProps({ refKey: "innerRef" })} />
          )}
        </Menu>
      </Page>
    );
  }
}

export default App;
