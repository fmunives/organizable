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

async function getCurrentUser() {
  const currentToken = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("id");

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

function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
}
