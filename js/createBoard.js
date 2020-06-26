const btnCreateBoard = document.getElementById('create-new-board');
const modalBoard = document.getElementById('modal-create-board');
const closeModal = document.getElementById('close-modal');
const allColors = document.querySelectorAll('.set-color');
const bgBoardTitle = document.querySelector('.create-board__title');
const allBoardsCards = document.querySelectorAll('.list-boards__card');
const myBoards = document.querySelectorAll('#myBoards');

// console.log(allBoardsCards);

allColors.forEach((colorSelected) => {
  colorSelected.onclick = () => (bgBoardTitle.style.background = colorSelected.dataset.color);
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

function showSingleBoard(board) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add = 'list-boards__card';

  const title = document.createElement('h3');
  title.innerText = board.name;

  const innerDiv = document.createElement('div');
  innerDiv.classList.add = 'list-boards__options';

  const closeButton = document.createElement('button');
  closeButton.classList.add = 'list-boards__option';

  const closeImg = document.createElement('img');
  closeImg.setAttribute('src', './images/small-close.svg');
  closeImg.setAttribute('alt', 'Close this board');

  closeButton.appendChild(closeImg);

  const starButton = document.createElement('button');
  starButton.classList.add = 'list-boards__option';

  starImg.setAttribute('src', './images/small-start-white.svg');
  starImg.setAttribute('alt', 'Star this board');

  starButton.appendChild(starImg);

  innerDiv.appendChild(closeButton);
  innerDiv.appendChild(starButton);

  mainDiv.appendChild(title);
  mainDiv.appendChild(innerDiv);
}

function showActiveBoards() {
  const boards = getBoards(token);

  boards.forEach((board) => showSingleBoard(board));
}

showActiveBoards();
