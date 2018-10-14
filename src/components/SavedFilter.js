import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import styled, { ThemeProvider } from "styled-components";
import theme from "../theme.js";
// TODO: Invert button

const StyledSavedFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.backgroundColour};
  font-weight: 100;
  font-size: 14px;
  margin: 5px;
  padding: 5px 10px;
  &:hover {
    background-color: #555555;
  }
  cursor: pointer;
`;

const StyledDeleteButton = styled.div`
  &:hover {
    color: ${props => props.theme.highlightColour};
  }
`;

type Props = {
  onLoadFilter: () => void,
  onDeleteFilter: () => void
};

class SavedFilter extends PureComponent<Props> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledSavedFilter onClick={this.props.onClick}>
          Grit Cardio at Auckland City on Thursday
          <StyledDeleteButton onClick={this.props.onDelete}>
            X{" "}
          </StyledDeleteButton>
        </StyledSavedFilter>
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedFilter);
