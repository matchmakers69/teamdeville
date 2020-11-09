import { mount } from 'enzyme';

import React from 'react';
import SignIn from '../SignIn';
import { findByTestAttr } from '../../../../../tests/testUtils';

const setup = () => {
  const props = {
    credentials: {
      username: '',
      password: '',
    },
  };

  const wrapper = mount(
    <SignIn onSubmit={() => {}} onChange={() => {}} {...props} />
  );

  return {
    wrapper,
    input: wrapper.find('input'),
    props,
  };
};

describe('<SignIn />', () => {
  const changeFn = jest.fn();
  const { input } = setup({ onChange: changeFn });
  const { wrapper } = setup();

  it('login form should exist', () => {
    const component = findByTestAttr(wrapper, 'LoginForm');
    expect(component.length).toBe(1);
  });

  it('check if there are form inputs', () => {
    expect(input.length).toBe(2);
  });

  it('username should have placeholder', () => {
    expect(
      wrapper
        .find('input')
        .at(0)
        .props().placeholder
    ).toBe('Username max 20 characters');
  });
  it('password should have placeholder', () => {
    expect(
      wrapper
        .find('input')
        .at(1)
        .props().placeholder
    ).toBe('Password');
  });

  it('calls onSubmit prop function when form is submitted', () => {
    let submit = jest.fn();

    const props = {
      handleSubmit: () => {},
      credentials: {
        username: '',
        password: '',
      },
    };

    const wrapper = mount(
      <SignIn onChange={() => {}} handleSubmit={submit} {...props} />
    );

    const Form = findByTestAttr(wrapper, 'LoginForm');
    expect(typeof Form.props().onSubmit === 'function').toBe(true);
    expect(wrapper.prop('onSubmit') === submit);
  });
});
