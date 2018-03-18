import React from "react";
import PropTypes from "prop-types";
import Class from "./Class";

const ClassList = ({ classes}) => (
  <ul>
    {classes.map(class => (<Class key={class.id} {...class} />))}
  </ul>
);

ClassList.propTypes = {
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
};

export default ClassList;
