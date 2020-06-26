// Boards
// API
// Functions
const token = `Token token="${localStorage.getItem('token')}"`;
const url = 'http://localhost:3000/boards';

async function getBoards(token) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then(
      (data) => {
        data;
      },
      (error) => {
        error.message;
      }
    );
}

function getBoardId(id) {
  const fetchurl = `${url}/${id}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  };

  fetch(fetchurl, options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.ok) {
        console.log(data);
      } else {
        return data;
      }
    });
}

function createBoard(board) {
  const options = {
    method: 'POST',
    body: JSON.stringify(board),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  };

  fetch(url, options).then((res) => console.log(res));
}

function updateBoard(id, data) {
  const fetchurl = `${url}/${id}`;

  const options = {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  };

  fetch(fetchurl, options).then((res) => console.log(res));
}

const data = {
  name: 'Organizable Updated!!',
};

function deleteBoard(id) {
  const fetchurl = `${url}/${id}`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  };

  fetch(fetchurl, options).then((res) => console.log(res));
}

// Boards
// Creation
// Functions

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
  const boards = await getBoards(token);

  boards.forEach((board) => showSingleBoard(board));
}

showActiveBoards();

// Boards
// Menu
// Functions

myBoards = document.getElementById('myBoards');
closedBoards = document.getElementById('closedBoards');
myProfile = document.getElementById('myProfile');
logout = document.getElementById('logout');

allButtons = document.querySelectorAll('.option');
allSections = document.querySelectorAll('.sections');

allButtons.forEach((button) => {
  button.addEventListener('click', () => {
    removeActiveOthersButtons();
    event.target.classList.add('active');
    const idButton = event.target.id;
    switchButton(idButton);
  });
});

function showCurrentlySection(section) {
  section.classList.add('section-active');
}

function hideOthersSections() {
  allSections.forEach((section) => section.classList.remove('section-active'));
}

function removeActiveOthersButtons() {
  allButtons.forEach((button) => button.classList.remove('active'));
}

function switchButton(button) {
  switch (button) {
    case 'btnMyBoards':
      hideOthersSections();
      showCurrentlySection(myBoards);
      break;
    case 'btnClosedBoard':
      hideOthersSections();
      showCurrentlySection(closedBoards);
      break;
    case 'btnProfile':
      hideOthersSections();
      showCurrentlySection(myProfile);
      break;
    default:
      window.location.href = 'login.html';
      // hideOthersSections();
      // showCurrentlySection(logout);
      break;
  }
}
