import React from 'react';
import styles from './Styles.module.scss';

const TestimonialsItem = props => {
  const { testimonial } = props;
  const { content, title } = testimonial;
  return (
    <div className={styles.testimonialSingleSlide}>
      <blockquote className={styles.testimonialsSliderQuote}>
        <div
          className={styles.textTestimonial}
          dangerouslySetInnerHTML={{ __html: content.rendered }}
        />
        <cite><strong>{title.rendered}</strong></cite>
      </blockquote>
    </div>
  );
};

export default TestimonialsItem;