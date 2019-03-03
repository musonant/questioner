const questionsList = (questions) => {
  const getCommentsList = (question) => {
    const commentsTemplate = question.comments.map(comment => `
      <div class="comment">
        <div class="fine-text">
          <p> ${comment.body} </p>
        </div>
      </div>
    `);

    return commentsTemplate.join('');
  };

  const questionsTemplate = questions.map((question) => {
    const upVoters = question.upVoters || [];
    const downVoters = question.downVoters || [];
    return `
    <div class="row question-card">
      <div class="counter">
        <p class="vote-num upvotes">${upVoters.length}</p>
          <button class="voter-btn upvote">
            <i class="fa fa-caret-up icon"></i>
          </button>

        <div class="divide"></div>

        <button class="voter-btn downvote">
          <i class="fa fa-caret-down icon"></i>
        </button>
        <p class="vote-num downvotes">${downVoters.length}</p>
      </div>
      <div class="body flex-1">
        <div class="fine-text main-question">
          <p> ${question.body} </p>
        </div>
        <div class="comment-list">
          ${getCommentsList(question)}
          <form action="" class="question-form">
            <input type="text" placeholder="Enter your comment">
          </form>
        </div>
      </div>
    </div>
  `});

  const allQuestions = questionsTemplate.join('');
  return `
  <div class="question-list">
    <label class="with-underline">Questions</label>
    ${allQuestions}
  </div>
  `;
};
