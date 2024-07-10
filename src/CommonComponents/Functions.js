export const getFormatedDate = (datestring) => {
  datestring =
    datestring && datestring.includes("-")
      ? datestring
      : getDateforJS(datestring);

  const myDate = datestring !== "" ? new Date(datestring) : new Date();

  var daysList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var monthsList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var date = myDate.getUTCDate();
  var month = monthsList[myDate.getUTCMonth()];
  var year = myDate.getUTCFullYear();
  var day = daysList[myDate.getUTCDay()];

  var today = `${month} ${date} ${year}, ${day}`;

  return today;
};

export const getDateforJS = (datestring) => {
  return (
    datestring.split("/")[2] +
    "-" +
    datestring.split("/")[0] +
    "-" +
    datestring.split("/")[1]
  );
};
