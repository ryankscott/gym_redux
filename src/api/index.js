// function that makes the api request and returns a Promise for response
export const fetchClasses = searchQuery => {
  return axios({
    method: "get",
    crossDomain: true,
    url: __GYMCLASS_URL__ + "/classsearch/?q=" + searchQuery
  });
};
