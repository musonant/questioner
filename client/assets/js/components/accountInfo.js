const accountInfo = user => `
    <div class="basic">
      <div class="sliced-bg">
          <div class="text">
              <label>${user.firstname} ${user.lastname}</label> <br>
              <label class="sub">${user.email}</label>
            </div>
      </div>
      <label for="profile-image">
        <div class="profile-image">
          <i class="fa fa-user-circle icon"></i>
        </div>
        <input type="file" id="profile-image" hidden>
      </label>
    </div>
  `;
