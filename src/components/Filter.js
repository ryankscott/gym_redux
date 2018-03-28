// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.css';
import { connect } from 'react-redux';
import { toggleFilterBar } from '../actions/actions.js';
import classNames from 'classnames';

type Props = {
  filtersShown: boolean,
  onClick: () => void,
};
class Filter extends Component<Props> {
  render() {
    return (
      <div className={styles.filterBtn} onClick={this.props.onClick}>
        <div
          className={classNames({
            [styles.filterIcon]: true,
            [styles.rotated]: this.props.filtersShown,
          })}
        >
          <svg
            fill="#000000"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
            <path d="M0-.25h24v24H0z" fill="none" />
          </svg>
        </div>
        Filters
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filtersShown: state.filters.filterBarVisible,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {
    onClick: () => {
      dispatch((toggleFilterBar: { type: string }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
