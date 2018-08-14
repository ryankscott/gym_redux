// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ButtonGroup.css";
import { connect } from "react-redux";
import classNames from "classnames";

type Props = {
  options: { label: string, value: string }[],
  onChange: value => void,
  selectedValue: string
};

class ButtonGroup extends Component<Props> {
  constructor(props) {
    super(props);
  }

  handleClick(value) {
    const { selectedValue, onChange } = this.props;
    value === selectedValue ? onChange(null) : onChange(value);
  }

  render() {
    const { options, selectedValue } = this.props;
    return (
      <div className={styles.btnGroup}>
        {options.map(({ label, value }) => {
          return (
            <button
              key={value}
              className={classNames({
                [styles.btn]: true,
                [styles.selected]: value === selectedValue
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonGroup);
