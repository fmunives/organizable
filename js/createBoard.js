btnCreateBoard = document.getElementById("create-new-board");
modalBoard = document.getElementById("modal-create-board");
closeModal = document.getElementById("close-modal");
allColors = document.querySelectorAll(".set-color");
bgBoardTitle = document.querySelector(".create-board__title");
allBoardsCards = document.querySelectorAll(".list-boards__card");
console.log(allBoardsCards);

allColors.forEach((colorSelected) => {
  colorSelected.onclick = () =>
    (bgBoardTitle.style.background = colorSelected.dataset.color);
});

allBoardsCards.forEach((cardBoard) => {
  cardBoard.onclick = () => (window.location.href = "board.html");
});

btnCreateBoard.onclick = () => showModalCreateBoard(modalBoard);
closeModal.onclick = () => hideModalCreateBoard(modalBoard);

document.addEventListener("keyup", function (event) {
  let codeScape = 27;
  if (event.keyCode === codeScape) hideModalCreateBoard(modalBoard);
});

function showModalCreateBoard(modalBoard) {
  modalBoard.classList.remove("hide");
}

function hideModalCreateBoard(modalBoard) {
  modalBoard.classList.add("hide");
  console.log(event.key);
}
