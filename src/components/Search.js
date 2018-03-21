import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClasses } from "../actions/actions";

let Search = ({ dispatch }) => {
  let input = null;
  return (
    <div>
      <input
        type="text"
        ref={node => {
          input = node;
        }}
        onKeyPress={e => {
          e.key === "Enter" ? dispatch(getClasses(input.value)) : null;
        }}
      />
      <button
        onClick={() => {
          console.log(input.value);
          dispatch(getClasses(input.value));
          input.focus();
        }}
      >
        Search
      </button>
    </div>
  );
};
Search = connect()(Search);
export default Search;
