const clubs = [
  { ClubCode: '01', Name: 'Auckland City' },
  { ClubCode: '09', Name: 'Britomart' },
  { ClubCode: '13', Name: 'New Market' },
];

const locations = ['studio 1', 'studio 2'];
const classnames = [
  'RPM',
  'THE TRIP',
  'GRIT STRENGTH',
  'GRIT CARDIO',
  'GRIT ATHLETIC',
  'BODYPUMP',
  'BODYBALANCE',
  'BODYBALANCE (VIRTUAL)',
  'RPM (VIRTUAL)',
  'RINGSIDE',
  'CX WORX',
];

module.exports = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

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
      Club: clubs[Math.floor(Math.random() * clubs.length)],
      Name: classnames[Math.floor(Math.random() * classnames.length)],
      Location: locations[Math.floor(Math.random() * locations.length)],
      StartDateTime: startdate.toISOString(),
      EndDateTime: enddate.toISOString(),
    });
  }

  console.log(data.classes);
  return data;
};
