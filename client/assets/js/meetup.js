/* eslint-disable */
class SingleMeetup {
  static init() {
    events.subscribe('FETCH_SINGLE_MEETUP', SingleMeetup.displayMeetupHeading);
    events.subscribe('FETCH_SINGLE_MEETUP', SingleMeetup.displayMeetupDetails);

    // The method "DoNothing" should be replaced with method that displays a toast
    events.subscribe('MEETUP_RESPONSE_SUCCESS', SingleMeetup.doNothing);

    let { meetupId } = parseQuery();
    SingleMeetup.fetchMeetup(meetupId);
  }

  static displayMeetupHeading(data) {
    const container = document.querySelector('#meetup-heading');
    const meetup = data[0];
    const { id, questions, topic, happeningOn } = meetup;
    const html = meetupHeading(id, questions.length, topic, happeningOn);
  
    container.innerHTML = html;
    SingleMeetup.respondToMeetup();
  };

  static displayMeetupDetails(data) {
    const container = document.querySelector('#meetup-details');
    const meetup = data[0] || {};
    const { description, questions, topic, happeningOn, createdBy } = meetup;
    const images = meetup.images || [];
    const html = meetupDetails(images[0], meetup.author, questions, description, topic, happeningOn);
  
    container.innerHTML = html;
  }

  static doNothing(data) {
    alert('Your action has been recorded')
  }

  static async fetchMeetup(id) {
    API.getMeetupsWithAuthor(id).then(data => {
      events.publish('FETCH_SINGLE_MEETUP', data);
    }).catch(error => {
      console.log('error', error);
    });
  }

  static async respondToMeetup() {
    const responseForm = document.querySelector('#meetup-response-form');
    const meetupId = responseForm.name;
    const responseButtons = [...responseForm.elements];
    
    responseButtons.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        let response = e.target.name;
        if (response !== "yes" && response !== "no" && response !== "maybe") {
          return;
        }
        response = { response };
        const attemptResponse = await API.createMeetupResponse(meetupId, response);

        if (attemptResponse.status === 201) {
          events.publish('MEETUP_RESPONSE_SUCCESS', attemptResponse.data);
        }
      });
    });

    
  }
}

window.onloadend = SingleMeetup.init();
