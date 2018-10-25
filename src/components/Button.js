import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import styled, { ThemeProvider } from "styled-components";
import theme from "../theme.js";
// TODO: Invert button

const StyledButton = styled.div`
  box-sizing: border-box;
  padding: 5px;
  font-family: ${props => props.theme.font};
  background-color: ${props => props.theme.highlightColour};
  color: ${props => props.theme.backgroundColour};
  font-weight: 300;
  display: flex;
  flex-direction: row;
  width: ${props => (props.width ? props.width : "90px")};
  height: ${props => (props.height ? props.height : "35px")};
  justify-content: space-around;
  align-items: center;
  border: solid 1px ${props => props.theme.highlightColour};
  border-radius: 4px;
  opacity: 1;
  transition: all 200ms ease-in-out;
  fill: ${props => props.theme.borderColour};
  cursor: pointer;
`;

type Props = {
  onClick: () => void,
  text: string
};
class Button extends PureComponent<Props> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledButton
          onClick={this.props.onClick}
          width={this.props.width}
          height={this.props.height}
        >
          {this.props.text}
        </StyledButton>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
