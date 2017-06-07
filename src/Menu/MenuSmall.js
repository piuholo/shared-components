import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LangSelectSmall } from '../LangSelect';
import { Search, TravelCard, SignIn } from '../Icons';
import FlexWrapper from '../FlexWrapper/FlexWrapper';
import IconWithText from '../IconWithText/IconWithText';
import Media from '../../themes/media-templates';


const StyledFlexWrapper = FlexWrapper.extend`
  align-items: center;
  justify-content: flex-end;
  .icon {
    line-height: 0;
    margin: 0;
    display: flex;
    align-items: center;
  }
  > * {
    height: 100%;
    display: flex;
    padding: 0 0.75rem;
  }
  .select-wrapper {
    top: 3.5rem;
  }

  ${Media.large`
    .icon svg, .search-icon {
      height: 1.75rem;
    }
  `}

  svg {
    fill: currentColor;
  }
  > * {
    ${props => (props.theme.menuBorder && `border-left: 1px solid ${props.theme.menuBorder};`)}
    padding: 0.5rem;
  }
  ${props => (props.theme.background && `background: ${props.theme.background};`)}
  ${props => (props.theme.primaryText && `color: ${props.theme.primaryText};`)}
`;

const StyledIWT = IconWithText.extend`
  .text {
    display: none;
  }
  ${Media.medium`
    display: none;
  `}
`;

const MenuSmall = ({
  languages,
  changeLanguage,
  selectedLanguage,
  langSelectOpen,
  className,
  children
}) => (
  <StyledFlexWrapper className={className}>
    {children}
    <Search
      className="search-icon"
      height="2rem"
      width="2rem"
    />
    <LangSelectSmall
      languages={languages}
      selectedLanguage={selectedLanguage}
      changeLanguage={changeLanguage}
      open={langSelectOpen}
    />
  </StyledFlexWrapper>
);

const defaultChildren = [
  <StyledIWT
    icon={<SignIn height="2rem" />}
    text="Matkakortti"
    textPosition="Right"
    key="signin"
  />,
  <StyledIWT
    icon={<TravelCard height="2rem" />}
    text="Kirjaudu"
    textPosition="Right"
    key="travelcard"
  />
];


MenuSmall.defaultProps = {
  children: defaultChildren
};


MenuSmall.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    name: PropTypes.string.isRequired
  })),
  changeLanguage: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  langSelectOpen: PropTypes.bool,
  className: React.PropTypes.string,
  children: PropTypes.node
};

export default styled(MenuSmall)``;
