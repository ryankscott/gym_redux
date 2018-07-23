const gyms = ["britomart", "newmarket", "city", "takapuna"];
const locations = ["studio 1", "studio 2"];
const classnames = [
  "RPM",
  "THE TRIP",
  "GRIT STRENGTH",
  "GRIT CARDIO",
  "GRIT ATHLETIC",
  "BODYPUMP",
  "BODYBALANCE",
  "BODYBALANCE (VIRTUAL)",
  "RPM (VIRTUAL)",
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
    var startDay = new Date().getDate() + Math.floor(Math.random() * 3);
    var startHour = Math.floor(Math.random() * 23);
    var endHour = startHour + 1;
    var startdate = new Date();
    startdate.setDate(startDay);
    startdate.setHours(startHour, 0, 0, 0);
    var enddate = new Date();
    enddate.setDate(startDay);
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
  return data;
};
