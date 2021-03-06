
import React from 'react';
import styled from 'styled-components/primitives';
import PropTypes from 'prop-types';

import Text from './Text';
import { size as utilsSize } from '../utils';

const H3 = styled(({ size, ...rest }) => (
  <Text {...rest} />
))`
  font-weight: 500;
  letter-spacing: -0.4px;
  font-size: ${props => utilsSize(24 * (props.size || 1))};
`;

H3.propTypes = {
  size: PropTypes.number
};

export default H3;
