/* eslint-disable */
class SingleMeetup {

  constructor() {
    events.subscribe('FETCH_SINGLE_MEETUP', this.meetupDisplay);
    let { meetupId } = parseQuery();
    this.fetchMeetup(meetupId);
  }

  meetupDisplay(data) {
    const meetupContainer = document.querySelector('#meetupList');
    const templateArray = data.map((item) => {
      console.log(item);
      const questionCount = 25;
      const { topic } = item;
      const { location } = item;
      const date = item.happeningOn === null ? null : moment(item.happeningOn);
      const backgroundImage = item.images === null ? '' : item.images[0];
  
      return `
      <div class="col-sm-12 col-md-6 col-lg-4 container">
        ${meetupCard(questionCount, topic, location, date, backgroundImage)}
      </div>
      `;
    });
  
    meetupContainer.innerHTML = templateArray.join('');
  };

  async fetchMeetup(id) {
    API.getMeetups(id).then(data => {
      events.publish('FETCH_SINGLE_MEETUP', data);
      console.log(data);
    }).catch(error => {
      console.log('error', error);
    });
  }

}

const meetup = new SingleMeetup();

