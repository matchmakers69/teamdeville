import React from 'react';
import Input from '../Input';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const setup = propsOverride => {
  const props = {
    id: '123124',
    type: 'text',
    label: 'Test',
    ...propsOverride
  };

  const wrapper = mount(<Input {...props} />);

  return {
    wrapper,
    input: wrapper.find('input'),

    props
  };
};

describe('<Input />', () => {
  it('should fire the function passed through the onChange prop when changing the value of the input field', () => {
    const changeFn = jest.fn();
    const { input } = setup({ onChange: changeFn });

    input.simulate('change', { target: { value: 'c-c-c-hanges!' } });
    expect(changeFn.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        type: 'change',
        target: expect.objectContaining({
          value: 'c-c-c-hanges!'
        })
      })
    );
  });
});
