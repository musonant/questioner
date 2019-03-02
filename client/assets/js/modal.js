const modals = document.querySelectorAll('.modal-container');
const modalOpeners = document.querySelectorAll('.open-modal');
const modalClosers = document.querySelectorAll('.close-modal');

for (let trigger of modalOpeners) {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    
    for (let modal of modals) {
      if (modal.id === e.target.lang)
        openModal(modal);
    }
  })
}

for (let trigger of modalClosers) {
  trigger.addEventListener('click', (e) => {

    for (let modal of modals) {
      if (modal.id === e.target.lang)
        closeModal(modal);
    }
  })
}

const openModal = (target) => {
  target.classList.add('show');
}

const closeModal = (target) => {
  target.classList.remove('show');
}