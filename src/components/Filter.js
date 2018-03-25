import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.css";
import { connect } from "react-redux";
import { toggleFilterBar } from "../actions/actions.js";

let Filter = ({ dispatch }) => (
  <div
    className={styles.filterBtn}
    onClick={() => {
      dispatch(toggleFilterBar);
    }}
  >
    <svg
      fill="#000000"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
    Filter
  </div>
);
Filter.propTypes = {};

Filter = connect()(Filter);
export default Filter;
