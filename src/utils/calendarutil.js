import {
  format, eachDay, startOfWeek, endOfWeek,
} from 'date-fns';

export function getWeekDays(type = 'ddd') {
  const now = new Date();
  const arr = eachDay(startOfWeek(now), endOfWeek(now));
  return arr.map(d => format(d, type));
}

export function getMonthSkeleton(prevMonthDays, currentandnextMonthDays) {
  const monthSkeletion = [];
  for( let i = prevMonthDays; i < currentandnextMonthDays; i++ ) { //eslint-disable-line
    monthSkeletion.push(i);
  }
  return monthSkeletion;
}
