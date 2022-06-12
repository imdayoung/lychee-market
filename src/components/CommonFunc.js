import moment from "moment";

export function MoneyComma(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function GetWeek() {
  var todayDate = new Date();
  var WeekAgo = new Date(todayDate.setDate(todayDate.getDate() - 7));
  var result = [];
  for (var i = 0; i < 7; i++) {
    result.push(
      moment(new Date(WeekAgo.setDate(WeekAgo.getDate() + 1))).format(
        "YY/MM/DD"
      )
    );
  }
  return result;
}

export function GetSixDaysAgo() {
  var todayDate = new Date();
  return new Date(todayDate.setDate(todayDate.getDate() - 6));
}

export function GetDateGap(date1, date2) {
  return new Date(date1).getDate() - new Date(date2).getDate();
}

export function GetMonth() {
  var todayDate = new Date();
  return new Date(todayDate.setDate(1));
}

export function GetMonthAgo() {
  var todayDate = new Date();
  return new Date(todayDate.setMonth(todayDate.getMonth() - 1));
}