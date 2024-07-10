export default getFormattedDate = (datestring) => {
    datestring =
      datestring.split("-")[0] +
      "-" +
      datestring.split("-")[1] +
      "-" +
      datestring.split("-")[2];
  
    var myDate = new Date();
    if (datestring !== "") {
      myDate = new Date(datestring);
    }
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
  