import { injectGlobal } from 'styled-components';
import { darken } from 'polished';

injectGlobal`
  @font-face {
    font-family: Lato;
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
