import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../theme.js';
import { loadFilters, deleteFilters } from '../actions/actions.js';

const StyledSavedFilterContent = styled.div`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.backgroundColour};
  font-weight: 300;
  font-size: 14px;
  align-self: center;
  margin: 2px;
  padding: 5px 0px 5px 10px;
  width: 100%;
`;
const StyledSavedFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #666666;
  }
`;

const StyledDeleteButton = styled.div`
  width: 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  align-items: center;
  color: #333333;
  border-radius: 0px 5px 5px 0px;
  padding: 0px 5px;
  &:hover {
    color: #ffffff;
    background-color: ${props => props.theme.primaryColour};
  }
`;

type Props = {
  filter: Object,
  onLoadFilter: () => void,
  onDeleteFilter: () => void,
};

class SavedFilter extends PureComponent<Props> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledSavedFilter>
          <StyledSavedFilterContent onClick={() => this.props.onLoadFilter(this.props.filter.name)}>
            {this.props.filter.name}
          </StyledSavedFilterContent>
          <StyledDeleteButton onClick={() => this.props.onDeleteFilter(this.props.filter.name)}>
            ×
          </StyledDeleteButton>
        </StyledSavedFilter>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadFilter: id => {
      dispatch(loadFilters(id));
    },
    onDeleteFilter: id => {
      dispatch(deleteFilters(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedFilter);
