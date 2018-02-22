import React from 'react';

import { shallow } from 'enzyme';

import Menu from '../menu';
import { Container, Action } from '../menu.styled';
import { header } from '../editor-utils';

describe('Menu', () => {
  const noop = () => null;

  describe('rendering', () => {
    let wrapper;

    afterEach(() => wrapper && wrapper.unmount());

    it('should render', () => {
      // Assert
      expect(
        (wrapper = shallow(<Menu onChange={noop} />)).exists()
      ).toBeTruthy();
    });

    it('should render a Container component', () => {
      // Assert
      expect(
        (wrapper = shallow(<Menu onChange={noop} />)).find(Container).exists()
      ).toBeTruthy();
    });

    it('should render 6 buttons', () => {
      // Assert
      expect(
        (wrapper = shallow(<Menu onChange={noop} />)).find(Action)
      ).toHaveLength(6);
    });
  });

  describe('style', () => {
    let wrapper;

    afterEach(() => wrapper && wrapper.unmount());

    describe('Container', () => {
      it('should be hidden when there is no selection', () => {
        // Assert
        expect(
          (wrapper = shallow(<Menu selection={'hello'} onChange={noop} />))
            .find(Container)
            .prop('visible')
        ).toBeTruthy();
      });

      it('should translate the position to the Container', () => {
        // Arrange
        const [x, y] = [10, 10];

        // Assert
        expect(
          (wrapper = shallow(<Menu x={x} y={y} onChange={noop} />))
            .find(Container)
            .prop('position')
        ).toEqual({ x, y });
      });
    });
  });

  describe('actoins', () => {
    let wrapper;

    afterEach(() => wrapper && wrapper.unmount());

    it('should call onChange when a button is clicked', () => {
      // Arrange
      const selection = 'hello';
      const onChange = jest.fn();

      // Act
      wrapper = shallow(
        <Menu
          selection={selection}
          lineSelection={selection}
          onChange={onChange}
        />
      );

      wrapper
        .find(Action)
        .first()
        .simulate('click', { stopPropagation: noop });

      // Assert
      expect(onChange).toBeCalled();
      expect(onChange).toBeCalledWith(header(1, selection), true);
    });
  });
});
