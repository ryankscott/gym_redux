import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AutoSizer, Column, Table, SortDirection } from 'react-virtualized';
import { toLower, startCase, sortBy, reverse } from 'lodash';
import { format, parseISO } from 'date-fns';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../theme.js';
import { device } from '../devices.js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;

  @media ${device.mobileS} {
    margin: 0px 5px;
  }

  @media ${device.mobileL} {
    margin: 0px 10px;
  }

  @media ${device.tablet} {
    margin: 0px 60px;
  }
  filter: ${props => (props.isFetching ? 'blur(3px)' : null)};
`;

const NoClassContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const NoClassText = styled.p`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.borderColour};
  font-weight: 300;
  font-size: 18px;
`;

const StyledTable = styled(Table)`
  font-family: ${props => props.theme.font};
`;

const HeaderStyle = {
  fontFamily: 'Lato, "Helvetica Neue", Arial, sans-serif',
  fontWeight: '300',
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  padding: '5px 0px',
  fontSize: '18px',
};

const RowStyle = index => {
  const width = window.innerWidth;
  return {
    fontFamily: 'Lato, "Helvetica Neue", Arial, sans-serif',
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: '300',
    fontSize: width > 450 ? '16px' : '14px',
    backgroundColor: index % 2 == 0 ? '#EEEEEE' : '#FFFFFF',
  };
};

const normaliseString = string => {
  return startCase(toLower(string));
};

const stringCellRenderer = cellData => {
  if (cellData == null) {
    return '';
  } else {
    return normaliseString(String(cellData.cellData));
  }
};

const dateCellRenderer = cellData => {
  const width = window.innerWidth;
  if (cellData == null) {
    return '';
  } else {
    const d = parseISO(cellData.cellData);
    return width > 450
      ? format(d, 'eeee h:mm aaaa')
      : format(d, 'EEE h:mm aaaa');
  }
};

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'startdatetime',
      sortDirection: SortDirection.ASC,
    };
    this.sortData = this.sortData.bind(this);
  }

  sortData(s) {
    this.setState({
      sortBy: s.sortBy,
      sortDirection: s.sortDirection,
    });
  }

  render() {
    const { classes, fetching } = this.props;
    let newList = sortBy(classes, [this.state.sortBy]);
    if (this.state.sortDirection === SortDirection.DESC) {
      newList = reverse(newList);
    }

    let tableContent = null;
    if (classes == null) {
      tableContent = null;
    } else if (classes.length == 0) {
      tableContent = (
        <ThemeProvider theme={theme}>
          <NoClassContainer>
            <NoClassText> No classes returned </NoClassText>
          </NoClassContainer>
        </ThemeProvider>
      );
    } else {
      tableContent = (
        <ThemeProvider theme={theme}>
          <AutoSizer>
            {({ height, width }) => {
              const colWidth = width / 3.0;
              return (
                <StyledTable
                  height={height}
                  width={width}
                  headerHeight={50}
                  rowHeight={30}
                  rowCount={newList.length}
                  rowGetter={({ index }) => newList[index]}
                  headerStyle={HeaderStyle}
                  rowStyle={({ index }) => RowStyle(index)}
                  gridStyle={{ textAlign: 'center' }}
                  sort={this.sortData}
                  sortBy={this.state.sortBy}
                  sortDirection={this.state.sortDirection}
                >
                  <Column
                    label="Class"
                    dataKey="ClassName"
                    cellDataGetter={({ rowData }) => {
                      return rowData.ClassName;
                    }}
                    cellRenderer={stringCellRenderer}
                    width={colWidth}
                  />
                  <Column
                    label="Gym"
                    dataKey="Club.Name"
                    cellDataGetter={({ rowData }) => {
                      return rowData.Club.Name;
                    }}
                    cellRenderer={stringCellRenderer}
                    width={colWidth}
                  />
                  <Column
                    label="Start Time"
                    dataKey="StartDateTime"
                    cellRenderer={dateCellRenderer}
                    width={colWidth}
                  />
                </StyledTable>
              );
            }}
          </AutoSizer>
        </ThemeProvider>
      );
    }

    return <Container isFetching={fetching}> {tableContent} </Container>;
  }
}
const mapDispatchToProps = () => {
  return {};
};
const mapStateToProps = state => {
  return {
    classes: state.classes.classes,
    fetching: state.classes.fetching,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClassList);
