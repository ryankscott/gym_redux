// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../theme.js';
import { device } from '../devices.js';

const StyledButtonGroup = styled.div`
  border: none;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1 1 0;
  width: 100%;
  padding: 2px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  justify-content: center;
  border-right: 1px solid ${props => props.theme.borderColour};
  font-family: ${props => props.theme.font};
  color: ${props => (props.selected ? props.theme.backgroundColour : props.theme.borderColour)};
  background-color: ${props =>
    props.selected ? props.theme.primaryColour : props.theme.backgroundColour};
  font-weight: 300;
  font-size: 14px;
  width: 100%;
  cursor: pointer;
  tabindex: 0;
  :hover {
    background-color: ${props =>
      props.selected ? props.theme.accentColour : props.theme.lightAccentColour};
  }
  &:first-child {
    border-radius: 5px 0px 0px 5px;
  }
  &:last-child {
    border-radius: 0px 5px 5px 0px;
    border-right: none;
  }
  @media ${device.mobileS} {
    height: 30px;
  }

  @media ${device.mobileL} {
    height: 30px;
  }

  @media ${device.tablet} {
    height: 35px;
  }
`;

type Props = {
  options: Object,
  onChange: value => void,
  selectedValue: Object,
};

class ButtonGroup extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { options, selectedValue } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <StyledButtonGroup>
          {Object.entries(options).map(([k, v], index) => {
            return (
              <StyledButton
                key={index}
                selected={selectedValue && k in selectedValue}
                onClick={() => this.props.onChange({ [k]: v })}
              >
                {k}
              </StyledButton>
            );
          })}
        </StyledButtonGroup>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonGroup);
