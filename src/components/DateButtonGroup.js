// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./DateButtonGroup.css";
import { connect } from "react-redux";
import classNames from "classnames";
import moment from "moment";

type Props = {
  options: { label: string, value: string }[],
  onChange: value => void
};

class DateButtonGroup extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  handleClick(value) {
    if (value === this.state.selected) {
      this.setState({ selected: null });
      this.props.onChange(null);
    } else {
      this.setState({
        selected: value
      });
      this.props.onChange(value);
    }
  }

  render() {
    const { options } = this.props;
    const { selected } = this.state;
    return (
      <div className={styles.btnGroup}>
        {options.map(({ label, value }) => {
          return (
            <button
              key={value}
              className={classNames({
                [styles.btn]: true,
                [styles.selected]: value === selected
              })}
              onClick={() => {
                this.handleClick(value);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DateButtonGroup);
