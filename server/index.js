const gyms = ["britomart", "newmarket", "city", "takapuna"];
const locations = ["studio 1", "studio 2"];
const classnames = [
  "RPM",
  "GRIT STRENGTH",
  "GRIT CARDIO",
  "BODYPUMP",
  "RINGSIDE",
  "CX WORX"
];

module.exports = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const query = {
    Gym: [],
    Class: [],
    Before: end.toISOString(),
    After: start.toISOString()
  };
  const classes = {};
  const data = { classes: [], query: {} };
  // Create 100 classes
  for (let i = 0; i < 100; i++) {
    var startHour = Math.random() * 23;
    var endHour = startHour + 1;
    var startdate = new Date();
    startdate.setHours(startHour, 0, 0, 0);
    var enddate = new Date();
    enddate.setHours(endHour, 0, 0, 0);

    data.classes.push({
      uuid: i,
      gym: gyms[Math.floor(Math.random() * gyms.length)],
      name: classnames[Math.floor(Math.random() * classnames.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      startdatetime: startdate.toISOString(),
      enddatetime: enddate.toISOString()
    });
  }
  data.query = query;
  console.log(data);
  return data;
};
