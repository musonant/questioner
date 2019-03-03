let modalClosers = [];
let modalOpeners = [];
const modals = document.querySelectorAll('.modal-container');

const assignModals = () => {
  modalOpeners = document.querySelectorAll('.open-modal');
  modalClosers = document.querySelectorAll('.close-modal');
};
window.onloadend = assignModals();

for (const trigger of modalOpeners) {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();

    for (const modal of modals) {
      if (modal.id === e.target.lang) openModal(modal);
    }
  });
}

for (const trigger of modalClosers) {
  trigger.addEventListener('click', (e) => {
    for (let modal of modals) {
      if (modal.id === e.target.lang) closeModal(modal);
    }
  });
}

const openModal = (target) => {
  target.classList.add('show');
};

const closeModal = (target) => {
  target.classList.remove('show');
};
