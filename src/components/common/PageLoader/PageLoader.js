import React, { Suspense } from 'react';
import DelayedFallback from '../DelayedFallback';

const PageLoader = (props) => {
  const isLoading = true;
  const LoadedComponent = props.component;
  return (
    <Suspense fallback={<DelayedFallback isLoading={isLoading} />}>
      <LoadedComponent {...props} />
    </Suspense>
  );
};

export default PageLoader;
