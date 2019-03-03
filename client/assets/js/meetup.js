/* eslint-disable */
class SingleMeetup {
  static init() {
    events.subscribe('FETCH_SINGLE_MEETUP', SingleMeetup.displayMeetupHeading);
    events.subscribe('FETCH_SINGLE_MEETUP', SingleMeetup.displayMeetupDetails);

    let { meetupId } = parseQuery();
    SingleMeetup.fetchMeetup(meetupId);
  }

  static displayMeetupHeading(data) {
    const container = document.querySelector('#meetup-heading');
    const meetup = data[0];
    const { questionsCount, topic, happeningOn } = meetup;
    const html = meetupHeading(questionsCount, topic, happeningOn);
  
    container.innerHTML = html;
  };

  static displayMeetupDetails(data) {
    const container = document.querySelector('#meetup-details');
    const meetup = data[0] || {};
    const { description, questions, topic, happeningOn, createdBy } = meetup;
    const images = meetup.images || [];
    const html = meetupDetails(images[0], createdBy, questions, description, topic, happeningOn);
  
    container.innerHTML = html;
  }

  static async fetchMeetup(id) {
    API.getMeetups(id).then(data => {
      events.publish('FETCH_SINGLE_MEETUP', data);
    }).catch(error => {
      console.log('error', error);
    });
  }
}

window.onloadend = SingleMeetup.init();

