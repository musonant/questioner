let loginToggle = document.getElementById('signin-toggle');
let signupToggle = document.getElementById('signup-toggle');
let loginForm = document.getElementById('signin-form');
let signupForm = document.getElementById('signup-form');

loginToggle.addEventListener('click', (e) => {
  if (e.target.className.indexOf('active') === -1) {
    signupToggle.classList.remove('active');
    e.target.classList.add('active')

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