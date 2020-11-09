import React from 'react';
import PropTypes from 'prop-types';
import SpinnerIcon from '../components/common/SpinnerIcon';

function PagesLoader(Component) {
  return function PagesLoaderComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <div>
        <div>
          <div>
            <SpinnerIcon />
          </div>
        </div>
      </div>
    );
  };
}

PagesLoader.propsTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default PagesLoader;
