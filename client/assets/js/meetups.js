const meetupDisplay = (data) => {
  const templateArray = data.map((item) => {
    const questionCount = 25;
    const { topic } = item;
    const { location } = item;
    const date = new Date(item.createdOn);

    return `
    <div class="col-sm-12 col-md-6 col-lg-4 container">
      ${meetupCard(questionCount, topic, location, date)}
    </div>
    `;
  });

  return templateArray.join('');
};

const renderComponent = async () => {
  const data = await API.getMeetups();
  const text = await meetupDisplay(data.data);
  document.getElementById('meetupList').innerHTML = text;
};

renderComponent();
