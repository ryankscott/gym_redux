import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../theme.js';
import SavedFilter from './SavedFilter';

const StyledSavedFilterList = styled.div`
  display: flex;
  flex-direction: column;
`;

class SavedFilterList extends Component {
  render() {
    const { filters } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <StyledSavedFilterList>
          {filters.map(filter => {
            return <SavedFilter key={filter.name} filter={filter} />;
          })}
        </StyledSavedFilterList>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters.savedFilters,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedFilterList);
