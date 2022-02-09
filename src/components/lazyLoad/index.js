import React from "react";
import Loading from "../loading";

const Lazyload = (Children, fallback) => () =>
  (
    <React.Suspense fallback={<Loading />}>
      <Children />
    </React.Suspense>
  );

export default Lazyload;
