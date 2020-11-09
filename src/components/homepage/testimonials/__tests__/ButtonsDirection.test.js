import React from 'react';
import { mount } from 'enzyme';
import { ButtonsDirection } from '../ButtonsDirection';

const mockGoNextPrev = jest.fn();

describe('testing buttons for testimonials slider', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ButtonsDirection disabledPrev={() => {}} gotoNextPrev={mockGoNextPrev} />
    );
  });
  it('should have prev button', () => {
    wrapper.update();
    expect(wrapper.find('[data-test="button-prev"]').length).toEqual(1);
  });
  it('should have a prev <button> without disabled prop', () => {
    const button = wrapper.find('[data-test="button-prev"]');
    expect(button.props().disabled).toEqual(undefined);
  });
  it('cannot click button if disabled', () => {
    const button = wrapper.find('[data-test="button-prev"]');
    button.simulate('click');

    expect(mockGoNextPrev).toHaveBeenCalled();
    expect(mockGoNextPrev).toHaveBeenCalledTimes(1);
  });

  it('should have next button', () => {
    wrapper.update();
    expect(wrapper.find('[data-test="button-next"]').length).toEqual(1);
  });
  it('should click next button', () => {
    const buttonNext = wrapper.find('[data-test="button-next"]');
    buttonNext.simulate('click');

    expect(mockGoNextPrev).toHaveBeenCalled();
    expect(mockGoNextPrev).toHaveBeenCalledTimes(1);
  });
});
