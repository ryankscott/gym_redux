import React from "react";
import PropTypes from "prop-types";
import { startCase, toLower } from "lodash";
import moment from "moment";

const normaliseString = string => {
  return startCase(toLower(string));
};

const parseDate = dateString => {
  return moment(dateString).calendar();
};

const Class = ({
  onClick,
  gym,
  name,
  location,
  startdatetime,
  enddatetime,
  insertdatetime
}) => (
  <li>
    {normaliseString(gym)} - {normaliseString(name)} -{" "}
    {normaliseString(location)} - {parseDate(startdatetime)}
  </li>
);

Class.propTypes = {
  uuid: PropTypes.string.isRequired,
  gym: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startdatetime: PropTypes.string.isRequired,
  enddatetime: PropTypes.string.isRequired,
  insertdatetime: PropTypes.string.isRequired
};

export default Class;
