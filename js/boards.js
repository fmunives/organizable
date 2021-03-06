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
    .then((data) => data);
}

async function getBoardId(id) {
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

async function createBoard(board) {
  const options = {
    method: 'POST',
    body: JSON.stringify(board),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  };

  fetch(url, options)
    .then((rpta) => rpta.json())
    .then((data) => console.log('data', data)); //devuelve la data creada
}

async function updateBoard(id, data) {
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

async function deleteBoard(id) {
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

/// CREATE BOARDS FROM API ///

const starBoards = document.querySelectorAll('.list-boards')[0];
const normalBoards = document.querySelectorAll('.list-boards')[1];
const closeBoards = document.querySelectorAll('.list-boards')[2];

const colors = {
  blue: '#0079BF',
  orange: '#D29034',
  green: '#519839',
  red: '#B04632',
  purple: '#89609E',
  pink: '#CD5A90',
  lime: '#4BBF6B',
  sky: '#0AAECB',
  gray: '#838C90',
};

function showSingleBoard(board) {
  const parentDiv = (() => {
    if (!board.closed) {
      return board.starred ? starBoards : normalBoards;
    }
    return closeBoards;
  })();

  const mainDiv = document.createElement('div');
  mainDiv.className = 'list-boards__card';
  mainDiv.innerText = board.name;
  mainDiv.setAttribute('data-id', board.id); // añadiendo id a cada board
  mainDiv.onclick = () => {
    window.location.href = 'board.html';
    localStorage.setItem('idBoard', board.id);
  }; //redirecciona al detalle del board
  mainDiv.style.backgroundColor = colors[`${board.color}`];

  const innerDiv = document.createElement('div');
  innerDiv.className = 'list-boards__options';
  mainDiv.appendChild(innerDiv);

  const closeButton = document.createElement('button');
  closeButton.className = 'list-boards__option';
  closeButton.id = 'close-btn';
  innerDiv.appendChild(closeButton);

  const closeImg = document.createElement('img');
  closeImg.setAttribute('src', './images/small-close.svg');
  closeImg.setAttribute('alt', 'Close this board');
  closeButton.appendChild(closeImg);

  if (!board.closed) {
    const starButton = document.createElement('button');
    starButton.className = 'list-boards__option';
    starButton.id = 'star-btn';
    innerDiv.appendChild(starButton);

    const starImg = document.createElement('img');
    starImg.setAttribute('src', './images/small-start-white.svg');
    starImg.setAttribute('alt', 'Star this board');
    starButton.appendChild(starImg);
  }

  parentDiv.appendChild(mainDiv);
}

function showActiveBoards() {
  getBoards(token).then((response) => {
    Object.values(response).forEach((board) => showSingleBoard(board));
  });
}

showActiveBoards();

function newBoard() {
  event.preventDefault();

  const color = (() => {
    const value = document.querySelector('.create-board__title').getAttribute('data-color');
    return Object.keys(colors).find((key) => colors[key] === value);
  })();

  const board = {
    name: document.querySelector('.create-board__input').value,
    closed: false,
    color: color,
    starred: false,
  };
  createBoard(board);
  showSingleBoard(board);

  document.querySelector('.create-board__title').style.backgroundColor = colors.blue;
  document.querySelector('.create-board__title').setAttribute('data-color', colors.blue);
  document.querySelector('.create-board__input').value = '';
  document.querySelector('#modal-create-board').classList.toggle('hide');
}

document.querySelector('#createBoardBtn').addEventListener('click', newBoard);

function toggleCloseBoard(id) {
  const body = {};

  const state = getBoardId()['closed'];

  body.closed = state ? false : true;

  updateBoard(id, body);
}

function deleteBoard(id) {
  deleteBoard(id);
}

document.querySelectorAll('#close-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!getBoardId()['closed']) {
      toggleCloseBoard(this.event.target.getAttribute('data-id'));
    } else {
      deleteBoard(this.event.target.closest('.list-boards__card').getAttribute('data-id'));
    }
  });
});

function toggleStarBoard(id) {
  const body = {};

  const state = getBoardId()['starred'];

  body.starred = state ? false : true;

  updateBoard(id, body);
}

document.querySelectorAll('#star-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    toggleStarBoard(this.event.target.closest('.list-boards__card').getAttribute('data-id'));
  });
});
