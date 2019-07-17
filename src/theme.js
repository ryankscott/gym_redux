import { injectGlobal } from 'styled-components';
import { darken } from 'polished';
import Lato1 from '../fonts/lato-v15-latin-300.woff';
import Lato2 from '../fonts/lato-v15-latin-300.woff2';

injectGlobal`
  body {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }
/* lato-300 - latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 300;
  src: local('Lato Light'), local('Lato-Light'),
       url('${Lato2}') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('${Lato1}') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  src: local('Lato Regular'), local('Lato-Regular'),
       url('${Lato2}') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('${Lato1}') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

`;

export const theme = {
  fontColour: '#333333',
  primaryColour: '#35A7FF',
  accentColour: darken(0.05, '#35A7FF'),
  backgroundColour: '#FFFFFF',
  borderColour: '#666666',
  lightAccentColour: darken(0.05, '#FFFFFF'),
  font: 'Lato, "Helvetica Neue", Arial, sans-serif',
};

export const selectStyles = {
  valueContainer: styles => ({
    ...styles,
    padding: '2px 8px',
    ':hover': {},
    ':selected': {},
  }),
  clearIndicator: styles => ({
    ...styles,
    padding: '2px',
  }),
  dropdownIndicator: styles => ({
    ...styles,
    padding: '2px 8px 2px 2px',
  }),
  control: styles => ({
    ...styles,
    boxShadow: 'none',
    borderColor: 'black',
    ':hover': { border: '1px solid black' },
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? '#35A7FF' : '#FFFFFF',
    color: isFocused ? '#FFFFFF' : '#333333',
  }),
  menu: styles => ({ ...styles, marginTop: '2px' }),
  indicatorSeparator: styles => ({ ...styles, display: 'none' }),
  multiValueLabel: styles => ({
    ...styles,
    color: '#FFFFFF',
  }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: '#35a7ff',
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: '#FFFFFF',
    ':hover': {},
  }),
};
