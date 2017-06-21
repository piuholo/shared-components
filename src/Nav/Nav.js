import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransitionGroup } from 'react-transition-group';

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';
import { MenuMobile, MenuSmall } from '../Menu';
import Span from '../Span/Span';

const Header = styled.header`
  ${NavMobile} {
    display: none;
  }
  ${NavDesktop} {
    &.scroll {
      position: fixed;
      width: 100%;
      &.scroll-enter {
        top: -5rem; // scroll nav height is 4rem
      }

      &.scroll-enter.scroll-enter-active {
        top: 0rem;
        transition: top .35s ease-in;
      }

      &.scroll-leave {
        top: 0rem;
      }

      &.scroll-leave.scroll-leave-active {
        top: -5rem;
        transition: top .35s ease-in;
      }
    }
  }
  ${props => (
    props.theme.Media &&
    props.theme.Media.small`
    ${NavMobile} {
      display: block;
    }
    ${NavDesktop} {
      display: none;
    }
    `
  )}
`;

class Nav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { scrollNavVisible: false };
    this.lastScrollValue = 0;
    // https://gist.github.com/Restuta/e400a555ba24daa396cc
    this.onScroll = this.onScroll.bind(this);
  }
  componentDidMount() {
    document.addEventListener('scroll', this.onScroll, true);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll, true);
  }

  onScroll(evt) {
    // Visible when scrolling up and we have scrolled past the regular nav
    const scrolledPastNav = this.nav &&
                            this.nav.firstChild &&
                            this.nav.firstChild.offsetHeight < evt.target.body.scrollTop;

    const scrollingUp = evt.target.body.scrollTop < this.lastScrollValue;

    // Save current scroll value
    this.lastScrollValue = evt.target.body.scrollTop;

    // Call setState only if state will change
    if ((scrolledPastNav && scrollingUp) !== this.state.scrollNavVisible) {
      this.setState({ scrollNavVisible: (scrolledPastNav && scrollingUp) });
    }
  }

  render() {
    return (
      <Header className={this.props.className}>
        <CSSTransitionGroup
          transitionName="scroll"
          transitionEnterTimeout={350}
          transitionLeaveTimeout={350}
        >
          { this.props.menu && this.state.scrollNavVisible && <NavDesktop
            className="scroll"
            scroll
            logo={this.props.logo}
            menu={
              this.props.menu &&
              <MenuSmall {...this.props.menu.props}>
                {React.Children.map(
                  this.props.menu.props.children,
                  child => React.cloneElement(child, { small: true })
                  )
                }
              </MenuSmall>
            }
          >
            {React.Children.map(
              this.props.children,
              child => React.cloneElement(child, { textPosition: 'Bottom', small: true })
              )
            }
          </NavDesktop>
        }
        </CSSTransitionGroup>
        {/* eslint-disable no-return-assign */}
        <Span innerRef={x => this.nav = x}>
          {/* eslint-enable no-return-assign */}
          <NavDesktop
            logo={this.props.logo}
            menu={this.props.menu}
          >
            {this.props.children}
          </NavDesktop>
        </Span>
        <NavMobile
          logo={this.props.logo}
          menu={this.props.menu &&
            <MenuMobile {...this.props.menu.props}>
              {React.Children.map(
                this.props.menu.props.children,
                child => React.cloneElement(child, { textPosition: 'Bottom' })
                )
              }
            </MenuMobile>
          }
        >
          {React.Children.map(
            this.props.children,
            child => React.cloneElement(child, { textPosition: 'Right' })
            )
          }
        </NavMobile>
      </Header>
    );
  }
}

Nav.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.element.isRequired,
  menu: PropTypes.element,
  children: PropTypes.node
};

export default styled(Nav)``;
