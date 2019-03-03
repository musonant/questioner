/* eslint-disable */
class Account {

  constructor() {
    // events.subscribe('ACCOUNT_DETAILS_FETCHED');
    events.subscribe('SCHEDULED_MEETUPS_FETCHED', this.displayScheduledMeetups);
    
    let { userId } = parseQuery();
    this.fetchUser(userId);
    this.fetchScheduledMeetups(userId);

  }

  displayScheduledMeetups(data) {
    console.log(data);
    const meetupContainer = document.querySelector('#schedulled-meetups');
    const templateArray = data.map((item) => {
      const questionsCount = item.questionsCount;
      const { topic } = item;
      const { location } = item;
      const date = item.happeningOn === null ? null : moment(item.happeningOn);
      const backgroundImage = item.images === null ? '' : item.images[0];
  
      return `
      `;
    });
  
    meetupContainer.innerHTML = templateArray.join('');
  };

  async fetchUser(id) {
    API.getUsers(id).then(data => {
      events.publish('ACCOUNT_DETAILS_FETCHED', data);
    }).catch(error => {
      console.log('error', error);
    });
  }

  async fetchScheduledMeetups(userId) {
    API.getScheduledMeetups(userId).then(data => {
      events.publish('ACCOUNT_DETAILS_FETCHED', data);
    }).catch(error => {
      console.log('error', error);
    });
  }

}

const account = new Account();
