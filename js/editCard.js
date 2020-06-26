btnEditCard = document.getElementById("edit-card");
modalCardDetails = document.getElementById("modal-edit-card");
closeModal = document.getElementById("close-modal");

btnEditCard.onclick = () => showModalEditCard(modalCardDetails);
closeModal.onclick = () => hideModalEditCard(modalCardDetails);

document.addEventListener("keyup", function (event) {
  let codeScape = 27;
  if (event.keyCode === codeScape) hideModalEditCard(modalCardDetails);
});

function showModalEditCard(modal) {
  modal.classList.remove("hide");
}

function hideModalEditCard(modalBoard) {
  modalBoard.classList.add("hide");
}
