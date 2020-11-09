import * as Yup from 'yup';
const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(alpha, {
      message: 'Enter Valid First Name',
      excludeEmptyString: true,
    })
    .min(2, 'Must be at least 2 characters')
    .max(20, 'Sorry, it is too long')
    .required('Please enter your First Name'),

  lastName: Yup.string()
    .matches(alpha, {
      message: 'Enter Valid Last Name',
      excludeEmptyString: true,
    })
    .min(2, 'Must be at least 2 characters')
    .max(30, 'Sorry, it is too long')
    .required('Please enter your Last Name'),

  address: Yup.string()
    .min(10, 'Must be at least 10 characters')
    .max(30, 'Sorry, Address Line is too long')
    .required('Address Line is required'),

  city: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(40, 'Upps... Town/City is too long')
    .required('Town/City is required'),

  state: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(30, 'Upps... State/Province name is too long'),

  postalCode: Yup.string()
    .min(4, 'Minimum 4 characters')
    .max(10, 'Maximum 10 characters')
    .required('ZIP/Postcode Field is required and cannot be blank'),

  country: Yup.string()
    .min(2, 'Must be at least 2 characters')
    .max(40, 'Maximum 15 characters')
    .required('Country is required'),

  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
});

export const validationSchemaContactForm = Yup.object({
  firstName: Yup.string()
    .matches(alpha, {
      message: 'Enter Valid First Name',
      excludeEmptyString: true,
    })
    .min(2, 'Must be at least 2 characters')
    .max(20, 'Sorry, it is too long')
    .required('Please enter your First Name'),

  lastName: Yup.string()
    .matches(alpha, {
      message: 'Enter Valid Last Name',
      excludeEmptyString: true,
    })
    .min(2, 'Must be at least 2 characters')
    .max(30, 'Sorry, it is too long')
    .required('Please enter your Last Name'),

  feedback: Yup.string()
    .min(30, 'Must be at least 30 characters')
    .max(600, 'Maximum 600 characters')
    .required('Message is required'),

  telephone: Yup.string()
    .matches(phoneRegExp, {
      message: "That doesn't look like a phone number",
      excludeEmptyString: true,
    })
    .min(4, 'Minimum 4 characters')
    .max(20, 'Maximum 10 characters'),

  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
});

export const validationSchemaBilling = Yup.object({
  firstName: Yup.string()
    .matches(alpha, {
      message: 'Enter Valid First Name',
      excludeEmptyString: true,
    })
    .min(2, 'Must be at least 2 characters')
    .max(20, 'Too Long!')
    .required('Please enter your First Name'),

  lastName: Yup.string()
    .matches(alpha, {
      message: 'Enter Valid Last Name',
      excludeEmptyString: true,
    })
    .min(2, 'Must be at least 2 characters')
    .max(30, 'Too Long!')
    .required('Please enter your Last Name'),

  address: Yup.string()
    .min(10, 'Must be at least 10 characters')
    .max(30, 'Too Long!')
    .required('Address is required'),

  city: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(40, 'Upps... city name too long')
    .required('City is required'),

  state: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(30, 'Upps... county name too long')
    .required('County or state are required'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),

  country: Yup.string()
    .min(2, 'Must be at least 2 characters')
    .max(40, 'Maximum 15 characters')
    .default('United Kingdom')
    .required('Country is required'),

  postalCode: Yup.string()
    .min(4, 'Minimum 4 characters')
    .max(10, 'Maximum 10 characters')
    .required('Post code is required'),

  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
});

export const validationSchemaShipping = Yup.object({
  firstName: Yup.string()
    .matches(alpha, {
      message: 'Enter Valid First Name',
      excludeEmptyString: true,
    })
    .min(2, 'Must be at least 2 characters')
    .max(20, 'Too Long!')
    .required('Please enter your First Name'),

  lastName: Yup.string()
    .matches(alpha, {
      message: 'Enter Valid Last Name',
      excludeEmptyString: true,
    })
    .min(2, 'Must be at least 2 characters')
    .max(30, 'Too Long!')
    .required('Please enter your Last Name'),

  address: Yup.string()
    .min(10, 'Must be at least 10 characters')
    .max(30, 'Too Long!')
    .required('Address is required'),

  city: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(40, 'Upps... city name too long')
    .required('City is required'),

  state: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(30, 'Upps... county name too long')
    .required('County or state are required'),

  country: Yup.string()
    .min(2, 'Must be at least 2 characters')
    .max(40, 'Maximum 15 characters')
    .default('United Kingdom')
    .required('Country is required'),

  postalCode: Yup.string()
    .min(4, 'Minimum 4 characters')
    .max(10, 'Maximum 10 characters')
    .required('Post code is required'),
});
