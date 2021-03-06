import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/primitives';
import { lighten } from 'polished';

import View from '../View';
import { size, WindowSize } from '../utils';
import { H2 } from '../Typography';

const LARGE_MOBILE = 640;

const StyledH2 = WindowSize(styled(({ width, ...rest }) => (
  <H2 {...rest} size={width >= LARGE_MOBILE ? 1.1 : 0.9} />
))`
  margin-bottom: ${size(40)};
  text-align: center;
`);

const MobileContainer = styled(({ border, title, children, ...rest }) => (
  <View {...rest}>
    {!!title && <StyledH2>{title}</StyledH2>}
    {children}
  </View>
))`
  padding-vertical: ${size(50)};
  border-style: solid;
  border-color: ${props => lighten(0.15, props.theme.default)};
  border-top-width: ${props => (props.border ? '2px' : '0px')};
`;


MobileContainer.propTypes = {
  border: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default MobileContainer;

