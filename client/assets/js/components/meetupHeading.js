const meetupHeading = (questionsCount, topic, date) => {
  let time = '';
  let day = '';
  questionsCount = questionsCount === 1 ? `${questionsCount} Question` : `${questionsCount} Questions`;

  if (date !== null) {
    time = moment(date).format('HH:mm A');
    day = moment(date).format('MMM DD, YYYY');
    day = `<label>${day}</label>`;
  }


  const html = `
    <div class="meetup-banner row">
      <div class="col-sm-12 col-lg-8 info">
        <div class="title">
          ${day}
          <h1>${topic}</h1>
        </div>
      </div>
      <div class="col-sm-12 col-lg-4 attend">
        <div class="actions">
          <label>Are you attending?</label>
          <div class="row" style="justify-content: center;">
            <span class="col-sm-6" style="padding-right: 5px;">
              <button class="fa fa-check action-btn"></button>
            </span>
            <span class="col-sm-6" style="padding-left: 5px;">
              <button class="fa fa-close action-btn"></button>
            </span>
          </div>
        </div>
      </div>
      <label style="margin-top: 20px; color: #7aadad;">${questionsCount}</label>
    </div>
  `;

  return html;
};
