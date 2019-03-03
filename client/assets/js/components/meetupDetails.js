const meetupDetails = (featuredImage = 'assets/img/transparencyLight.png', author, questions, description, topic, happeningOn) => {
  questions = questionsList(questions);

  return `
  <div class="row main-body">
    <div class="col-sm-12 col-lg-7 with-back-img featured-image" style="background-color: #d9e6e0; background-image: url('${featuredImage}')">
    </div>
    <div class="col-sm-12 col-lg-5 description">
      <div class="fine-text sticky">
        <label>description</label>
        <p>${description}</p>
        <label>Author</label>
        <p>
          <a href="account.html?user=${author.id}" class="underline">${author.name}</a>
        </p>
        <button class="action-btn open-modal" lang="question-modal">
          <label style="color: #fff;">Ask a question</label>
        </button>
      </div>
    </div>
    <div class="col-sm-12 col-lg-7 container">
      
      ${questions}

      <hr>
      
      <form action="" class="question-form">
        <button class="input btn-like-text open-modal" lang="question-modal">Enter your question</button>
      </form>
    </div>
  </div>
  `;
};
