/**
 * @exports
 * @class
 */
class Api {
  /**
   * Api constructor method
   */
  constructor() {
<<<<<<< HEAD
    this.root = 'http://localhost:8000/api/v1';
=======
    this.root = 'http://localhost:8090/api/v1';
>>>>>>> 93b7440e036380bdfdddb5e9192a452403f04f74
  }

  /**
   * Template for getting list of resources from api
   * @param {String} path - the required path
   * @returns {Array} - the data expected
   */
  async getData(path) {
    return fetch(`${this.root}/${path}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => res);
  }

  /**
   * Template for creating a resources
   * @param {String} path - the required path
   * @param {Object} data - the properties of the resource to be created
   * @returns {Array} - the data created
   */
  createResource(path, data) {
    return fetch(`${this.root}/${path}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.token,
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => res.data);
    // .then(res => console.log(res));
  }

  /**
   * Template for updating a resources
   * @param {String} path - the required path
   * @param {Object} data - the properties of the resource to be created
   * @param {Object} method - request method; default = 'PUT'
   * @returns {Array} - the data created
   */
  updateResource(path, data, method = 'PUT') {
    return fetch(`${this.root}/${path}`, {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.token,
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      // .then(res => res.data);
      .then(res => console.log(res));
  }

  /**
   * Template for deleting a resources
   * @param {String} path - the path to resource
   * @returns {Array} - the returned response
   */
  deleteResource(path) {
    return fetch(`${this.root}/${path}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.token,
      },
    })
      .then(res => res.json())
      // .then(res => res.data);
      .then(res => console.log(res));
  }

  /**
   * Fetch all meetups in database
   * @param {Number|String} sub - the id of the expected resource
   * @returns {Array} - Array of all meetups
   */
  async getMeetups(sub = '') {
    const resource = await this.getData(`meetups/${sub}`);
    return resource;
  }

  /**
   * Fetch all meetups in database
   * @param {Number|String} sub - the id of the expected resource
   * @returns {Array} - Array of all meetups
   */
  async getUpcomingMeetups() {
    const resource = await this.getData('meetups?scope=upcoming');
    return resource;
  }

  /**
   * Delete a specified meetup
   * @param {Number} id - id of the meetup to be deleted
   * @returns {Boolean} - indicating that meetup was successfully deleted
   */
  async deleteMeetup(id) {
    const resource = await this.deleteResource(`meetups/${id}`);
    return resource;
  }

  /**
   * Fetch all questions in database
   * @param {Number|String} sub - the id of the expected resource
   * @returns {Array} - Array of all meetups
   */
  async getQuestions(sub = '') {
    const resource = await this.getData(`questions/${sub}`);
    return resource;
  }

  /**
   * @async
   * @param {Object} data - the properties of the resource to be created
   * @returns {Array} - created resource
   */
  async createQuestion(data) {
    const resource = await this.createResource('questions', data);
    return resource;
  }

  /**
   * Delete a specified question
   * @param {Number} id - id of the meetup to be deleted
   * @returns {Boolean} - indicating that meetup was successfully deleted
   */
  async deleteQuestion(id) {
    const resource = await this.deleteResource(`questions/${id}`);
    return resource;
  }

  /**
   * Upvote a specified question
   * @param {Number} id - id of the question
   * @returns {Array} - array of the meetup upvoted
   */
  async upvoteQuestion(id) {
    const resource = await this.updateResource(`questions/${id}/upvote`, {}, 'PATCH');
    return resource;
  }

  /**
   * Downvote a specified question
   * @param {Number} id - id of the question
   * @returns {Array} - array of the meetup downvoted
   */
  async downvoteQuestion(id) {
    const resource = await this.updateResource(`questions/${id}/downvote`, {}, 'PATCH');
    return resource;
  }

  /**
   * Fetch all tags in database
   * @param {Number|String} sub - the id of the expected resource
   * @returns {Array} - Array of all meetups
   */
  async getTags(sub = '') {
    const resource = await this.getData(`tags/${sub}`);
    return resource;
  }

  /**
   * Fetch all comments in database
   * @param {Number|String} sub - the id of the expected resource
   * @returns {Array} - Array of all meetups
   */
  async getComments(sub = '') {
    if (typeof (sub) !== 'number' && sub !== '') return false;
    const resource = await this.getData(`comments/${sub}`);
    return resource;
  }

  /**
   * @async
   * @param {Object} data - the properties of the resource to be created
   * @returns {Array} - created resource
   */
  async createMeetup(data) {
    const resource = await this.createResource('meetups', data);
    return resource;
  }

  /**
   * @async
   * @param {Object} data - the properties of the resource to be created
   * @returns {Array} - created resource
   */
  async createComment(data) {
    const resource = await this.createResource('comments', data);
    return resource;
  }

  /**
   * Delete a specified question
   * @param {Number} id - id of the meetup to be deleted
   * @returns {Boolean} - indicating that meetup was successfully deleted
   */
  async deleteComment(id) {
    const resource = await this.deleteResource(`comments/${id}`);
    return resource;
  }

  /**
   * @async
   * @param {Object} id - id of the meetup
   * @param {Object} data - the properties of the resource to be created
   * @returns {Array} - created resource
   */
  async createMeetupResponse(id, data) {
    const path = `meetups/${id}/rsvps`;
    const resource = await this.createResource(path, data);
    return resource;
  }

  /**
   * @async
   * @param {Object} id - id of the meetup
   * @param {Object} tags - the tags to be added to meetup
   * @returns {Array} - the meetup that has received tags
   */
  async addTags(id, tags) {
    const path = `meetups/${id}/tags`;
    const resource = await this.updateResource(path, tags);
    return resource;
  }

  /**
   *@async
   * @param {Object} data - the properties of the resource to be created
   * @returns {Array} - the logged-in user and token
   */
  async login(data) {
    const path = 'auth/login';
    const resource = await this.createResource(path, data);
    window.localStorage.setItem('token', resource[0].token);

    return resource;
  }

  /**
   *@async
   * @param {Object} data - the properties of the resource to be created
   * @returns {Array} - the created user and token
   */
  async signup(data) {
    const path = 'auth/signup';
    const resource = await this.createResource(path, data);
    window.localStorage.setItem('token', resource[0].token);

    return resource;
  }
}

const API = new Api();

const run = async () => {
  // const data = await API.deleteComment(1);
  // const data = await API.login({ email: 'mrmusonant@gmail.com', password: 'emmanuel' });
  // const data = await API.signup({
  //   firstname: 'Peter', lastname: 'James', email: 'peterjames@gmail.com', password: 'peter'
  // });
  // const data = await API.addTags(2, { tags: [1, 4, 5] });
  // const data = await API.getMeetups();

  // console.log(data);
};


// console.log(window.localStorage.token);
run();
