import React, { Component } from "react";
import styles from "./FilterBar.css";
import { connect } from "react-redux";
import classNames from "classnames";

class FilterBar extends Component {
  render() {
    return (
      <div
        className={classNames({
          [styles.container]: true,
          [styles.hidden]: !this.props.visible
        })}
      >
        <div className={styles.title}>Filters </div>
        <div className={styles.filterGroup} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    visible: state.filters.filterBarVisible
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
