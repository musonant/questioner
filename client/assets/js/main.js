const inputs = document.querySelectorAll('input');
// const inputTitle = document;
const textAreas = document.querySelectorAll('textarea');

const processDate = (date) => {
  const dateArray = date.split('-');
  const year = dateArray[0];
  const monthNum = parseInt(dateArray[1], 10);
  const day = dateArray[2];

  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthArray[monthNum - 1];

  return { year, month, day };
};

const processTime = (time) => {
  const timeArray = time.split(':');
  let hour = parseInt(timeArray[0], 10);
  const minute = parseInt(timeArray[1], 10);
  let period = 'AM';

  if (hour > 12) {
    hour %= 12;
    period = 'PM';
  }

  console.log(timeArray);
  console.log(minute);

  const result = minute === 0 ? `${hour} ${period}` : `${hour}:${minute} ${period}`;

  return result;
};

const monitorInputs = (input) => {
  const linkedPreview = document.getElementById(input.lang);
  const defaultText = linkedPreview.innerHTML;

  input.addEventListener('input', (e) => {
    linkedPreview.innerHTML = e.target.value;

    if (e.target.type === 'date') {
      const dateObj = processDate(e.target.value);
      linkedPreview.innerHTML = `${dateObj.month} ${dateObj.day}, ${dateObj.year}`;
    }

    if (e.target.type === 'time') {
      const newTime = processTime(e.target.value);
      linkedPreview.innerHTML = newTime;
    }

    if (e.target.value.length < 1) {
      linkedPreview.innerHTML = defaultText;
    }
  });
};

for (const input of inputs) {
  if (input.lang) {
    monitorInputs(input);
  }
}

for (const area of textAreas) {
  if (area.lang) {
    const linkedPreview = document.getElementById(area.lang);
    const defaultText = linkedPreview.innerHTML;

    area.addEventListener('input', (e) => {
      linkedPreview.innerHTML = e.target.value;

      if (e.target.value.length < 1) {
        linkedPreview.innerHTML = defaultText;
      }
    });
  }
}
