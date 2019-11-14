import React from 'react';

const Lazyload = (Children, fallback = (<div>Loading...</div>)) => () => (
  <React.Suspense fallback={fallback}>
    <Children />
  </React.Suspense>
);

export default Lazyload;
