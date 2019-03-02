/* eslint-disable */
class Meetup {

  constructor() {
    events.subscribe('ALL_MEETUPS_FETCHED', this.meetupDisplay);
    this.fetchResources();

    
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

  async fetchResources() {
    API.getMeetups().then(data => {
      events.publish('ALL_MEETUPS_FETCHED', data);
    }).catch(error => {
      console.log('error', error);
    });
  }

}

const meetup = new Meetup();

