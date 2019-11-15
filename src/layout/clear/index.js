import React from 'react';
import PropTypes from 'prop-types';
// import { css } from 'emotion';

import { MappedRouter } from '../../routes/RouteGenerator';

class Clear extends React.PureComponent {
  static propTypes = {
    child: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(Object)
    ])
  }

  // _styles = {
  //   root: css({
  //     minHeight: '100vh'
  //   })
  // }

  render() {
    const { child } = this.props;

    return (
      <div>
        <MappedRouter
          routes={child}
        />
      </div>
    );
  }
}

export default Clear;
