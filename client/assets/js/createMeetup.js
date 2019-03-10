
const createHandler = {
  init: () => {
    const meetupSubmitBtn = document.querySelector('#meetup-form');
    meetupSubmitBtn.addEventListener('submit', createHandler.onSubmit);

    events.subscribe('SIGNUP_SUCCESS', createHandler.createRedirect);
  },

  onSubmit: async (e) => {
    e.preventDefault();
    const fields = e.target.elements;
    const topic = fields.title.value;
    const date = fields.date.value;
    const time = fields.time.value;
    const description = fields.description.value;

    const happeningOn = moment(date);

    const attemptCreate = await API.createMeetup({ topic, happeningOn, description });

    if (attemptCreate.status === 201) {
      events.publish('SIGNUP_SUCCESS', attemptCreate.data);
    }
  },

  createRedirect: (data) => {
    const meetupId = data[0].id;
    window.location.href = `/meetup.html?meetupId=${meetupId}`;
  }
};

createHandler.init();
