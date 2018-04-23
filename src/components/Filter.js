// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Filter.css";
import { connect } from "react-redux";
import { get } from "lodash";
import { toggleFilterBar } from "../actions/actions.js";
import classNames from "classnames";

type Props = {
  visible: boolean,
  onClick: () => void
};
class Filter extends Component<Props> {
  render() {
    const { visible } = this.props;
    return (
      <div
        className={classNames({
          [styles.filterBtn]: true,
          [styles.hidden]: !visible
        })}
        onClick={this.props.onClick}
      >
        <div
          className={classNames({
            [styles.filterIcon]: true
          })}
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
        </div>
        Filters
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    visible: get(state.classes, "classes") ? true : false
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onClick: () => {
      console.log("Dispatching toggleFilterBar", performance.now());
      dispatch(toggleFilterBar());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
