import React from "react";
import PropTypes from "prop-types";
import Class from "./Class";
import { Column, Table, AutoSizer } from "react-virtualized";
import styles from "./ClassList.css";

let ClassList = ({ classes }) => {
  return (
    <Table
      width={800}
      height={200}
      headerHeight={50}
      rowHeight={50}
      rowCount={classes.length}
      rowGetter={({ index }) => classes[index]}
    >
      <Column label="Class" dataKey="name" width={100} />
      <Column label="Gym" dataKey="gym" width={100} />
    </Table>
  );
};

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
    }).isRequired
  )
};

export default ClassList;
