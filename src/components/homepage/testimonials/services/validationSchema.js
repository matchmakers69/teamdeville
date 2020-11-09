import * as Yup from 'yup';

export const validationSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Must be at least 2 characters')
    .max(40, 'Too Long!')
    .required('Please enter username'),

  content: Yup.string()
    .min(20, 'Must be at least 50 characters')
    .max(500, 'Too Long!')
    .required('Your testimonial is still not finished'),
});
