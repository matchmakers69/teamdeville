import DeliveryOptionsItem from './DeliveryOptionsItem';
import PropTypes from 'prop-types';
import React from 'react';
import _isEmpty from 'lodash/isEmpty';

const DeliveryOptions = ({ deliveries }) => {
  return (
    <section
      data-test='sectionDelivery'
      className='mainSection sectionDelivery lightSection'
    >
      <div className='container fluid high-index'>
        <div className='row'>
          {!_isEmpty(deliveries.nodes) && deliveries.nodes ? (
            deliveries.nodes.map((item, index) => (
              <DeliveryOptionsItem
                key={item.id}
                deliveryIndex={index}
                deliveryOption={item}
              />
            ))
          ) : (
            <small>Is loading ...</small>
          )}
        </div>
      </div>
    </section>
  );
};

DeliveryOptions.defaultProps = {
  deliveries: {},
};

DeliveryOptions.propTypes = {
  deliveries: PropTypes.instanceOf(Object).isRequired,
};

export default DeliveryOptions;
