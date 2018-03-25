import React from "react";
import PropTypes from "prop-types";
import styles from "./Spinner.css";

//TODO: Make an overlay and blur

const Spinner = () => (
  <div className={styles.spinner}>
    <div className={styles.bounce1} />
    <div className={styles.bounce2} />
    <div className={styles.bounce3} />
  </div>
);

Spinner.propTypes = {};
export default Spinner;
