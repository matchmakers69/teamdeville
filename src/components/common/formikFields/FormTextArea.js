import React from 'react';
import { useField } from 'formik';
import styles from './Styles.module.scss';

const FormTextArea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className='text-area' {...field} {...props} />
      {meta.touched && meta.error ? (
        <span className={styles.error}>{meta.error}</span>
      ) : null}
    </>
  );
};

export default FormTextArea;
