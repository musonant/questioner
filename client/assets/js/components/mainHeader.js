// implement rendering different headers for small and large screen sizes
const mainHeader = (mainLinks = [], menuLinks = [], title = 'Questioner') => {
  const menuLinksArray = menuLinks.map((link) => {
    return `
      <a href="${link.href}">
        <li class="menu-option">${link.text}</li>
      </a>
    `;
  });
  const menuLinksHtml = menuLinksArray.join('');

  return `
    <header class="main-header row">
      <div class="header-brand">
        <h3 class="title">${title}</h3>
      </div>
      <div class="menu-toggle">
        <i class="menu-btn fa fa-bars"></i>
        <div class="menu-content">
          <ul class="menu-list">

            ${menuLinksHtml}

            <div class="menu-toggle with-arrow">
              <li class="menu-btn menu-option">Account Settings
                <i class="fa fa-caret-down menu-arrow"></i>
              </li>
              <div class="menu-content">
                <ul class="menu-list">
                  <a href="account.html#account-info">
                    <li class="menu-option">Account Information</li>
                  </a>
                  <a href="account.html#account-log">
                    <li class="menu-option">Account Log</li>
                  </a>
                  <a href="account.html#schedulled-meetups">
                    <li class="menu-option">Schedulled Meetups</li>
                  </a>
                  <a href="login.html">
                    <li class="menu-option">Logout</li>
                  </a>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </header>
  `;
};
