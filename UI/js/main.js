let inputs = document.querySelectorAll('input');
let inputTitle = document;
let textAreas = document.querySelectorAll('textarea');

for (input of inputs) {
  if (input.lang) {
    let linkedPreview = document.getElementById(input.lang);
    let defaultText = linkedPreview.innerHTML;

    input.addEventListener('input', (e) => {
      linkedPreview.innerHTML = e.target.value;
      
      if (e.target.type === 'date') {
        let dateObj = processDate(e.target.value);
        linkedPreview.innerHTML = `${dateObj.month} ${dateObj.day}, ${dateObj.year}`;
      }

      if (e.target.type === 'time') {
        let newTime = processTime(e.target.value);
        linkedPreview.innerHTML = newTime;
      }

      if (e.target.value.length < 1) {
        linkedPreview.innerHTML = defaultText;
      }
    });
  }
}

for (area of textAreas) {
  if (area.lang) {
    let linkedPreview = document.getElementById(area.lang);
    let defaultText = linkedPreview.innerHTML;

    area.addEventListener('input', (e) => {
      linkedPreview.innerHTML = e.target.value;

      if (e.target.value.length < 1) {
        linkedPreview.innerHTML = defaultText;
      }
    })
  }
}

let processDate = (date) => {
  let dateArray = date.split('-');
  let year = dateArray[0];
  let monthNum = parseInt(dateArray[1], 10);
  let day = dateArray[2];

  let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let month = monthArray[monthNum - 1];
  
  return {year, month, day};
}

let processTime = (time) => {
  let timeArray = time.split(':');  
  let hour = parseInt(timeArray[0], 10);
  let minute = parseInt(timeArray[1], 10);
  let period = 'AM';

  if (hour > 12) {
    hour = hour % 12;
    period = 'PM';
  }

  console.log(timeArray);
  console.log(minute);

  let result = minute === 0 ? `${hour} ${period}` : `${hour}:${minute} ${period}`;
  
  return result;
}