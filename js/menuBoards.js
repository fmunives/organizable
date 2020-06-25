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
      break;
    default:
      window.location.href = "login.html";
      // hideOthersSections();
      // showCurrentlySection(logout);
      break;
  }
}
