import { mount } from 'enzyme';

import React from 'react';
import RegistrationForm from '../RegistrationForm';
import { findByTestAttr } from '../../../../tests/testUtils';

const setup = (propsOverride) => {
  const props = {
    username: 'Username',
    errors: {
      username: '',
      email: '',
      displayName: '',
      password: '',
      success: '',
    },

    ...propsOverride,
  };

  const wrapper = mount(<RegistrationForm {...props} />);

  return {
    wrapper,
    input: wrapper.find('input'),
    props,
  };
};

describe('<RegistrationForm />', () => {
  const changeFn = jest.fn();
  const { input } = setup({ onChange: changeFn });

  it('render all inputs in RegistrationForm', () => {
    expect(input.length).toBe(4);
  });

  it('should have button login disabled by default', () => {
    const props = {
      submitHandle: () => {},
      username: 'Username',
      errors: {
        username: '',
        email: '',
        displayName: '',
        password: '',
        success: '',
      },
    };

    const wrapper = mount(<RegistrationForm {...props} />);
    expect(
      wrapper.find('[data-test="registrationButton"]').prop('disabled')
    ).toBeTruthy();
  });

  it('calls onSubmit prop function when form is submitted', () => {
    let submit = jest.fn();
    const props = {
      submitHandle: () => {},
      username: 'Username',
      errors: {
        username: '',
        email: '',
        displayName: '',
        password: '',
        success: '',
      },
    };

    const wrapper = mount(
      <RegistrationForm submitHandle={submit} {...props} />
    );

    expect(wrapper.find('form').length).toEqual(1);
    const Form = findByTestAttr(wrapper, 'formRegistration');
    expect(typeof Form.props().onSubmit === 'function').toBe(true);
    expect(wrapper.prop('onSubmit') === submit);
  });
});
