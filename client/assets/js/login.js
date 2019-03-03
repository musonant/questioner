const loginToggle = document.getElementById('signin-toggle');
const signupToggle = document.getElementById('signup-toggle');
const loginForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

loginToggle.addEventListener('click', (e) => {
  if (e.target.className.indexOf('active') === -1) {
    signupToggle.classList.remove('active');
    e.target.classList.add('active');

    signupForm.classList.remove('active');
    loginForm.classList.add('active');
  }
});

signupToggle.addEventListener('click', (e) => {
  if (e.target.className.indexOf('active') === -1) {
    loginToggle.className = 'bar in col-sm-6';
    e.target.className = 'bar up col-sm-6 active';
    loginForm.className = 'form';
    signupForm.className = 'form active';
  }
});

const loginHandler = {
  init: () => {
    // const loginForm = document.querySelector('#signin-form');
    // const signupForm = document.querySelector('#signup-form');

    loginForm.addEventListener('submit', loginHandler.onLoginSubmit);
    signupForm.addEventListener('submit', loginHandler.onSignupSubmit);

    events.subscribe('LOGIN_SUCCESS', loginHandler.loginRedirect);
    events.subscribe('SIGNUP_SUCCESS', loginHandler.loginRedirect);
  },
  loginRedirect: () => {
    window.location.href = '/meetups.html';
  },
  onLoginSubmit: async (e) => {
    e.preventDefault();
    const fields = e.target.elements;
    const email = fields.email.value;
    const password = fields.password.value;

    const attemptLogin = await API.login({ email, password });

    if (attemptLogin.status === 200) {
      events.publish('LOGIN_SUCCESS', attemptLogin.data);
    }
    console.log(attemptLogin);
  },
  onSignupSubmit: async (e) => {
    e.preventDefault();
    const fields = e.target.elements;

    const firstname = fields.firstname.value;
    const lastname = fields.lastname.value;
    const email = fields.email.value;
    const password = fields.password.value;

    const attemptSignup = await API.signup({ firstname, lastname, email, password });

    if (attemptSignup.status === 201) {
      events.publish('SIGNUP_SUCCESS', attemptSignup.data);
    }
    console.log(attemptSignup);
  }
};

loginHandler.init();
