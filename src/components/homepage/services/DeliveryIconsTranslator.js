import React from 'react';
import Svg from '../../svg';

export const renderDeliveryIcon = (props) => {
  return {
    1: <Svg name='planeIcon' {...props} />,
    2: <Svg name='truckIcon' {...props} />,
    3: <Svg name='returnIcon' {...props} />,
  };
};
