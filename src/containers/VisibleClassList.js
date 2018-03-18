import { connect } from "react-redux";
import ClassList from "../components/TodoList";

const getVisibleClasses = (classes, filter) => {
  return classes;
};

const mapStateToProps = state => ({
  classes: getVisibleClasses(state.classes, state.visibilityFilter)
});

const mapDispatchToProps = {};

const VisibleClassList = connect(mapStateToProps, mapDispatchToProps)(
  ClassList
);

export default VisibleClassList;
