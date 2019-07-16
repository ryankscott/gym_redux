/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import Spinner from '@atlaskit/spinner';
import FilterButton from './FilterButton';
import FilterBar from './FilterBar';
import ClassList from './ClassList.js';
import { getAllClasses, getClasstypes } from '../actions/actions.js';
import { theme } from '../theme.js';
import { device } from '../devices.js';

const AppContainer = styled.div`
  font-family: ${props => props.theme.font};
  height: 100%;
  display: grid;
  grid-template-rows: 5fr 1fr 30fr;
  grid-template-areas:
    'title'
    'spinner'
    'classes';
`;

const Title = styled.div`
  grid-area: title;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.fontColour};
  font-weight: 300;
  margin: 40px 0px;

  @media ${device.mobileS} {
    font-size: 28px;
  }

  @media ${device.laptopL} {
    font-size: 32px;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  grid-area: spinner;
  flex-direction: row;
  justify-content: center;
  align-self: center;
`;

const ClassesContainer = styled.div`
  height: 600px;
  grid-area: classes;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FilterButtonContainer = styled.div`
  position: absolute;
  @media ${device.mobileS} {
    left: 20px;
  }

  @media ${device.mobileL} {
    left: 40px;
  }

  @media ${device.tablet} {
    left: 80px;
  }

  @media ${device.laptop} {
    left: 120px;
  }

  @media ${device.laptopL} {
    left: 180px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

class App extends Component {
  componentDidMount() {
    this.props.getAllClasses();
    this.props.getAllClassTypes();
  }

  render() {
    const { fetching, classes, error } = this.props.classes;
    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Title>
            <FilterButtonContainer>
              <FilterButton />
            </FilterButtonContainer>
            Gym Timetable
          </Title>

          <SpinnerContainer>
            {fetching && !classes ? <Spinner size="large" /> : null}
          </SpinnerContainer>
          <ClassesContainer>
            <ClassList classes={classes} />
          </ClassesContainer>
          <FilterContainer>
            <FilterBar />
          </FilterContainer>
        </AppContainer>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.fetching,
  classes: state.classes,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  getAllClasses: () => {
    dispatch(getAllClasses());
  },
  getAllClassTypes: () => {
    dispatch(getClasstypes());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
