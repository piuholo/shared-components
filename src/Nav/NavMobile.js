import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cx from 'classnames';

import { addClass } from '../utils';
import Span from '../Span/Span';
import FlexWrapper from '../FlexWrapper/FlexWrapper';
import { Cross, Menu } from '../Icons';
import { ButtonNoStyle } from '../Button/Button';

const StyledNav = styled.nav`
  svg {
    fill: currentColor;
  }
  .logo svg {
    height: 3rem;
  }

  .nav-item {
    border-bottom: 2px solid ${props => props.theme.menuBorder};
    display: flex;
    padding: 2.5rem 1.5rem 2.5rem 2.5rem;
    font-size: 2rem;
  }

  .menu-item, .nav-item {
    svg {
      height: 3.5rem;
      width: 3.5rem;
    }
  }
  padding: 1.25rem 1.25rem 0rem;

  ${props => (props.theme.background && `background: ${props.theme.background};`)}
  ${props => (props.theme.primaryText && `color: ${props.theme.primaryText};`)}
`;

const TopBar = FlexWrapper.extend`
  padding-bottom: 1rem;
  align-items: center;
`;

const TopIcons = FlexWrapper.extend`
  align-items: center;
  .text {
    display: none;
  }
  .icon {
    margin: 0;
    line-height:0;
  }
  svg {
    margin-left: 2rem;
    height: 2rem;
  }
`;

class Nav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  render() {
    return (<StyledNav className={this.props.className}>
      <TopBar>
        <Span className="logo">
          { this.props.logo }
        </Span>
        {this.props.menu && <TopIcons>
          { this.props.menu.props.children }
          { this.state.open &&
            <ButtonNoStyle onClick={this.toggleMenu}>
              <Cross height="3rem" />
            </ButtonNoStyle>
          }
          { !this.state.open &&
            <ButtonNoStyle onClick={this.toggleMenu}>
              <Menu height="3rem" />
            </ButtonNoStyle>
          }
        </TopIcons>}
      </TopBar>

      { this.props.menu && this.state.open && React.cloneElement(
        this.props.menu,
        { className: cx(this.props.menu.props.className, 'menu'),
          items: addClass(this.props.children, 'nav-item'),
        },
        addClass(this.props.menu.props.children, 'menu-item')
        )
      }
    </StyledNav>);
  }
}

Nav.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.element.isRequired,
  menu: PropTypes.element,
  children: PropTypes.node,
};

export default styled(Nav)``;