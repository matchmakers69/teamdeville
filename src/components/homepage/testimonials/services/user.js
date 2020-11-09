import React from 'react';
import { Link } from 'react-router-dom';
import constants from '../../../../constants';
import _isEmpty from 'lodash/isEmpty';
import styles from '../Styles.module.scss';

export const getUserByRole = (user) => {
  let userRole = '';
  const { roles } = user;
  const { CONTACT_US } = constants;
  const customersRoles =
    roles && roles.length > 0 && !_isEmpty(roles) ? roles : ['subscriber'];

  userRole = customersRoles[0];
  if (userRole === 'subscriber') {
    return (
      <div className={styles.alertTestimonilas}>
        <p>
          Sorry, you are not authorized to add testimonial... Contact with
          administrator.
        </p>

        <button type='button' className='buttonLogin registerBtn'>
          <Link to={CONTACT_US} className='loginButtonText'>
            Contact us
          </Link>
        </button>
      </div>
    );
  }
  return userRole;
};
