import meetup from '../database/meetups';

class Meetup {
  static getAll() {
    return meetup;
  }

  static getOne(id) {
    return meetup.find(item => item.id === id);
  }
}

export default Meetup;
