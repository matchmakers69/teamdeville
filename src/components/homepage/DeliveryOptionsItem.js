import React from 'react';
import styles from './Styles.module.scss';
import { renderDeliveryIcon } from './services/DeliveryIconsTranslator';
import PropTypes from 'prop-types';

const DeliveryOptionsItem = ({
  deliveryOption: { title, content },
  deliveryIndex,
}) => {
  return (
    <div className='col-xs-12 col-md-4'>
      <div className={styles.innerColumnDelivery}>
        <header className={styles.deliveryColHeader}>
          <figure className={styles.deliveryIcon}>
            {renderDeliveryIcon()[deliveryIndex + 1]}
          </figure>
          <h3
            data-test='deliveryOptionsHeader'
            dangerouslySetInnerHTML={{ __html: title }}
            className={styles.colTitle}
          />
        </header>
        <div
          data-test='deliveryExcerpt'
          className={styles.textContainer}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

DeliveryOptionsItem.defaultProps = {
  deliveryOption: { title: 'Worldwide deliveries' },
  deliveryIndex: 1,
};

DeliveryOptionsItem.propTypes = {
  deliveryIndex: PropTypes.number.isRequired,
  deliveryOption: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default DeliveryOptionsItem;
