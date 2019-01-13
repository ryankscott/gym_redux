// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleFilterBar } from '../actions/actions.js';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../theme.js';
import { device } from '../devices.js';

// TODO: Consolidate to Button

const StyledFilterButton = styled.div`
  box-sizing: border-box;
  padding: 5px;
  font-family: ${props => props.theme.font};
  background-color: ${props => props.theme.backgroundColour};
  color: ${props => props.theme.borderColour};
  font-weight: 300;
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: row;
  height: 35px;
  justify-content: space-around;
  align-items: center;
  border: solid 1px ${props => props.theme.borderColour};
  border-radius: 4px;
  opacity: 1;
  transition: all 200ms ease-in-out;
  fill: ${props => props.theme.borderColour};
  cursor: pointer;

  @media ${device.mobileS} {
    width: 40px;
    font-size: 0px;
  }

  @media ${device.tablet} {
    width: 100px;
    font-size: 16px;
  }
`;

const StyledFilterIcon = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

type Props = {
  visible: boolean,
  onClick: () => void,
};
class FilterButton extends PureComponent<Props> {
  render() {
    const { visible } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <StyledFilterButton onClick={this.props.onClick} visible={visible}>
          <StyledFilterIcon>
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </StyledFilterIcon>
          Filter
        </StyledFilterButton>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    visible: state.classes.hasClasses,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onClick: () => {
      dispatch(toggleFilterBar());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterButton);
