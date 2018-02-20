import React from 'react';
import styled from 'styled-components';
import { mount } from 'enzyme';

import { Wrapper } from '../editor.styled';
import Editor from '../editor';
import Menu from '../menu';

const oldError = console.error;
const MyComponent = styled.div``;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = oldError;
});

describe('editor', () => {
  describe('rendering', () => {
    let wrapper;

    afterEach(() => wrapper && wrapper.unmount());

    it("shouldn't render if there is no children or render prop", () => {
      // Assert
      expect((wrapper = mount(<Editor />)).html()).toBeNull();
    });

    describe('should automatically call getEditorProps if a DOM node is passed as', () => {
      it('children', () => {
        // Arrange
        const renderFn = () => <div />;

        // Act
        wrapper = mount(<Editor>{renderFn}</Editor>);
        const instance = wrapper.instance();

        // Assert
        expect(instance.getEditorProps).toBeTruthy();
      });

      it('render prop', () => {
        // Arrange
        const renderFn = () => <div />;

        // Act
        wrapper = mount(<Editor render={renderFn} />);
        const instance = wrapper.instance();

        // Assert
        expect(instance.getEditorProps).toBeTruthy();
      });
    });

    it('should render when passing a composite component and calling getEditorProps specifing the ref', () => {
      // Arrange
      const renderFn = ({ getEditorProps }) => (
        <MyComponent {...getEditorProps({ refKey: 'innerRef' })} />
      );

      // Assert
      expect(() => mount(<Editor render={renderFn} />)).not.toThrow();
    });

    it('passing a non-DOM element and not calling getEditorProps should through an error', () => {
      // Arrange
      const renderFn = () => <MyComponent />;

      // Assert
      expect(() =>
        mount(<Editor render={renderFn} />)
      ).toThrowErrorMatchingSnapshot();
    });

    it('returning a DOM element and calling getEditorProps with a refKey results in an error', () => {
      // Arrange
      const renderFn = ({ getEditorProps }) => <div {...getEditorProps()} />;

      // Assert
      expect(() =>
        mount(<Editor render={renderFn} />)
      ).toThrowErrorMatchingSnapshot();
    });

    it('returning a composite component and calling getEditorProps without a refKey results in an error', () => {
      // Arrange
      const renderFn = ({ getEditorProps }) => (
        <MyComponent {...getEditorProps()} />
      );

      // Assert
      expect(() =>
        mount(<Editor render={renderFn} />)
      ).toThrowErrorMatchingSnapshot();
    });

    describe('elements', () => {
      it('should render a Wrapper component', () => {
        // Assert
        expect(
          (wrapper = mount(<Editor render={() => <div />} />))
            .find(Wrapper)
            .exists()
        ).toBeTruthy();
      });

      it('should render a Menu component', () => {
        // Assert
        expect(
          (wrapper = mount(<Editor render={() => <div />} />))
            .find(Menu)
            .exists()
        ).toBeTruthy();
      });
    });

    describe('events', () => {
      //   onChange: () => {},
      // getLineRange: () => {},
      // getSelectionRange: () => {},
      // updateText: () => {},
      // updateSelection: () => {},
      // onChangeSelection: () => {},
      describe('should emit from selection$ when onChangeSelection is called ', () => {
        it('should be a function that gets passed the root element and the next handler', () => {
          // Arrange
          const didChangeSelection = jest.fn();

          // Act
          wrapper = mount(
            <Editor
              onChangeSelection={didChangeSelection}
              render={() => <div />}
            />
          );

          // Assert
          expect(didChangeSelection).toBeCalled();
        });

        it('can return the new value', () => {});
      });
    });
  });
});
