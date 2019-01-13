//@flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../theme.js';

const StyledButton = styled.button`
  box-sizing: border-box;
  font-family: ${props => props.theme.font};
  background-color: ${props => props.theme.primaryColour};
  color: ${props => props.theme.backgroundColour};
  font-weight: 300;
  font-size: 16px;
  width: 90px;
  height: 35px;
  border: solid 1px ${props => props.theme.primaryColour};
  border-radius: 4px;
  transition: all 200ms ease-in-out;
  fill: ${props => props.theme.borderColour};
  cursor: pointer;
  :hover {
    background-color: ${props => props.theme.accentColour};
  }
`;

type Props = {
  onClick: () => void,
  text: string,
};
class Button extends Component<Props> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledButton className={this.props.className} onClick={this.props.onClick}>
          {this.props.text}
        </StyledButton>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button);
