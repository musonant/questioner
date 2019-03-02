const meetupCard = (questionCount, topic, location, date, backgroundImage) => {
  let time = '';
  let day = '';
  let monthShort = '';
  let dayShort = '';
  location = location === null ? '' : location;

  if (date !== null) {
    time = moment(date).format('HH:mm A');
    day = moment(date).format('dddd Do MMM YYYY');
    monthShort = moment(date).format('MMM');
    dayShort = moment(date).format('DD');
  }

  const html = `
    <div class="meetup-card">
    <aside class="display">
      <a href="meetup.html" class="">
        <div class="with-back-img meetup-display-img" style="background-color: #b0e6ce; background-image: url('${backgroundImage}');"></div>
        <div class="cta-btn">
          <span class="count">${questionCount}</span>
          <span>Questions</span>
        </div>
      </a>
    </aside>
    <main class="info">
      <div class="date-thumbnail">
        <p class="month">${monthShort}</p>
        <p class="day grey-color">${dayShort}</p>
      </div>
      <div class="details row flex-1">
        <h3 class="title">
          <a href="meetup.html">
            ${topic}
          </a>
        </h3>
        <div class="more grey-color">
        <p class="detail-text" name="date">${day}</p>
        <p class="detail-text" name="time">${time}</p>
          <p class="detail-text" name="venue">${location}</p>
        </div>
      </div>
    </main>
    </div>
  `;

  return html;
};
