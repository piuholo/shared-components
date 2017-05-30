/* eslint-disable */
// import React from 'react';
// import { Link } from 'react-router';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { setAddon, storiesOf } from '@kadira/storybook';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { action } from '@kadira/storybook-addon-actions';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { withKnobs, text } from '@kadira/storybook-addon-knobs';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import JSXAddon from 'storybook-addon-jsx';
//
// import Nav from '../src/Nav/Nav';
// import Logo from '../src/Icons';
//
// setAddon(JSXAddon);
//
// const languages = [{ id: 'fi', name: 'FI' }, { id: 'sv', name: 'SV' }, { id: 'en', name: 'EN' }];
//
// const stories = storiesOf('Nav', module);
//
// stories.addDecorator(withKnobs);
//
// stories.addWithJSX('without title', () =>
//   (<Nav logo={<Logo fill="#fff" height="auto" />} alt={'HSL'} languages={languages} changeLanguage={action('language changed')}>
//     <Link to="/">Koti</Link>
//     <Link to="/test">Minun kortit</Link>
//     <Link to="/test">Asetukset</Link>
//     <Link to="/test">Kirjaudu ulos</Link>
//   </Nav>), { displayName: 'Nav' }
// )
//   .addWithJSX('with title', () => {
//     const title = text('Title', 'Some title');
//     return (<Nav logo={<Logo fill="#fff" height="auto" />} alt={'HSL'} languages={languages} changeLanguage={action('language changed')} title={title}>
//       <Link to="/">Koti</Link>
//       <Link to="/test">Minun kortit</Link>
//       <Link to="/test">Asetukset</Link>
//       <Link to="/test">Kirjaudu ulos</Link>
//     </Nav>);
//   }, { displayName: 'Nav' });