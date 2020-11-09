import React from 'react';
import PropTypes from 'prop-types';
import AddTestimonialForm from './AddTestimonialForm';
import styles from './Styles.module.scss';
import { Formik } from 'formik';
import { validationSchema } from './services/validationSchema';

const AddTestimonialDetails = ({
  values,
  isSending,
  handleAddNewTestimonial,
  hideTestimonialButton,
  showAddTestimonialForm,
}) => {
  return (
    <div className={styles.formAddTestimonialWrapper}>
      {hideTestimonialButton && showAddTestimonialForm && (
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleAddNewTestimonial}
          enableReinitialize={true}
          initialValues={values}
        >
          {(props) => <AddTestimonialForm isSending={isSending} {...props} />}
        </Formik>
      )}
    </div>
  );
};

AddTestimonialDetails.propTypes = {
  values: PropTypes.shape({
    username: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  isSending: PropTypes.bool.isRequired,
  handleAddNewTestimonial: PropTypes.func.isRequired,
  hideTestimonialButton: PropTypes.bool.isRequired,
  showAddTestimonialForm: PropTypes.bool.isRequired,
};

export default AddTestimonialDetails;
