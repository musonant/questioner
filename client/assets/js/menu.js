const menuToggles = document.querySelectorAll('.menu-toggle .menu-btn');

for (menu of menuToggles) {
  menu.addEventListener('click', (e) => {
    e.target.parentNode.classList.toggle('show');
  });
}

window.onclick = (e) => {
  if (!e.target.matches('.menu-toggle .menu-btn')) {
    for (menu of menuToggles) {
      if ( menu.parentNode.classList.contains('show')) {
        menu.parentNode.classList.remove('show');
      }
    }
  }
}
