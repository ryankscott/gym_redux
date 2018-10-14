import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import styled, { ThemeProvider } from "styled-components";
import theme from "../theme.js";
import SavedFilter from "./SavedFilter";

const StyledSavedFilterList = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  filters: Array
};

class SavedFilterList extends PureComponent<Props> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledSavedFilterList>
          {this.props.filters.map((filter, index) => (
            <SavedFilter key={index} filter={filter} />
          ))}
        </StyledSavedFilterList>
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedFilterList);
