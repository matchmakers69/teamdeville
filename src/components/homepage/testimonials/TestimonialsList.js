import React from 'react';
import TestimonialsItem from './TestimonialsItem';
import PropTypes from 'prop-types';

export default function TestimonialsList({ testimonials }) {
  TestimonialsList.propTypes = {
    testimonials: PropTypes.instanceOf(Array).isRequired
  };
  return (
    <>
      {testimonials.map((testimonial, index) => (
        <TestimonialsItem
          data-test='single-testimonial'
          key={testimonial.id}
          testimonial={testimonial}
          index={index}
        />
      ))}
    </>
  );
}
