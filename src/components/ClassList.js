import React, { Component } from "react";
import PropTypes from "prop-types";
import { Column, Table, SortDirection } from "react-virtualized";
import styles from "./ClassList.css";
import { toLower, startCase, sortBy, reverse } from "lodash";
import moment from "moment";
import classNames from "classnames";

const normaliseString = string => {
  return startCase(toLower(string));
};

const stringCellRenderer = cellData => {
  if (cellData == null) {
    return "";
  } else {
    return normaliseString(String(cellData.cellData));
  }
};

const dateCellRenderer = cellData => {
  if (cellData == null) {
    return "";
  } else {
    return moment(cellData.cellData).calendar();
  }
};

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "startdatetime",
      sortDirection: SortDirection.ASC
    };
    this.sortData = this.sortData.bind(this);
  }

  sortData(s) {
    this.setState({
      sortBy: s.sortBy,
      sortDirection: s.sortDirection
    });
  }

  render() {
    let newList = sortBy(this.props.classes, [this.state.sortBy]);
    if (this.state.sortDirection === SortDirection.DESC) {
      newList = reverse(newList);
    }

    let tableContent = null;
    if (this.props.classes == null) {
      tableContent = null;
    } else if (this.props.classes.length == 0) {
      tableContent = (
        <div className={styles.noClassContainer}>
          <p className={styles.noClassText}> No classes returned </p>
        </div>
      );
    } else {
      tableContent = (
        <Table
          width={700}
          height={600}
          headerHeight={50}
          rowHeight={30}
          rowCount={newList.length}
          rowGetter={({ index }) => newList[index]}
          className={styles.table}
          headerClassName={styles.headerRow}
          rowClassName={styles.row}
          gridStyle={{ textAlign: "center" }}
          sort={this.sortData}
          sortBy={this.state.sortBy}
          sortDirection={this.state.sortDirection}
        >
          <Column
            label="Class"
            dataKey="ClassName"
            cellRenderer={stringCellRenderer}
            flexGrow={1}
            width={150}
          />
          <Column
            label="Gym"
            dataKey="Club"
            cellDataGetter={({ rowData }) => rowData.Club.Name}
            cellRenderer={stringCellRenderer}
            flexGrow={1}
            width={150}
          />
          <Column
            label="Start Time"
            dataKey="StartDateTime"
            cellRenderer={dateCellRenderer}
            flexGrow={1}
            width={150}
          />
        </Table>
      );
    }

    return <div className={styles.wrapper}> {tableContent} </div>;
  }
}
ClassList.propTypes = {
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      Club: PropTypes.object.isRequired,
      ClassName: PropTypes.string.isRequired,
      StartDateTime: PropTypes.string.isRequired
    })
  )
};

export default ClassList;
