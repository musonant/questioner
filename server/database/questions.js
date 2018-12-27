export const defaultRecord = {
  id: undefined,
  createdOn: undefined,
  createdBy: undefined,
  meetup: undefined,
  authorName: undefined,
  title: null,
  body: undefined,
  upVoters: null,
  downVoters: null,
  updatedOn: null,
};

const questions = [
  {
    id: 1,
    createdOn: new Date(),
    createdBy: 2,
    meetup: 1,
    authorName: 'James Taylor',
    title: '',
    body: 'Is there a justifiable reason why global warming is no longer mentioned even with its obviously terrible consequences?',
    upVoters: [],
    downVoters: [2, 3],
    updatedOn: null,
  },
  {
    id: 2,
    createdOn: new Date(),
    createdBy: 2,
    meetup: 2,
    authorName: 'James Taylor',
    title: '',
    body: 'Beyond syntax, are there any major differences between the interfaces of the chai assertion library: should, expect and assert?',
    upVoters: [2, 3],
    downVoters: [],
    updatedOn: null,
  },
  {
    id: 3,
    createdOn: new Date(),
    createdBy: 3,
    meetup: 1,
    authorName: 'Philip Catridge',
    title: '',
    body: 'I believe Global warming is still as dangerous as it always was. What are the first steps we have to take?',
    upVoters: [2, 3],
    downVoters: [],
    updatedOn: null,
  },
];

export default questions;
