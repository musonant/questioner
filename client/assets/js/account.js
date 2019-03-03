/* eslint-disable */
class Account {

  constructor() {
    events.subscribe('USER_DETAILS_FETCHED', this.displayAccountInfo);
    events.subscribe('SCHEDULED_MEETUPS_FETCHED', this.displayScheduledMeetups);
    
    let { userId } = parseQuery();
    this.fetchUser(userId);
    this.fetchScheduledMeetups(userId);

  }

  displayScheduledMeetups(data) {
    const meetupContainer = document.querySelector('#schedulled-meetups');
    const html = scheduledMeetups(data);
    meetupContainer.innerHTML = html;
  };

  displayAccountInfo(data) {
    const container = document.querySelector('#account-info');
    const html = accountInfo(data);
    container.innerHTML = html;
  }

  async fetchUser(id) {
    API.getUsers(id).then(data => {
      events.publish('USER_DETAILS_FETCHED', data);
    }).catch(error => {
      console.log('error', error);
    });
  }

  async fetchScheduledMeetups(userId) {
    API.getScheduledMeetups(userId).then(data => {
      events.publish('SCHEDULED_MEETUPS_FETCHED', data);
    }).catch(error => {
      console.log('error', error);
    });
  }

}

const account = new Account();
