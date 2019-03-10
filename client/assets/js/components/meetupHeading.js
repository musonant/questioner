const meetupHeading = (meetupId, questionsCount, topic, date) => {
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

        <form class="actions" id="meetup-response-form" name="${meetupId}">
          <label>Are you attending?</label>
          <div class="row" style="justify-content: center;">
            <span class="col-sm-4" style="padding-right: 5px;">
              <button name="yes" class="fa fa-check action-btn"></button>
            </span>
            <label class="col-sm-4">
              <button name="" class="fa action-btn btn-o fine-text">Maybe</button>
            </label>
            <span class="col-sm-4" style="padding-left: 5px;">
              <button name="no" class="fa fa-close action-btn"></button>
            </span>
          </div>
        </form>
      </div>
      <label style="margin-top: 20px; color: #7aadad;">${questionsCount}</label>
    </div>
  `;

  return html;
};
