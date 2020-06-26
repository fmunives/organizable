const token = `Token token="${localStorage.getItem('token')}"`;
const url = 'http://localhost:3000/boards';

function getBoards(token) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.ok) {
        console.log(data);
      } else {
        return data;
      }
    });
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
