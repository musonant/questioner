/* eslint-disable */
class SingleMeetup {
  static init() {
    events.subscribe('FETCH_SINGLE_MEETUP', SingleMeetup.displayMeetupHeading);
    let { meetupId } = parseQuery();
    SingleMeetup.fetchMeetup(meetupId);
  }

  static displayMeetupHeading(data) {
    const container = document.querySelector('#meetup-heading');
    const meetup = data[0];
    const { questionsCount, topic, date } = meetup;
    const html = meetupHeading(questionsCount, topic, date);
  
    container.innerHTML = html;
  };

  static async fetchMeetup(id) {
    API.getMeetups(id).then(data => {
      events.publish('FETCH_SINGLE_MEETUP', data);
    }).catch(error => {
      console.log('error', error);
    });
  }
}

window.onloadend = SingleMeetup.init();

