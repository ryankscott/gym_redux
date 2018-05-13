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
    if (this.props.classes == null) {
      return null;
    } else if (this.props.classes.length == 0) {
      return <p> No classes returned </p>;
    }
    return (
      <div className={styles.wrapper}>
        <Table
          width={700}
          height={600}
          headerHeight={50}
          rowHeight={30}
          rowCount={newList.length}
          rowGetter={({ index }) => newList[index]}
          className={styles.Table}
          headerClassName={styles.headerRow}
          rowClassName={styles.row}
          gridStyle={{ textAlign: "center" }}
          sort={this.sortData}
          sortBy={this.state.sortBy}
          sortDirection={this.state.sortDirection}
        >
          <Column
            label="Class"
            dataKey="name"
            cellRenderer={stringCellRenderer}
            flexGrow={1}
            width={150}
          />
          <Column
            label="Gym"
            dataKey="gym"
            cellRenderer={stringCellRenderer}
            flexGrow={1}
            width={150}
          />
          <Column
            label="Start Time"
            dataKey="startdatetime"
            cellRenderer={dateCellRenderer}
            flexGrow={1}
            width={150}
          />
        </Table>
      </div>
    );
  }
}
ClassList.propTypes = {
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      gym: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      startdatetime: PropTypes.string.isRequired,
      enddatetime: PropTypes.string.isRequired,
      insertdatetime: PropTypes.string.isRequired
    })
  )
};

export default ClassList;
