import { configure, mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import Loader from '../Loader';
import React from 'react';
import { findByTestAttr } from '../../../../tests/testUtils';

configure({ adapter: new Adapter() });

describe('Loader', () => {
    it('should render the children of the Loader component', () => {
      const wrapper = mount(
        <Loader>
          <div data-test="child-component" className="test">
            Hello
          </div>
        </Loader>,
      );
  
      const child = findByTestAttr(wrapper, 'child-component');
      expect(child.length).toBe(1);
    });
  });