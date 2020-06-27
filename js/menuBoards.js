myBoards = document.getElementById("myBoards");
closedBoards = document.getElementById("closedBoards");
myProfile = document.getElementById("myProfile");
logout = document.getElementById("logout");

allButtons = document.querySelectorAll(".option");
allSections = document.querySelectorAll(".sections");

allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    removeActiveOthersButtons();
    event.target.classList.add("active");
    const idButton = event.target.id;
    switchButton(idButton);
  });
});

function showCurrentlySection(section) {
  section.classList.add("section-active");
}

function hideOthersSections() {
  allSections.forEach((section) => section.classList.remove("section-active"));
}

function removeActiveOthersButtons() {
  allButtons.forEach((button) => button.classList.remove("active"));
}

function switchButton(button) {
  switch (button) {
    case "btnMyBoards":
      hideOthersSections();
      showCurrentlySection(myBoards);
      break;
    case "btnClosedBoard":
      hideOthersSections();
      showCurrentlySection(closedBoards);
      break;
    case "btnProfile":
      hideOthersSections();
      showCurrentlySection(myProfile);
      getCurrentUser();
      break;
    default:
      logOut();
      window.location.href = "login.html";
      // hideOthersSections();
      // showCurrentlySection(logout);
      break;
  }
}

const currentToken = localStorage.getItem("token");
const currentUserId = localStorage.getItem("id");

async function getCurrentUser() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Token token="${currentToken}"`,
    },
  };

  const response = await fetch(
    `http://localhost:3000/users/${currentUserId}`,
    options
  );
  const currentUserData = await response.json();

  const { username } = currentUserData;
  const { email } = currentUserData;
  const { firstName } = currentUserData;
  const { lastName } = currentUserData;

  textUsername = document.getElementById("username");
  textEmail = document.getElementById("email");
  textFirstName = document.getElementById("first-name");
  textLastName = document.getElementById("last-name");

  textUsername.value = username;
  textEmail.value = email;
  textFirstName.value = firstName;
  textLastName.value = lastName;
}

const signupForm = document.querySelector(".sign-up__form");

signupForm.addEventListener("submit", () => {
  event.preventDefault();
  const userNewInfo = {
    user: {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      first_name: document.getElementById("first-name").value,
      last_name: document.getElementById("last-name").value,
    },
  };
  update(`http://localhost:3000/users/${currentUserId}`, userNewInfo);
});

async function update(url, user) {
  const options = {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token="${currentToken}"`,
    },
  };

  const response = await fetch(url, options).then((res) => res.json());
  console.log(response);

  if (!response.id) {
    console.log(response);
  } else {
    console.log("data cambiada");
    setTimeout(function () {
      alert("User updated");
      switchButton("btnProfile");
    }, 1000);
    //localStorage.setItem("id", response.id);
    //localStorage.setItem("token", response.token);
    //window.location.replace("boards.html");
  }
}

buttonDeleteUser = document.getElementById("delete-user-button");
buttonDeleteUser.onclick = () =>
  destroyUser(`http://localhost:3000/users/${currentUserId}`);

async function destroyUser(url) {
  console.log(url);
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Token token="${currentToken}"`,
    },
  };
  const response = await fetch(url, options);

  if (response.ok) {
    console.log("user deleted");
    setTimeout(function () {
      alert("User deleted");
      switchButton("btnLogOut");
    }, 1000);
  } else {
    console.log(response);
  }
}

function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
}
