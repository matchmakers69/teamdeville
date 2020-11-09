import React, { useRef } from 'react';

import Loader from '../../components/common/Loader';
import { Redirect } from 'react-router-dom';
import { fetchContactPageData } from '../../pages/services/contactPageData';
import styles from './Styles.module.scss';
import { useFetch } from '../../HOOKS/useFetch';

const ContactDetails = () => {
  const componentIsMounted = useRef(true);
  const { isLoading, error, data = { acf: {} } } = useFetch(
    fetchContactPageData,
    componentIsMounted,
    {}
  );

  if (error) {
    return <Redirect to='/' />;
  }

  if (isLoading) {
    return <Loader data-test='pageLoader' isLoading={isLoading} />;
  }
  const page = data;

  return (
    <div data-test='contact-details-container'>
      <div className={styles.contactRow}>
        <p
          dangerouslySetInnerHTML={{ __html: page.acf.address_details_header }}
          className={styles.strongTag}
        />
        <p dangerouslySetInnerHTML={{ __html: page.acf.address_content }} />
      </div>
      <div className={styles.contactRow}>
        <p
          dangerouslySetInnerHTML={{ __html: page.acf.email_address_header }}
          className={styles.strongTag}
        />
        <a
          href={`mailto:${page.acf.email_address}`}
          dangerouslySetInnerHTML={{ __html: page.acf.email_address }}
        />
      </div>
      <div className={styles.contactRow}>
        <p
          dangerouslySetInnerHTML={{ __html: page.acf.mobile_header }}
          className={styles.strongTag}
        />
        <a
          href={`tel:+44${page.acf.mobile_number}`}
          dangerouslySetInnerHTML={{ __html: page.acf.mobile_number }}
        />
      </div>
    </div>
  );
};

export default ContactDetails;
