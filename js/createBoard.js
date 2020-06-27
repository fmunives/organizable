btnCreateBoard = document.getElementById('create-new-board');
modalBoard = document.getElementById('modal-create-board');
closeModal = document.getElementById('close-modal');
allColors = document.querySelectorAll('.set-color');
bgBoardTitle = document.querySelector('.create-board__title');
allBoardsCards = document.querySelectorAll('.list-boards__card');

allColors.forEach((colorSelected) => {
  colorSelected.addEventListener('click', () => {
    bgBoardTitle.style.backgroundColor = colorSelected.dataset.color;

    const datacolor = event.target.getAttribute('data-color');
    bgBoardTitle.setAttribute('data-color', datacolor);
  });
});

allBoardsCards.forEach((cardBoard) => {
  cardBoard.onclick = () => (window.location.href = 'board.html');
});

btnCreateBoard.onclick = () => showModalCreateBoard(modalBoard);
closeModal.onclick = () => hideModalCreateBoard(modalBoard);

document.addEventListener('keyup', function (event) {
  let codeScape = 27;
  if (event.keyCode === codeScape) hideModalCreateBoard(modalBoard);
});

function showModalCreateBoard(modalBoard) {
  modalBoard.classList.remove('hide');
}

function hideModalCreateBoard(modalBoard) {
  modalBoard.classList.add('hide');
  console.log(event.key);
}
