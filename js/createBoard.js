btnCreateBoard = document.getElementById("create-new-board");
modalBoard = document.getElementById("modal-create-board");
closeModal = document.getElementById("close-modal");

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
