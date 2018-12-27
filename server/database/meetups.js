export const defaultRecord = {
  id: undefined,
  createdOn: undefined,
  createdBy: undefined,
  location: null,
  images: null,
  topic: undefined,
  happeningOn: null,
  tags: null,
  description: null,
  updatedOn: null,
};

const meetups = [
  {
    id: 1,
    createdOn: new Date(),
    createdBy: 1,
    location: '',
    images: [],
    topic: 'Global warming and what the globe is doing about it',
    happeningOn: new Date('12-26-2019 12:12'),
    tags: [1, 4],
    description: '',
    updatedOn: null,
  },
  {
    id: 2,
    createdOn: new Date(),
    createdBy: 1,
    location: '',
    images: [],
    topic: 'Testing Node Express app with Mocha and Chai',
    happeningOn: new Date('11-2-2018 15:16'),
    tags: [2, 3, 4],
    description: '',
    updatedOn: null,
  },
  {
    id: 3,
    createdOn: new Date(),
    createdBy: 1,
    location: '',
    images: [],
    topic: 'Understanding environment variables',
    happeningOn: new Date('12-26-2019 1:12'),
    tags: [3, 4],
    description: '',
    updatedOn: null,
  },
];

export default meetups;
