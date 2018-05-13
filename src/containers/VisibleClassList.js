import { connect } from "react-redux";
import ClassList from "../components/ClassList.js";

import moment from "moment";
import { map, filter, flatMap, toLower } from "lodash";

const getVisibleClasses = (classes, filters) => {
  if (classes.classes == null) {
    return null;
  }
  let filteredClasses = classes.classes;

  // Filter by Gym
  let gymFilters = filters.filters.Gym;

  // Get all the values that we want to filter by
  gymFilters = flatMap(gymFilters, x => {
    return x.value;
  });
  // If there are filters then return the matching classes
  if (gymFilters.length > 0) {
    filteredClasses = filter(filteredClasses, g => {
      return gymFilters.includes(g.gym);
    });
  }

  // Filter by Class
  // Get the classes we want to filter by
  let classFilters = filters.filters.Class;
  classFilters = flatMap(classFilters, x => {
    return x.value;
  });

  if (classFilters.length > 0) {
    filteredClasses = filter(filteredClasses, g => {
      var includesClass = map(classFilters, filter => {
        return toLower(g.name).includes(filter);
      });
      return includesClass.includes(true);
    });
  }

  // Filter by Date
  let beforeDate = filters.filters.Before;
  let afterDate = filters.filters.After;
  if (moment(beforeDate).isValid()) {
    filteredClasses = filter(filteredClasses, g => {
      return moment(g.startdatetime).isBefore(beforeDate);
    });
  }
  if (moment(afterDate).isValid()) {
    filteredClasses = filter(filteredClasses, g => {
      return moment(g.startdatetime).isAfter(afterDate);
    });
  }
  return filteredClasses;
};

const mapStateToProps = state => {
  return {
    classes: getVisibleClasses(state.classes, state.filters)
  };
};

const mapDispatchToProps = {};

const VisibleClassList = connect(mapStateToProps, mapDispatchToProps)(
  ClassList
);

export default VisibleClassList;
