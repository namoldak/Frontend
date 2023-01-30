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

  // eslint-disable-next-line consistent-return
  return intl;
}

export default formatTime;
