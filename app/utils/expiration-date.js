import moment from 'moment';

export function hasExpired(month, year) {
  let expirationMoment = momentFromMonthAndYear(month, year).add(1, 'months');
  return expirationMoment.isBefore();
}

export function willExpire(month, year, numberOfMonths) {
  if (hasExpired(month, year)) {
    return false;
  }
  let expirationMoment = momentFromMonthAndYear(month, year);
  let monthInterval = numberOfMonths - 1;
  let intervalMoment = moment().add(monthInterval, 'months');
  return expirationMoment.isBefore(intervalMoment);
}

function momentFromMonthAndYear(month, year) {
  return moment(`${month}/${year}`, 'M/YYYY');
}
