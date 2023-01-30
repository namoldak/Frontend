/* eslint-disable consistent-return */
function formatTime(date) {
  if (!date) {
    return;
  }

  let intl = new Intl.DateTimeFormat('ko', { dateStyle: 'short' }).format(
    new Date(date),
  );

  intl = intl.replaceAll(' ', '').slice(0, -1);

  if (intl.indexOf(3) !== 0) {
    intl = `${intl.slice(0, 3)}0${intl.slice(3, 8)}`;
  }

  return intl; // 23.01.01
}

function settingDate(date) {
  if (!date) {
    return;
  }

  let intl = new Intl.DateTimeFormat('ko', { dateStyle: 'medium' }).format(
    new Date(date),
  );

  intl = intl.replaceAll(' ', '').slice(0, -1);

  return intl; // 2023.01.01
}

export { formatTime, settingDate };
