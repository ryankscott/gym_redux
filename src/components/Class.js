import React from "react";
import PropTypes from "prop-types";

const Class = ({ onClick, text }) => <li>{text}</li>;

Class.propTypes = {
  text: PropTypes.string.isRequired
};

export default Class;
