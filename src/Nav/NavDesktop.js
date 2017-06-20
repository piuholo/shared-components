import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cx from 'classnames';

import { addClass } from '../utils';
import Span from '../Span';
import NavItem from './NavItem';
import { Activatable } from '../Wrapper';


const StyledNav = styled.nav`
  svg {
    fill: currentColor;
  }
  display: flex;
  align-items: stretch;
  white-space: nowrap;
  justify-content: flex-start;
  ${props => (props.theme.background && `background: ${props.theme.background};`)}
  ${props => (props.theme.primaryText && `color: ${props.theme.primaryText};`)}
  padding: 0 2.5rem;
  height: 9rem;
  ${props => (
    props.theme.Media &&
    props.theme.Media.large`
      padding: 0 1.75rem;
      height: 7.5rem;
    `
  )}
  ${NavItem} {
    display: flex;
    align-items: stretch;
    font-size: 1.1rem;
    margin: 0 1.5rem;
    .link {
      display: flex;
      ${Activatable} {
        justify-content: center;
      }
    }
    ${props => (
      props.theme.Media &&
      props.theme.Media.large`
        margin: 0 1rem;
        font-size: 1rem;
        svg {
          height: 2.25rem;
        }
      `
    )}
    ${props => (
      props.theme.Media &&
      props.theme.Media.medium`
        svg {
          height: 2rem;
        }
      `
    )}

  }
  > .menu {
    margin-left: auto;
  }
  > .logo {
    margin-right: 3.5rem;
    align-items: center;
    display: flex;
    ${props => (
      props.theme.Media &&
      props.theme.Media.large`
        margin-right: 2rem;
        svg {
          height: 3.25rem;
        }
      `
    )}
    ${props => (
      props.theme.Media &&
      props.theme.Media.medium`
        margin-right: 0.5rem;
          svg {
            height: 2.75rem;
          }
      `
    )}
  }
  &.scroll {
    height: ${props => props.theme.scrollNavHeight || '3.75rem'};
    padding: 0;
    > .child {
      text-align: center;
    }
    > .logo {
      padding-left: 1.5rem;
      svg {
        height: 2rem;
      }
    }
  }
`;

const Nav = ({
  className,
  logo,
  menu,
  scroll,
  children }) =>
    (<StyledNav className={className} scroll={scroll}>
      <Span className="logo">
        { logo }
      </Span>
      {React.Children.map(
        children,
        child => React.cloneElement(
          child,
          {
            small: scroll,
            className: cx(child.props.className, 'child'),
          })
        )
      }
      { menu && addClass(menu, 'menu') }
    </StyledNav>);

Nav.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.element.isRequired,
  menu: PropTypes.element,
  scroll: PropTypes.bool,
  children: PropTypes.node
};

export default styled(Nav)``;
