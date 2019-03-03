const scheduledMeetups = (meetups) => {
  const meetupsTemplate = meetups.map((meetup) => {
    const topQuestion = meetup.questions[0];
    const upVoters = topQuestion.upVoters || [];
    const downVoters = topQuestion.downVoters || [];

    return `
      <div class="meetup">
        <div class="top">
          <label class="with-underline center">${meetup.topic}</label>
        </div>
        <label class="tag">Top question</label>
        <div class="row question-card">
          <div class="counter">
            <p class="vote-num upvotes">${upVoters.length}</p>
              <button class="voter-btn upvote">
                <i class="fa fa-caret-up icon"></i>
              </button>

            <div class="divide"></div>

            <button class="voter-btn downvote">
              <i class="fa fa-caret-down icon"></i>
            </button>
            <p class="vote-num downvotes">${downVoters.length}</p>
          </div>
          <div class="body flex-1">
            <div class="fine-text main-question" style="border-width: 1px; border-color: #ddd;">
              <p>${topQuestion.body}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  let meetupsList = meetupsTemplate.join('');

  if (meetups.length === 0) {
    meetupsList = `
      <label class="main-question">You do not have any scheduled meetups</label>
    `;
  }

  return `
    <div>
      <div class="sub-title">
          <h1 class="title">Schedulled Meetups</h1>
        </div>
        <div class="meetups">
          ${meetupsList}
        </div>
    </div>
  `;
};
