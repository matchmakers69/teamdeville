import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import RegistrationButton from '../RegistrationButton';

describe('<RegistrationButton />', () => {
  it('Test click event', () => {
    const showRegisterTipsModal = jest.fn();

    const button = mount(
      <BrowserRouter>
        <RegistrationButton
          showRegisterTipsModal={showRegisterTipsModal}
          onClick={showRegisterTipsModal}
        >
          Registration info
        </RegistrationButton>
      </BrowserRouter>
    );
    button
      .find('button')
      .at(0)
      .props()
      .onClick();
    expect(showRegisterTipsModal).toHaveBeenCalledTimes(1);
  });
  it('displays a link tag with the Register text', () => {
    const button = mount(
      <BrowserRouter>
        <RegistrationButton />
      </BrowserRouter>
    );

    const link = button.find('Link').find({ to: '/registration' });

    expect(link.html()).toBe(
      '<a class="loginButtonText" href="/registration">Register</a>'
    );
  });
});
