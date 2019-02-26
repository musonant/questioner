const meetupCard = (questionCount, topic, location, date, backgroundImage) => {
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
        <p class="month">{JAN}</p>
        <p class="day grey-color">30</p>
      </div>
      <div class="details row flex-1">
        <h3 class="title">
          <a href="meetup.html">
            ${topic}
          </a>
        </h3>
        <div class="more grey-color">
          <p class="detail-text" name="date">${date}</p>
          <p class="detail-text" name="venue">${location}</p>
        </div>
      </div>
    </main>
    </div>
  `;

  return html;
};
