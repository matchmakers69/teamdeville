import React from 'react';

import ArrowPrev from '../../images/ArrowPrev';
import ArrowNext from '../../images/ArrowNext';
import TruckIcon from '../../images/TruckIcon';
import ReturnIcon from '../../images/ReturnIcon';
import PlaneIcon from '../../images/PlaneIcon';
import LogoDeville from '../../images/LogoDeville';
import ArrowDown from '../../images/ArrowDown';
import CategoryIcon from '../../images/CategoryIcon';
import TwitterIcon from '../../images/TwitterIcon';
import FacebookIcon from '../../images/FacebookIcon';
import SearchIcon from '../../images/SearchIcon';
import TriggerSearch from '../../images/TriggerSearch';
import CrossIcon from '../../images/CrossIcon';
import CartIcon from '../../images/CartIcon';

const icons = props => {
  /* eslint-disable */
  const { ...relevantProps } = props;
  return ({
   
    arrowPrev: <ArrowPrev {...relevantProps} />,
    arrowNext: <ArrowNext {...relevantProps} />,
    truckIcon: <TruckIcon {...relevantProps} />,
    returnIcon: <ReturnIcon {...relevantProps} />,
    planeIcon: <PlaneIcon {...relevantProps} />,
    logoDeville: <LogoDeville {...relevantProps} />,
    arrowDown: <ArrowDown {...relevantProps} />,
    categoryIcon: <CategoryIcon {...relevantProps} />,
    twitterIcon: <TwitterIcon {...relevantProps} />,
    facebookIcon: <FacebookIcon {...relevantProps} />,
    searchIcon: <SearchIcon {...relevantProps} />,
    triggerSearch: <TriggerSearch { ...relevantProps} />,
    crossIcon: <CrossIcon { ...relevantProps} />,
    cartIcon: <CartIcon { ...relevantProps} />

  });
   /* eslint-enable */
};

export default ({ name, ... props }) => {
  if (icons(props)[name] === undefined) {
    return name;
  }
  return icons(props)[name];
};