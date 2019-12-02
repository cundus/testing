import React from 'react';

const Lazyload = (Children, fallback = (<></>)) => () => (
  <React.Suspense fallback={fallback}>
    <Children />
  </React.Suspense>
);

export default Lazyload;
