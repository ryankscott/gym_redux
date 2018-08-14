import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styles from "./Button.css";
import { connect } from "react-redux";
import classNames from "classnames";

type Props = {
  onClick: () => void,
  text: string
};
class Button extends PureComponent<Props> {
  render() {
    return (
      <div className={styles.Btn} onClick={this.props.onClick}>
        {this.props.text}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
